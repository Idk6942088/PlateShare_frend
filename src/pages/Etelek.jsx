import { Box, Button, InputAdornment, Menu, MenuItem, TextField } from '@mui/material'
import React from 'react'
import { IoSearch, IoFilter } from "react-icons/io5";
import { BiSort } from "react-icons/bi";
import Grid from '@mui/material/Grid2';
import { IoIosStar } from "react-icons/io";
import { useState } from 'react';
import { useEffect } from 'react';
import { collection, deleteDoc, doc, onSnapshot, query, Timestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Etelek({db}) {

  const [etelek, setEtelek] = useState([]);
  const [userInput,setuserInput] = useState("");
  const [kategoria, setKategoria] = useState("");

  useEffect(() => {
    const q = query(collection(db, "etelek"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEtelek(snapshot.docs.map(doc => ({ ...doc.data(), id:doc.id })));
    });
    return () => unsubscribe();
   
  }, []);

  async function deleteExpiredEtelek() {
    
    for(let x of etelek) {
        if(Timestamp.now().toDate() > x.meddig.toDate()) {
          console.log(x.id);
          const resp = await axios.delete("http://localhost:88/del/"+x.id);
          await deleteDoc(doc(db, "etelek", x.id));
          console.log(resp.data)
        }
      }
  }
  
console.log(kategoria);

  useEffect( () => {
    deleteExpiredEtelek();
  },[etelek.length]);

  console.log(etelek);
  const filteredEtelek = etelek.filter((el) => {
    if (userInput === '') {
      if(kategoria === '') {
        return el.partnernev.toLowerCase().includes(userInput.toLowerCase())
        || el.helyszin.toLowerCase().includes(userInput.toLowerCase())
        || el.kategoria.toLowerCase().includes(userInput.toLowerCase())
        || el.leiras.toLowerCase().includes(userInput.toLowerCase());
      } 
      else {
        return el.kategoria.toLowerCase().includes(kategoria.toLowerCase());
      }
  }
  else {
      if(kategoria === '') {
        return el.partnernev.toLowerCase().includes(userInput.toLowerCase())
        || el.helyszin.toLowerCase().includes(userInput.toLowerCase())
        || el.kategoria.toLowerCase().includes(userInput.toLowerCase())
        || el.leiras.toLowerCase().includes(userInput.toLowerCase());
    } 
    else {
      return el.partnernev.toLowerCase().includes(userInput.toLowerCase())
      || el.helyszin.toLowerCase().includes(userInput.toLowerCase())
      && el.kategoria.toLowerCase().includes(kategoria.toLowerCase())
      || el.leiras.toLowerCase().includes(userInput.toLowerCase());
  }
  }
    
})


  const convertTimestamp = ( mettol,meddig ) => {
    let ma = Timestamp.now().toDate().toDateString();
    let atveheto = mettol.toDate();
    let atvehetodate = atveheto.toDateString();
    let atvehetodate2 = atveheto;
    let atveheto1 = meddig.toDate();
    let atvehetodate1 = atveheto1.getMonth();
    let ora1 = atveheto.getHours();
    let perc1 = atveheto.getMinutes();
    let ora2 = atveheto1.getHours();
    let perc2 = atveheto1.getMinutes();
    if(atvehetodate!=ma) {
      return "Lejárt";
    }else {
        return mettol.toDate().toLocaleDateString()+" " + (ora1 < "10" ? "0" + ora1 : ora1) + ":" + (perc1 < "10" ? "0" + perc1 : perc1) + "-től - " + meddig.toDate().toLocaleDateString()+" " + (ora2 < "10" ? "0" + ora2 : ora2) + ":" + (perc2 < "10" ? "0" + perc2 : perc2) + "-ig";
    } 
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

     
 function kategoriaselect(kateg) {
  setKategoria(kateg)
  setAnchorEl(null);
 }

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <div className='etelek'>
      <div className='etelekFent'>
        <div className="kereso ">
          <Box>
          <TextField
              className="searchBTN"
              color="dark"
              variant="standard"
              placeholder="Keresés... (Élelmiszer neve, helyszín, kategória)"
              value={userInput}
              onChange={e => setuserInput(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoSearch />
                  </InputAdornment>
                ),
                sx: {
                  '&:before': {
                    borderBottom: '1px solid #d4af37', // inaktív állapot
                  },
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottom: '2px solid #ffc400', // hover állapot
                  },
                  '&:after': {
                    borderBottom: '2px solid #ffc400', // aktív állapot (fókusz)
                  },
                },
              }}
            />
          </Box>
        </div>
        <div className="szurok">
          <div className="szures">
            <p>Filter:</p>
            <span>
                      <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={()=>setAnchorEl(null)}
                >
                  <MenuItem onClick={()=>kategoriaselect("")}>
                      Összes
                    </MenuItem>
                  {etelek.map(x => (
                    <MenuItem key={x.id} onClick={()=>kategoriaselect(x.kategoria)}>
                      {x.kategoria}
                    </MenuItem>
                  ))}
                </Menu>
              <IoFilter onClick={handleClick}/> </span>
          </div>
          <div className="rendezes">
            <p>Sort by:</p>
            <span ><BiSort /> </span>
          </div>
        </div>
      </div>

      <div className="etelekLent">
        {filteredEtelek.length!=0? <Grid container spacing={2}>
          {filteredEtelek.map( e => (  
              <Grid size={{xs: 12, sm: 6, md: 3}} className='kartya' key={e.id}>
                <Link to={`/etel/${e.id}`} >
                  <div className="kartyaKep">
                    <img src={e.kepurl} />
                    <span className='kartyaDb'>{e.db} db</span>
                  </div>
                  <div className="kartyaSzoveg">
                    <div className="nev_ar">
                    <h3>{e.partnernev}</h3>
                    <span>{e.ar},-Ft</span>
                    </div>

                    <p>{e.helyszin}</p>
                    <p>Élelmiszer átvehető: {convertTimestamp(e.mettol,e.meddig)}</p>
                    <Button className='kartyaGomb' variant="contained">Lefoglalás</Button>
                  </div>
                </Link>
              </Grid>
           
          ))} 
        </Grid>
        :<div className='pt-25'><h1 className='text-center text-6xl'>Nem található élelmiszer!</h1></div>}
       
      </div>
    </div>
  )
}