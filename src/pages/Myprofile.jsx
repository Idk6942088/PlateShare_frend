import { Avatar, Button, Snackbar, TextField, Alert, CircularProgress, Typography, Box } from '@mui/material';
import { deleteUser, updateEmail, updatePassword } from 'firebase/auth';
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Myprofile({db, user, userpfp, setUserpfp}) {
    const [felhasznalok, setFelhasznalok] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [veznev, setVeznev] = useState("");
    const [kernev, setKernev] = useState("");
    const [email, setEmail] = useState("");
    const [jelszo, setJelszo] = useState("");
    const [jelszo1, setJelszo1] = useState("");
    const [fajl, setFajl] = useState(null);
    const [jelszoHiba, setJelszoHiba] = useState("");
    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success"
    });
    const navigate = useNavigate();

    useEffect(() => {
        if(user != null) {
            const q = query(collection(db, "users"), where("email", "==", user.email));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                setFelhasznalok(snapshot.docs.map(doc => ({ ...doc.data(), id:doc.id })));
            });
            return () => unsubscribe();
        }
    }, [user, db]);

    useEffect(() => {
        if(felhasznalok.length !== 0) {
            feltolt();
        }
    }, [felhasznalok]);

    function feltolt() {
        setVeznev(felhasznalok[0].veznev);
        setKernev(felhasznalok[0].kernev);
        setEmail(felhasznalok[0].email);
        setUserpfp(felhasznalok[0].pfpURL);
    }

    const showNotification = (message, severity = "success") => {
        setNotification({
            open: true,
            message,
            severity
        });
    };

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({...notification, open: false});
    };

    async function pfpupload() {
        try {
            const formData = new FormData();
            formData.append("fajl", fajl);
            formData.append("publicID", felhasznalok[0].id);
            const resp = await axios.post("http://localhost:88/pfp", formData);
            await updateDoc(doc(db, "users", user.reloadUserInfo.localId), { pfpURL: resp.data.url });
            setUserpfp(resp.data.url);
            setFajl(null);
            showNotification("Profilkép sikeresen frissítve!");
        } catch (error) {
            console.error(error);
            showNotification("Hiba történt a profilkép feltöltésekor", "error");
        }
    }

    async function fioktorles() {
        try {
            if(userpfp !== "") {
                await axios.delete("http://localhost:88/del/"+felhasznalok[0].id);
            }
            await deleteDoc(doc(db, "users", user.reloadUserInfo.localId));
            await deleteUser(user);
            showNotification("Fiók sikeresen törölve!");
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            console.error(error);
            showNotification("Hiba történt a fiók törlésekor!", "error");
        }
    }

    async function pfptorles() {
        try {
            await updateDoc(doc(db, "users", felhasznalok[0].id), { pfpURL: "" });
            await axios.delete("http://localhost:88/del/"+felhasznalok[0].id);
            setUserpfp("");
            showNotification("Profilkép sikeresen törölve!");
        } catch (error) {
            console.error(error);
            showNotification("Hiba történt a profilkép törlésekor", "error");
        }
    }

    function validatePassword() {
        if (jelszo.length > 0 && jelszo.length < 6) {
            setJelszoHiba("A jelszónak legalább 6 karakter hosszúnak kell lennie");
            return false;
        }
        if (jelszo !== jelszo1) {
            setJelszoHiba("A jelszavak nem egyeznek");
            return false;
        }
        setJelszoHiba("");
        return true;
    }

    async function modosit() {
        if ((jelszo.length > 0 || jelszo1.length > 0) && !validatePassword()) {
            return;
        }

        try {
            let updates = { veznev, kernev };
            
            if(email !== felhasznalok[0].email) {
                updates.email = email;
                await updateEmail(user, email);
            }
            
            if(jelszo.length >= 6 && jelszo === jelszo1) {
                await updatePassword(user, jelszo);
            }
            
            await updateDoc(doc(db, "users", felhasznalok[0].id), updates);
            
            setDisabled(true);
            showNotification("Profiladatok sikeresen frissítve!");
        } catch (error) {
            console.error("Hiba a módosítás során:", error);
            let errorMessage = "Hiba történt a módosítás során";
            if (error.code === "auth/requires-recent-login") {
                errorMessage = "A művelethez újra be kell jelentkezned";
            }
            showNotification(errorMessage, "error");
        }
    }

    function helyreallit() {
        feltolt();
        setJelszo("");
        setJelszo1("");
        setJelszoHiba("");
        setDisabled(true);
    }

    return (
        <>
            {felhasznalok.length === 0 ?  <Box
                    display="flex" 
                    justifyContent="center" 
                    alignItems="center" 
                    minHeight="60vh"
                    flexDirection="column"
                >
                    <CircularProgress size={60} />
                    <Typography variant="h6" mt={2}>Betöltés...</Typography>
                </Box> :
            <div className='myprofile flex'>
                <div className='profilkep flex flex-col gap-1 text-center m-auto'>
                    <label htmlFor="fileinput" className='m-auto rounded-full'> 
                        <Avatar src={userpfp} className='m-auto avatar' sx={{ width: 100, height: 100 }}/>
                    </label>
                    <p className='text-xl font-medium'>{felhasznalok[0].veznev} {felhasznalok[0].kernev}</p>
                    <p className='text-gray-400 text-sm'>{felhasznalok[0].tipus === "mszemely" ? "Magánszemély" : felhasznalok[0].tipus}</p>
                    <div className='flex gap-5 text-center flex-col m-auto my-5'>
                        <input 
                            type="file" 
                            id="fileinput" 
                            accept='.jpg,.png,.jpeg' 
                            onChange={e => setFajl(e.target.files[0])}
                        />
                        {fajl && (
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={pfpupload}
                            >
                                Feltölt
                            </Button>
                        )}
                        {felhasznalok[0].pfpURL !== "" && (
                            <Button 
                                variant="contained" 
                                color="error" 
                                onClick={pfptorles}
                            >
                                Profilkép törlése
                            </Button>
                        )}
                    </div>
                </div> 
                <div className='profiladatok flex gap-5 justify-between'>
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-center font-bold text-2xl mb-3'>Adatok</h1>
                        <div className='flex gap-3'>
                            <TextField 
                                className='w-1/2' 
                                label="Vezetéknév" 
                                disabled={disabled} 
                                value={veznev} 
                                onChange={e => setVeznev(e.target.value)}
                            />
                            <TextField 
                                className='w-1/2' 
                                disabled={disabled} 
                                label="Keresztnév" 
                                value={kernev} 
                                onChange={e => setKernev(e.target.value)}
                            />
                        </div>
                        <TextField 
                            disabled={disabled} 
                            label="Email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                        />    
                        <TextField 
                            disabled={disabled} 
                            label="Jelszó" 
                            type='password' 
                            placeholder='Jelszó' 
                            value={jelszo} 
                            onChange={e => setJelszo(e.target.value)}
                            error={!!jelszoHiba}
                            helperText={jelszoHiba}
                        />
                        <TextField  
                            disabled={disabled} 
                            label="Jelszó mégegyszer" 
                            type='password' 
                            placeholder='Jelszó' 
                            value={jelszo1} 
                            onChange={e => setJelszo1(e.target.value)}
                            error={!!jelszoHiba}
                        />    
                        {disabled ? 
                            <div className='flex flex-col gap-3'>
                                <Button 
                                    variant="contained" 
                                    onClick={() => setDisabled(false)}
                                >
                                    Módosítás
                                </Button> 
                                <Button 
                                    variant="contained" 
                                    color="error"
                                    onClick={fioktorles}
                                >
                                    Fiók törlése
                                </Button>
                            </div> :
                            <div className='flex gap-5'>
                                <Button 
                                    className='w-1/2' 
                                    variant="contained" 
                                    color='error' 
                                    onClick={helyreallit}
                                >
                                    Elvetés
                                </Button>
                                <Button 
                                    className='w-1/2' 
                                    variant="contained" 
                                    color='success' 
                                    onClick={modosit}
                                >
                                    Mentés
                                </Button>
                            </div>
                        } 
                    </div>
                </div>
            </div>}

            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleCloseNotification}
                    severity={notification.severity}
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    )
}