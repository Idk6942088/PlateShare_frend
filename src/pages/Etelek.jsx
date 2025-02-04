import { Box, Button, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { IoSearch, IoFilter } from "react-icons/io5";
import { BiSort } from "react-icons/bi";
import Grid from '@mui/material/Grid2';
import { IoIosStar } from "react-icons/io";
import { useState } from 'react';
import { useEffect } from 'react';
import { collection, onSnapshot, query, Timestamp } from 'firebase/firestore';

export default function Etelek({db}) {

  const [etelek, setEtelek] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "etelek"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEtelek(snapshot.docs.map(doc => ({ ...doc.data(), id:doc.id })));
    });
    return () => unsubscribe();
  }, []);
  console.log(etelek[0]);
  console.log(Timestamp.now().toDate());

  const convertTimestamp = ( mettol,meddig ) => {
    let ma = Timestamp.now().toDate().toDateString();
    let atveheto = mettol.toDate();
    let atvehetodate = atveheto.toDateString();
    let atveheto1 = meddig.toDate();
    let atvehetodate1 = atveheto1.toDateString();
    console.log(atveheto.getMinutes());
    let ora1 = atveheto.getHours();
    let perc1 = atveheto.getMinutes();
    let ora2 = atveheto1.getHours();
    let perc2 = atveheto1.getMinutes();
    if(atvehetodate!=ma) {
      return "Lejárt";
    }else {
        return "Ma " + (ora1 < "10" ? "0" + ora1 : ora1) + ":" + (perc1 < "10" ? "0" + perc1 : perc1) + "-től - " + (ora2 < "10" ? "0" + ora2 : ora2) + ":" + (perc2 < "10" ? "0" + perc2 : perc2) + "-ig";
    } 
  }
  
  return (
    <>
      <div className='etelekFent'>
        <div className="kereso ">
          <Box>
            <TextField
              className="searchBTN"
              color="dark"
              variant="standard"
              placeholder='Search..'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoSearch />
                  </InputAdornment>
                ),
              }}
            />  
          </Box>
        </div>
        <div className="szurok">
          <div className="szures">
            <p>Filter:</p>
            <span><IoFilter /> </span>
          </div>
          <div className="rendezes">
            <p>Sort by:</p>
            <span><BiSort /> </span>
          </div>
        </div>
      </div>

      <div className="etelekLent">
        <Grid container spacing={2}>
          {etelek.map( e => (
            <Grid item size={{xs: 12, sm: 6, md: 3}} className='kartya' key={e.id}>
              <div className="kartyaKep">
                <img src="https://static-cdn.arcanum.com/nfo-resources/pannon_pic/pannon/panny-33_3.jpg" />
                <span className='kartyaDb'>{e.db} db</span>
                <span className='kartyaErtekeles' title={`${e.ertekeles} értékelés`}><IoIosStar color='success' />{e.ertekeles}</span>
              </div>
              <div className="kartyaSzoveg">
                <h3>{e.partnernev}</h3>
                <p>{e.helyszin}</p>
                <p>Étel átvehető: {convertTimestamp(e.mettol,e.meddig)}</p>
                <Button className='kartyaGomb' variant="contained">Lefoglalás</Button>
              </div>
            </Grid>
          ))}
          <Grid item size={{xs: 12, sm: 6, md: 3}} className='kartya'>
          <div className="kartyaKep">
              <img src="https://static-cdn.arcanum.com/nfo-resources/pannon_pic/pannon/panny-33_3.jpg" alt="" />
              <span className='kartyaDb'>13 db</span>
              <span className='kartyaErtekeles' title='12 értékelés'><IoIosStar color='success' />4.4</span>
            </div>
            <div className="kartyaSzoveg">
              <h3>Penny Market</h3>
              <p>Kecskemét, Kodály Zoltán tér 8</p>
              <p>Étel átvehető: 12:00 - 15:50</p>
              <Button className='kartyaGomb' variant="contained">Lefoglalás</Button>
            </div>
          </Grid>
          <Grid item size={{xs: 12, sm: 6, md: 3}} className='kartya'>
            <div className="kartyaKep">
              <img src="https://infostart.hu/images/site/articles/lead/2023/02/1676808267-S3KaO9I3z_md.jpg" alt="" />
              <span className='kartyaDb'>3 db</span>
              <span className='kartyaErtekeles' title='12 értékelés'><IoIosStar color='success' />4.4</span>
            </div>
            <div className="kartyaSzoveg">
              <h3>Penny Market</h3>
              <p>Kecskemét, Kodály Zoltán tér 8</p>
              <p>Étel átvehető: 12:00 - 15:50</p>
              <Button className='kartyaGomb' variant="contained">Lefoglalás</Button>
            </div>
          </Grid>
          <Grid item size={{xs: 12, sm: 6, md: 3}} className='kartya'>
            <div className="kartyaKep">
                <img src="https://infostart.hu/images/site/articles/lead/2023/02/1676808267-S3KaO9I3z_md.jpg" alt="" />
                <span className='kartyaDb'>3 db</span>
                <span className='kartyaErtekeles' title='12 értékelés'><IoIosStar color='success' />4.4</span>
              </div>
              <div className="kartyaSzoveg">
                <h3>Penny Market</h3>
                <p>Kecskemét, Kodály Zoltán tér 8</p>
                <p>Étel átvehető: 12:00 - 15:50</p>
                <Button className='kartyaGomb' variant="contained">Lefoglalás</Button>
              </div>
          </Grid>
          <Grid item size={{xs: 12, sm: 6, md: 3}} className='kartya'>
            <div className="kartyaKep">
                <img src="https://infostart.hu/images/site/articles/lead/2023/02/1676808267-S3KaO9I3z_md.jpg" alt="" />
                <span className='kartyaDb'>3 db</span>
                <span className='kartyaErtekeles' title='12 értékelés'><IoIosStar color='success' />4.4</span>
              </div>
              <div className="kartyaSzoveg">
                <h3>Penny Market</h3>
                <p>Kecskemét, Kodály Zoltán tér 8</p>
                <p>Étel átvehető: 12:00 - 15:50</p>
                <Button className='kartyaGomb' variant="contained">Lefoglalás</Button>
              </div>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
