import Grid from '@mui/material/Grid2';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Etel({db}) {
    const [etel, setEtel] = useState({});

    const location = useLocation()
    const etelId = location.pathname.split("etel/")[1];
    
    useEffect(() => {
        async function getEtel() {
            const snap = await getDoc(doc(db, "etelek", etelId));
            if (snap.exists()) console.log(snap.data());
            setEtel(snap.data())
        }
        getEtel();
      }, []);
   

    return (
        <div className='etel'>
            <Grid container spacing={2} key={etel.id}>
                <Grid size={{xs: 12, sm: 12, md: 6}}>
                    <img src="" alt="" />
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6}}>
                    <p className='font-bold text-3xl text-center'>{etel.kategoria}</p>
                    <p className=''>{etel.partnernev}</p>
                    <h1>{etel.helyszin}</h1>
                    <p>{etel.ar}</p>
                    
                </Grid>
            </Grid>
            
            
        </div>
    );
}
