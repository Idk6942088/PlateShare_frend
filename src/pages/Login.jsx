import { Button, TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
  return (
    <div className='loginpanel m-auto drop-shadow-xl'>
        Email:
          <TextField
          required
          label="Email"
          value={""}
        />
        Jelszó:
        <TextField
            required
            label="Jelszó"
            type="password"
        />
         <Button variant="contained" >Login</Button>
         <Link className='m-auto font-light' to="/home">Elfelejtetted a jelszód?</Link>
    </div>
  )
}
