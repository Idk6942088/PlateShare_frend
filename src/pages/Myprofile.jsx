import { Avatar, Button, TextField, Typography } from '@mui/material';
import { deleteUser, sendEmailVerification, updateEmail, updatePassword } from 'firebase/auth';
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { auth } from '../App';
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Myprofile({db,user,userpfp,setUserpfp}) {

    const [felhasznalok, setFelhasznalok] = useState([]);
    const [disabled, setDisabled] = useState(true);
    
    const [veznev, setVeznev] = useState("");
    const [kernev, setKernev] = useState("");
    const [email, setEmail] = useState("");
    const [jelszo, setJelszo] = useState("");
    const [fajl, setFajl] = useState(null);
    const navigate = useNavigate();
    const location=useLocation();

    useEffect(() => {
         if(user!= null) {
        const q = query(collection(db, "users"), where("email", "==", user.email));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          setFelhasznalok(snapshot.docs.map(doc => ({ ...doc.data(), id:doc.id })));
        });
        return () => unsubscribe();}
    }, [user]);

    useEffect(() => {
        if(felhasznalok.length != 0) {
            feltolt();
        }
    }, [felhasznalok]);
   console.log(felhasznalok);
    function feltolt(){
      setVeznev(felhasznalok[0].veznev);
      setKernev(felhasznalok[0].kernev);
      setEmail(felhasznalok[0].email);
    }

    async function pfpupload() {
        const formData = new FormData();
        formData.append("fajl",fajl)
        formData.append("publicID",felhasznalok[0].pfpID);
        const resp = await axios.post("http://localhost:88/pfp",formData);
        console.log(resp.data)
        const version=(resp.data.url.split("/")[6]);
        const kepnev=(resp.data.url.split("/")[7].split(".")[0]); 
        await updateDoc(doc(db, "users", user.reloadUserInfo.localId), { pfpID:resp.data.url });
        setUserpfp(resp.data.url);
        console.log(resp.data.public_id);
    }

    async function fioktorles() {
        await deleteUser(user);
        await deleteDoc(doc(db, "users", user.reloadUserInfo.localId));
       
    }

    async function modosit() {
        if(jelszo.length != 0) {
            await updateDoc(doc(db, "users", felhasznalok[0].id), { veznev:veznev, kernev:kernev, email:email });
        } else {
            await updateDoc(doc(db, "users", felhasznalok[0].id), { veznev:veznev, kernev:kernev, email:email });
           
        }
        setDisabled(!disabled);
    }
    function helyreallit() {
        feltolt();
        setJelszo("");
        setDisabled(!disabled);
    }
  return (
    
    <>
    {felhasznalok.length == 0 ? <p>Betöltés...</p> :
    <div className='myprofile flex'>
        <div className='profilkep flex flex-col gap-1  text-center m-auto '>
            <Avatar src={userpfp} className='m-auto'/>
            <p className='text-xl font-medium'>{felhasznalok[0].veznev} {felhasznalok[0].kernev}</p>
            <p className='text-gray-400 text-sm'>{felhasznalok[0].tipus =="mszemely" ? "Magánszemély": felhasznalok[0].tipus}</p>
            <div className='flex gap-5 text-center flex-col m-auto my-5'>
            <input type="file" name="" id="fileinput" accept='.jpg,.png,.jpeg' onChange={e => setFajl(e.target.files[0])}/>
            <label htmlFor="fileinput" className='filebutton'>Profilkép módosítása</label>  
            {fajl && <input type="button" className='filebutton1' value="Feltölt"  onClick={pfpupload}/> }
            </div>
           
        </div> 
        <div className='profiladatok flex gap-5 justify-between'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-center font-bold text-2xl mb-3'>Adatok</h1>
                    <div className='flex gap-3'>
                        <TextField className='w-1/2' label="Vezetéknév" disabled={disabled} value={veznev} onChange={e => setVeznev(e.target.value)}/>
                        <TextField className='w-1/2' disabled={disabled} label="Keresztnév" value={kernev} onChange={e => setKernev(e.target.value)}/>
                    </div>
                        <TextField disabled={disabled} label="Email" value={email} onChange={e => setEmail(e.target.value)}/>    
                        <TextField  disabled={disabled} label="Jelszó" placeholder='Jelszó' value={jelszo} onChange={e => setJelszo(e.target.value)}/>    
                      {disabled==true ? <><Button variant="contained" onClick={()=> setDisabled(!disabled)} >Módosítás</Button> 
                        <NavLink to="/" className="delbutton" onClick={()=> fioktorles()}>Fiók törlése</NavLink></>:
                        <div className='flex gap-5'>
                            <Button className='w-1/2' variant="contained" color='error' onClick={()=> helyreallit()} >Elvetés</Button>
                            <Button className='w-1/2' variant="contained" color='success' onClick={()=> modosit()} > Mentés</Button>
                        </div>} 
            </div>
        </div>
        
    </div>}
    
    </>
  )
}
