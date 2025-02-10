import { Avatar, Button, TextField } from '@mui/material';
import { sendEmailVerification, updateEmail, updatePassword } from 'firebase/auth';
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export default function Myprofile({db,user}) {

    const [felhasznalok, setFelhasznalok] = useState([]);
    const [disabled, setDisabled] = useState(true);
    
    const [veznev, setVeznev] = useState("");
    const [kernev, setKernev] = useState("");
    const [email, setEmail] = useState("");
    const [jelszo, setJelszo] = useState("");
    
    

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
   
    function feltolt(){
      setVeznev(felhasznalok[0].veznev);
      setKernev(felhasznalok[0].kernev);
      setEmail(felhasznalok[0].email);
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
       
        <div className='flex flex-col gap-1  text-center m-auto '>
            <Avatar className='m-auto'/>
            <p className='text-xl font-medium'>{felhasznalok[0].veznev} {felhasznalok[0].kernev}</p>
            <p className='text-gray-400 text-sm'>{felhasznalok[0].tipus =="mszemely" ? "Magánszemély": felhasznalok[0].tipus}</p>
       
        </div> 
       
        <div className='flex gap-5 justify-between'>
        <div className='flex flex-col gap-3'>
            <h1 className='text-center font-bold text-2xl mb-3'>Adatok</h1>
            <div className='flex gap-3'>
                    <TextField className='w-1/2' label="Vezetéknév" disabled={disabled} value={veznev} onChange={e => setVeznev(e.target.value)}/>
                    <TextField className='w-1/2' disabled={disabled} label="Keresztnév" value={kernev} onChange={e => setKernev(e.target.value)}/>
                    </div>
                    <TextField disabled={disabled} label="Email" value={email} onChange={e => setEmail(e.target.value)}/>    
                    <TextField  disabled={disabled} label="Jelszó" placeholder='Jelszó' value={jelszo} onChange={e => setJelszo(e.target.value)}/>    
                  {disabled==true ? <Button variant="contained" onClick={()=> setDisabled(!disabled)} >Módosítás</Button>:
                   <div className='flex gap-5'><Button className='w-1/2' variant="contained" onClick={()=> helyreallit()} >Módosítások Elvetése</Button>
                   <Button className='w-1/2' variant="contained" onClick={()=> modosit()} >Módosítások Mentése</Button></div>} 
        </div>
        </div>
        
    </div>}
    
    </>
  )
}
