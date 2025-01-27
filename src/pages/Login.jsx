import { Button, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function () {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  return (
    <div className='loginpanel m-auto drop-shadow-xl'>
        Email:
          <TextField
          required
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        Jelszó:
        <TextField
            required
            label="Jelszó"
            type="password"
            value={password}
          onChange={e => setPassword(e.target.value)}
        />
         <Button variant="contained" >Login</Button>
         <Link className='m-auto font-light' to="/">Elfelejtetted a jelszód?</Link>
         <Link className='m-auto font-light' to="/">Még nincs fiókod? Kattints ide</Link>
    </div>
  )
}
