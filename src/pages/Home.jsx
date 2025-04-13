import { Alert, Grid2, Snackbar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export function Home({sikeres,sikeresClose}) {
  return (
    <>
    <div className='home'>
      <div className="home_header_bg">
        <div className="home_bg">
          
        </div>
        <div className="home_bg_szoveg">
          <h1>Valami frappáns duma</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores nihil magnam enim, voluptas iste nulla accusantium, veniam perspiciatis, corporis possimus et molestiae.</p>
          <div className="home_bg_gombok">
            <Link to='/etelek' className='home_bg_gombok_reg'><input type="button" value="Ételek" /></Link>
            <Link to='/kapcsolat'><input type="button" value="Kapcsolat" /></Link>
          </div>
        </div>
      </div>
     
      <Grid2 container spacing={2} className='home_szoveg'>
        <Grid2 size={{ xs: 12, sm: 12, md: 6 }} >
          <h1 className='font-bold text-4xl mt-5 mb-8 tracking-wide'>Mentsük meg együtt az ételeket!</h1>
          <p className=''>
              <span className='underline decoration-double font-bold italic'>Ne hagyd veszni az értékes élelmiszereket! </span> <br />
              Vásárolj kedvenc boltjaid kínálatából akár   
              <b className='text-green-400'> 60-80% kedvezménnyel</b> 
              , és élvezd a minőségi ételeket fenntartható módon. Különböző csomagok várnak rád – spórolj, segíts a környezetnek, és fedezd fel a legjobb ajánlatokat egy 
              <Link to='/etelek' className='bg-green-400 ml-1 rounded-sm italic'> kattintással!</Link>
            </p>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 6 }} >
          <img className='home_img' src="src/img/usingPhone.jpg" alt="" />
        </Grid2>
      </Grid2>
      
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