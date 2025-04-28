import { Box, Button, InputAdornment, Menu, MenuItem, TextField } from '@mui/material'
import React from 'react'
import { IoSearch, IoFilter } from "react-icons/io5";
import { BiSort } from "react-icons/bi";
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { useEffect } from 'react';
import { collection, deleteDoc, doc, onSnapshot, query, Timestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Etelek({db}) {

  const [etelek, setEtelek] = useState([]);
  const [userInput,setuserInput] = useState("");
  const [kategoria, setKategoria] = useState("");
  const [rendezes, setRendezes] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

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
          
          const resp = await axios.delete("http://plateshare-bkend.onrender.com/del/"+x.id);
          await deleteDoc(doc(db, "etelek", x.id));
         
        }
      }
  }
  


  useEffect( () => {
    deleteExpiredEtelek();
  },[etelek.length]);


  const filteredEtelek = etelek.filter((el) => {
    if(el.mettol > Timestamp.now()) return false;
    if (userInput === '') {
      if(kategoria === '') return true; 
      else return el.kategoria.toLowerCase().includes(kategoria.toLowerCase());
  }
  else {
      if(kategoria === '') {
        return el.partnernev.toLowerCase().includes(userInput.toLowerCase())
        || el.nev.toLowerCase().includes(userInput.toLowerCase())
        || el.helyszin.toLowerCase().includes(userInput.toLowerCase())
        || el.kategoria.toLowerCase().includes(userInput.toLowerCase())
        || el.leiras.toLowerCase().includes(userInput.toLowerCase());
    } 
    else {
      if(!el.kategoria.toLowerCase().includes(kategoria.toLowerCase())) return false;
      if(kategoria!==''&&kategoria=== userInput) return true; 
      else return el.partnernev.toLowerCase().includes(userInput.toLowerCase())
      || el.nev.toLowerCase().includes(userInput.toLowerCase())
      || el.helyszin.toLowerCase().includes(userInput.toLowerCase())
      && el.kategoria.toLowerCase().includes(kategoria.toLowerCase())
      || el.leiras.toLowerCase().includes(userInput.toLowerCase());
  }
  }
    
})

  const convertTimestamp = ( mettol,meddig ) => {
    let atveheto = mettol.toDate();
    let atvehetodate = atveheto.toDateString();
    let atveheto1 = meddig.toDate();
    let ora1 = atveheto.getHours();
    let perc1 = atveheto.getMinutes();
    let ora2 = atveheto1.getHours();
    let perc2 = atveheto1.getMinutes();
    return mettol.toDate().toLocaleDateString()+" " + (ora1 < "10" ? "0" + ora1 : ora1) + ":" + (perc1 < "10" ? "0" + perc1 : perc1) + "-től - " + meddig.toDate().toLocaleDateString()+" " + (ora2 < "10" ? "0" + ora2 : ora2) + ":" + (perc2 < "10" ? "0" + perc2 : perc2) + "-ig";
  }


  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

     
 function kategoriaselect(kateg) {
  setKategoria(kateg)
  setAnchorEl(null);
 }


  /**/
  const rendezettEtelek = [...filteredEtelek].sort((a, b) => {
    if (rendezes === "arNovekvo") {
      return a.ar - b.ar;
    } else if (rendezes === "arCsokkeno") {
      return b.ar - a.ar;
    }
    return 0; // nincs rendezés
  });

  const [anchorElSort, setAnchorElSort] = useState(null);
  const openSort = Boolean(anchorElSort);

  const handleSortClick = (event) => {
    setAnchorElSort(event.currentTarget);
  };

  const handleSortSelect = (value) => {
    setRendezes(value);
    setAnchorElSort(null);
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
          <div  className="szures">
            <p onClick={handleClick}>Filter:</p>
            <span>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={()=>kategoriaselect("")}>
                      Összes
                    </MenuItem>
                    {Array.from(new Set(filteredEtelek.map(x => x.kategoria))).map((kategoria, index) => (
                    <MenuItem key={index} onClick={() => kategoriaselect(kategoria)}>
                    {kategoria}
                    </MenuItem>
                    ))}
                </Menu>
              <IoFilter onClick={handleClick}/> </span>
          </div>
          <div className="rendezes">
            <p onClick={handleSortClick}>Sort by:</p>
            <BiSort onClick={handleSortClick} />
            <Menu
              anchorEl={anchorElSort}
              open={openSort}
              onClose={() => setAnchorElSort(null)}
            >
              <MenuItem onClick={() => handleSortSelect("arNovekvo")}>Ár szerint növekvő</MenuItem>
              <MenuItem onClick={() => handleSortSelect("arCsokkeno")}>Ár szerint csökkenő</MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      <div className="etelekLent">
        {filteredEtelek.length>0? <Grid container spacing={2}>
          {rendezettEtelek.map( e =>
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
           
        )} 
        </Grid>
        :<div className='pt-25'><h1 className='text-center text-6xl'>Nem található élelmiszer!</h1></div>}
       
      </div>
    </div>
  )
}