import './App.css'
import { Link, Outlet } from 'react-router-dom';
import { Alert, AppBar, Avatar, Box, Button, Chip, Divider, Drawer, IconButton, Snackbar, Toolbar  } from '@mui/material';
import { FaCircleUser, FaPlateWheat } from 'react-icons/fa6';
import { useState } from 'react';


export function Layout({user,logout,admin,partner}) {


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
                                <Link className='linkbutton' to="/etelek">Ételek</Link>
                                <Link className='linkbutton' to="/partnereink">Partnereink</Link>
                                <Link className='linkbutton' to="/blog">Blog</Link>
                                <Link className='linkbutton' to="/charity">Charity</Link>
                                <Link className='linkbutton' to="/kapcsolat">Kapcsolat</Link>
                            </div>
                            <div className='signbutton flex gap-3'>
                                {user ? <Chip avatar={<Avatar src={<FaCircleUser />}></Avatar>} label={user.email} />:null}
                                {admin ? <Link to="/admin" className='font-medium text-l logingomb'>Admin</Link> :null}
                                {partner ? <Link to="/upload" className='font-medium text-l logingomb'>Feltölt</Link> :null}
                                {user ? <Link onClick={logout} className='font-medium text-l logingomb'>Kijelentkezés</Link> :<Link to="/auth/in" className='font-medium text-l logingomb' >Bejelentkezés</Link>}
                                
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


