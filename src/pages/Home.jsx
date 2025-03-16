<<<<<<< HEAD

import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export function Home({sikeres,sikeresClose}) {
  return (
    <>
    <div className='home'>
      <div className="home_header_bg">
        <div className="home_bg">
          <img src="src/img/home_bg.jpg" alt="" />
        </div>
        <div className="home_bg_szoveg">
          <h1>PlateShare</h1>
          <Link to="/etelek"><button class="btn" >Ételek</button></Link>
        </div>
<<<<<<< HEAD
      </div>
     
      <h1 className='font-bold text-4xl mt-3'>Mentsük meg együtt az ételeket! 🍽️♻️</h1>
      <h1 className='font-bold text-4xl mt-3'>Mentsük meg együtt az ételeket! 🍽️♻️</h1>
      <h1 className='font-bold text-4xl mt-3'>Mentsük meg együtt az ételeket! 🍽️♻️</h1>


      {/*
      <div className="home_bg">
        <img src="src/img/home_bg.jpg" alt="" />
=======
>>>>>>> 85e976f (fix home page)
      </div>
     
      <h1 className='font-bold text-4xl mt-3'>Mentsük meg együtt az ételeket! 🍽️♻️</h1>
      <h1 className='font-bold text-4xl mt-3'>Mentsük meg együtt az ételeket! 🍽️♻️</h1>
      <h1 className='font-bold text-4xl mt-3'>Mentsük meg együtt az ételeket! 🍽️♻️</h1>


      {/*
      <h1 className='font-bold text-4xl mt-3'>Mentsük meg együtt az ételeket! 🍽️♻️</h1>
      <div className='szovegfelso'>
        <p>A PlateShare egy fenntartható megoldás az élelmiszer-pazarlás ellen.</p> 
        <p>Partnereink – éttermek, pékségek, boltok – feltöltik a feleslegessé vált, de még tökéletes állapotú ételeket, amelyeket te kedvezményesen vagy ingyenesen igényelhetsz.</p> 
        
        
      </div>
     
    </div>
    <div>
    <div className='szovegalso'>
        <div className='flex flex-row items-center gap-100'>
          <div className='box'>
             <p> 🥦 Miért érdemes csatlakozni?</p>
           
            <p> ✅ Kevesebb kidobott étel, fenntarthatóbb jövő</p>
            
            <p>✅ Friss és finom ételek elérhető áron</p>
           
            <p> ✅ Támogatod a helyi vállalkozásokat</p>
          </div>
          <div className='box items-center'>
          <p> 👥 Hogyan működik?</p>
            <p> 1️⃣ Böngészd partnereink felajánlásait</p>
           
            <p> 2️⃣ Foglald le a neked tetsző ételeket</p>
            
            <p> 3️⃣ Vedd át és élvezd – közben csökkented a pazarlást!</p>
            
            <p>Csatlakozz hozzánk, és légy része a megoldásnak! ♻️✨</p>
          </div>
        </div>
     
       
      </div>*/}
    </div>
     <Snackbar open={sikeres} autoHideDuration={6000} onClose={sikeresClose}>
           <Alert
           onClose={sikeresClose}
           severity="success"
           variant="filled"
           sx={{ width: '100%' }}
           >
           Sikeres bejelentkezés!
           </Alert>
          </Snackbar>
    </>
  )
}
=======

import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid2';


export function Home({sikeres,sikeresClose}) {
  return (
    <>
    <div className='home'>
      <div className="home_header_bg">
        <div className="home_bg">
          <img src="src/img/home_bg.jpg" alt="" />
        </div>
        <div className="home_bg_szoveg">
          <h1>PlateShare</h1>
          <Link to="/etelek"><button class="btn" >Ételek</button></Link>
        </div>
      </div>

      <Grid container spacing={2} className='home_szoveg'>
        <Grid size={{ xs: 12, sm: 12, md: 6 }} >
          <h1 className='font-bold text-4xl mt-5 mb-8 tracking-wide'>Mentsük meg együtt az ételeket!</h1>
          <p className=''>
              <span className='underline decoration-double font-bold italic'>Ne hagyd veszni az értékes élelmiszereket! </span> <br />
              Vásárolj kedvenc boltjaid kínálatából akár   
              <b className='text-green-400'> 60-80% kedvezménnyel</b> 
              , és élvezd a minőségi ételeket fenntartható módon. Különböző csomagok várnak rád – spórolj, segíts a környezetnek, és fedezd fel a legjobb ajánlatokat egy 
              <Link to='/etelek' className='bg-green-400 ml-1 rounded-sm italic'> kattintással!</Link>
            </p>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 }} >
          <img className='home_img' src="src/img/usingPhone.jpg" alt="" />
        </Grid>
      </Grid>
     

      {/*
      <h1 className='font-bold text-4xl mt-3'>Mentsük meg együtt az ételeket! → → →🍽️♻️</h1>
      <div className='szovegfelso'>
        <p>A PlateShare egy fenntartható megoldás az élelmiszer-pazarlás ellen.</p> 
        <p>Partnereink – éttermek, pékségek, boltok – feltöltik a feleslegessé vált, de még tökéletes állapotú ételeket, amelyeket te kedvezményesen vagy ingyenesen igényelhetsz.</p> 
        
        
      </div>
     
    </div>
    <div>
    <div className='szovegalso'>
        <div className='flex flex-row items-center gap-100'>
          <div className='box'>
             <p> 🥦 Miért érdemes csatlakozni?</p>
           
            <p> ✅ Kevesebb kidobott étel, fenntarthatóbb jövő</p>
            
            <p>✅ Friss és finom ételek elérhető áron</p>
           
            <p> ✅ Támogatod a helyi vállalkozásokat</p>
          </div>
          <div className='box items-center'>
          <p> 👥 Hogyan működik?</p>
            <p> 1️⃣ Böngészd partnereink felajánlásait</p>
           
            <p> 2️⃣ Foglald le a neked tetsző ételeket</p>
            
            <p> 3️⃣ Vedd át és élvezd – közben csökkented a pazarlást!</p>
            
            <p>Csatlakozz hozzánk, és légy része a megoldásnak! ♻️✨</p>
          </div>
        </div>
     
       
      </div>*/}
    </div>
     <Snackbar open={sikeres} autoHideDuration={6000} onClose={sikeresClose}>
           <Alert
           onClose={sikeresClose}
           severity="success"
           variant="filled"
           sx={{ width: '100%' }}
           >
           Sikeres bejelentkezés!
           </Alert>
          </Snackbar>
    </>
  )
}
>>>>>>> f2da40c (Kapcsolat.jsx, Etel.jsx fix)
