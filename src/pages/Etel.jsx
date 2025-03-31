import { Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IoLocationSharp } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { FaShop } from 'react-icons/fa6';
import { CiStar } from 'react-icons/ci';

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
                    <img className='etelkep' src={etel.kepurl}/>
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6}}>
                    <p className='font-bold uppercase text-4xl text-center' id='etel_kateg'>{etel.kategoria}</p>
                    <div id="etel_partnev">
                        <span><FaShop /></span>
                        <span>{etel.partnernev}</span>
                    </div>
                    <div id="etel_cim">
                        <span><IoLocationSharp /></span>
                        <span>{etel.helyszin}</span>
                    </div>
                   {/* <div className="etel_terkep">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2725.6175707875213!2d19.6725469767841!3d46.91023903580413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4743da09b9541f2d%3A0xb5e3ab94217084e5!2zS2Vjc2tlbcOpdCwgTnnDrXJpIMO6dCAzOCwgNjAwMA!5e0!3m2!1shu!2shu!4v1739799221615!5m2!1shu!2shu" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    */}
                    
                    <div className="etel_ar_db">
                        <Grid container>
                            <Grid size={{xs: 12, sm: 12, md: 4}}><p>{etel.ar},-Ft</p></Grid>
                            <Grid size={{xs: 12, sm: 12, md: 4}}><p>{etel.db} darab</p></Grid>
                            <Grid size={{xs: 12, sm: 12, md: 4}}>
                                <div className='etel_ertelekes'>
                                    <span><CiStar /></span>
                                    <span><CiStar /></span>
                                    <span><CiStar /></span>
                                    <span><CiStar /></span>
                                    <span><CiStar /></span>
                                </div>  
                            </Grid>
                        </Grid>
                                 
                    </div>
                    <Button id='etel_gomb' variant="contained" endIcon={<FaShoppingBag />}>Vásárlás</Button>
                    <div className="etel_leiras">
                        <p>{etel.leiras}</p>
                    </div>
                    
                </Grid>
            </Grid>
            
            
        </div>
    );
}
