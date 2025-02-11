
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
