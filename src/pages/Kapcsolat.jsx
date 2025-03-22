import { Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { useEffect } from 'react';
import { useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';


export default function Kapcsolat({user,db}) {

  const [useradat,setUseradat] = useState([]);
  const [uzenet,setUzenet] = useState("");
  const [uzenetdb,setUzenetdb] = useState([]);

  useEffect(() => {
    if(user!=null) {
      async function getUser() {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setUseradat(snap.data());
      }
      getUser();
      
    } 
  },[user]);

  async function kuldes() {
    
    const snap = await getDoc(doc(db, "uzenetek", user.uid));
    if (snap.exists()) setUzenetdb(snap.data());
    let uzenetid="uzenet"+uzenetdb.length;
    await setDoc(doc(db, "uzenetek", user.uid), {uzenet:uzenet});
  }

  return (
    <div className='kapcsolat'>
      {!user ? (<Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 6 }} >
          <div className="uzenetKuldes">
            <h1>Üzenet küldés</h1>
            
              
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
      </Grid>):(<Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 6 }} >
          <div className="uzenetKuldes">
            <h1>Üzenet küldés</h1>
            
            {useradat.length==0 ? "":
              <>
              <input type="text" placeholder={useradat.veznev+" "+useradat.kernev}  disabled/>
              <input type="text" placeholder={useradat.email} disabled/>
              <textarea value={uzenet} onChange={e => setUzenet(e.target.value)}></textarea>
              <Button variant="outlined" onClick={()=>kuldes()}>Küldés</Button> </>
             }
           
              
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
      </Grid>)}
      
    </div>
  )
}
