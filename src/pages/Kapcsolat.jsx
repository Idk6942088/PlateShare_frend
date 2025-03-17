import { Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";


export default function Kapcsolat() {
  return (
    <div className='kapcsolat'>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 6 }} >
          <div className="uzenetKuldes">
            <h1>Üzenet küldés</h1>
              <input type="text" placeholder="Neved" id="" />
              <input type="text" placeholder="Email címed" id="" />
              <input type="text" placeholder="Telefonszámod" id="" />
              <textarea name="" id=""></textarea>
              <Button variant="outlined">Küldés</Button>
          </div>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <div className="kapcsolatInfo">
            <h1>Kapcsolat</h1>
            <p className='mt-5'>Elérhetőségeink:</p>
            <ul>
              <li><MdEmail />@plateshare@gmail.com</li>
              <li><FaPhoneAlt /> +36 12 345 6789</li>
            </ul>
            <div className="kapcsolat_img">
              <span>Kövess minket:</span>
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
