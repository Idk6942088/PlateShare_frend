import { Box, Button, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { IoSearch, IoFilter } from "react-icons/io5";
import { BiSort } from "react-icons/bi";
import Grid from '@mui/material/Grid2';
import { IoIosStar } from "react-icons/io";

export default function Etelek() {



  return (
    <>
      <div className='etelekFent'>
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

      <div className="etelekLent">
        <Grid container spacing={2}>
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
