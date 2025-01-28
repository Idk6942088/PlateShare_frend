import { Box, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { IoSearch, IoFilter } from "react-icons/io5";
import { BiSort } from "react-icons/bi";


export default function Etelek() {
  return (
    <div className='etelek'>
      <div className="kereso">
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

  )
}
