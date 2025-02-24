import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react'

export default function Kapcsolat() {
  return (
    <div className='kapcsolat'>
      <Grid container >
        <Grid >
          <div className="uzenetKuldes">
            <h1>Üzenet küldés</h1>
              <input type="text" placeholder="Neved" id="" />
              <input type="text" placeholder="Email címed" id="" />
              <input type="text" placeholder="Telefonszám" id="" />
              <textarea name="" id=""></textarea>
            
          </div>
        </Grid>
        <Grid >
          <div className="kapcsolatInfo">
            <h1>Kapcsolat</h1>
            <div className="kapcsolat_img">
              <img src="src/img/instagram.png" alt="" />
              <img src="src/img/facebook.png" alt="" />
              <img src="src/img/tiktok.png" alt="" />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
