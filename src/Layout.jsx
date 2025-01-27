import './App.css'
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Box, Button, Divider, Drawer, IconButton, Toolbar  } from '@mui/material';
import { FaPlateWheat } from 'react-icons/fa6';
import { useState } from 'react';


export function Layout() {
    return (
    <>
       <div className='menu shadow-md'>
       <Box>
                    <div className='menu'>
                        <Toolbar>
                        <div className='buttons'>
                            <div className='logo '>
                            <Link to="/"> <IconButton
                                disableRipple
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                            <FaPlateWheat />
                            <h2 className='m-auto '>PlateShare</h2>
                            </IconButton></Link>
                           
                            </div>
                            <Divider orientation="vertical"/>
                            <div className='pagesbutton'>
                                <Link className='linkbutton' to="/"> Home</Link>
                                <Link className='linkbutton' to="/etelek">Ételek</Link>
                                <Link className='linkbutton' to="/partnereink">Partnereink</Link>
                                <Link className='linkbutton' to="/blog">Blog</Link>
                                <Link className='linkbutton' to="/charity">Charity</Link>
                                <Link className='linkbutton' to="/kapcsolat">Kapcsolat</Link>
                            </div>
                            <div className='signbutton'>
                                <Link to="/login"><Button variant="contained" color='inherit'>Login</Button></Link>
                            </div>
                        </div>
                    </Toolbar>
                    </div>
            </Box>
        </div>
        <div className='page'>
            <Outlet/>
        </div>
    </>
    );

}


