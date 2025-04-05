import { Box, Button, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { IoSearch, IoFilter } from "react-icons/io5";
import { BiSort } from "react-icons/bi";
import Grid from '@mui/material/Grid2';
import { IoIosStar } from "react-icons/io";
import { useState } from 'react';
import { useEffect } from 'react';
import { collection, onSnapshot, query, Timestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Etelek({db}) {

  const [etelek, setEtelek] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "etelek"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEtelek(snapshot.docs.map(doc => ({ ...doc.data(), id:doc.id })));
    });
    return () => unsubscribe();
   
  }, []);

  const filteredEtelek = etelek.filter((el) => {
    
    if (userInput === '') {
        return el;
    }
    else {
        return el.partnernev.toLowerCase().includes(userInput.toLowerCase());
    }
})
  const convertTimestamp = ( mettol,meddig ) => {
    let ma = Timestamp.now().toDate().toDateString();
    let atveheto = mettol.toDate();
    let atvehetodate = atveheto.toDateString();
    let atveheto1 = meddig.toDate();
    let atvehetodate1 = atveheto1.toDateString();
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
              value={userInput}
              onChange={e => setuserInput(e.target.value)}
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
            <span ><BiSort /> </span>
          </div>
        </div>
      </div>

      <div className="etelekLent">
        <Grid container spacing={2}>
          {filteredEtelek.map( e => (  
              <Grid size={{xs: 12, sm: 6, md: 3}} className='kartya' key={e.id}>
                <Link to={`/etel/${e.id}`} >
                  <div className="kartyaKep">
                    <img src="https://static-cdn.arcanum.com/nfo-resources/pannon_pic/pannon/panny-33_3.jpg" />
                    <span className='kartyaDb'>{e.db} db</span>
                    <span className='kartyaErtekeles' title={`${e.ertekelesdb} értékelés`}><IoIosStar color='success' />{e.ertekeles}</span>
                  </div>
                  <div className="kartyaSzoveg">
                    <div className="nev_ar">
                    <h3>{e.partnernev}</h3>
                    <span>{e.ar},-Ft</span>
                    </div>

                    <p>{e.helyszin}</p>
                    <p>Étel átvehető: {convertTimestamp(e.mettol,e.meddig)}</p>
                    <Button className='kartyaGomb' variant="contained">Lefoglalás</Button>
                  </div>
                </Link>
              </Grid>
           
          ))} 
        </Grid>
      </div>
    </>
  )
}