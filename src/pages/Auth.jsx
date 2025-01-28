import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Auth() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [kernev,setKernev] = useState("");
  const [veznev,setVeznev] = useState("");

  const location=useLocation()
  console.log(location.pathname);
  const isSignIn=location.pathname=='/auth/in';

  return (
    <div className='loginpanel m-auto drop-shadow-xl'>
        
        <h3 className='border-b-2 pb-3  border-gray-400 text-center text-2xl font-bold mb-1 '>{isSignIn ? "Bejelentkezés" : "Regisztráció"}</h3>
        
        {!isSignIn && (
         <>
          <RadioGroup
            className='m-auto'
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="usertype"
          >
           <FormControlLabel value="maganszemely" control={<Radio />} label="Magánszemély" />
           <FormControlLabel value="partner" control={<Radio />} label="Partner" />
          </RadioGroup>

         <div className='flex gap-3  border-t-2 pt-3  border-gray-400'>
         <TextField
         className='w-1/2'
         required
         label="Vezetéknév"
         value={email}
         onChange={e => setVeznev(e.target.value)}
       />
          <TextField
          className='w-1/2'
          required
          label="Keresztnév"
          value={email}
          onChange={e => setKernev(e.target.value)}
        />
        </div>
       
         </>
       )}
        
          <TextField
          required
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
            required
            label="Jelszó"
            type="password"
            value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {!isSignIn ? (
        <Button variant="contained" >Regisztráció</Button>
        ) : (<Button variant="contained" >Bejelentkezés</Button>)}
        
         <Link className='m-auto font-light' to="/pwreset">Elfelejtetted a jelszód?</Link>
         <Link className='m-auto font-light' to="/auth/up">Még nincs fiókod? Kattints ide</Link>
    </div>
  )
}
