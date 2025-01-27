import './App.css'
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Box, Button, Divider, IconButton, Toolbar  } from '@mui/material';
import { FaPlateWheat } from 'react-icons/fa6';


export function Layout() {

    return (
    <>
       <div className='menu shadow-md'>
       <Box>
                    <div className='menu'>
                        <Toolbar>
                        <div className='buttons'>
                            <div className='logo '>
                            <Link to="/home"> <IconButton
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
                                <Link to="/home"> <Button variant="contained" >Home</Button></Link>
                                <Link to="/etelek"><Button  variant="contained" color='inherit'>Ételek</Button></Link>
                                <Link to="/partnereink"><Button  variant="contained" color='inherit'>Partnereink</Button></Link>
                                <Link to="/blog"><Button  variant="contained" color='inherit'>Blog</Button></Link>
                                <Link to="/charity"><Button  variant="contained" color='inherit'>Charity</Button></Link>
                                <Link to="/kapcsolat"><Button  variant="contained" color='inherit'>Kapcsolat</Button></Link>
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


