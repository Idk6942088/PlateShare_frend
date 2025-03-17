import './App.css'
import { Link, Outlet } from 'react-router-dom';
import { Alert, AppBar, Avatar, Box, Button, Chip, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Snackbar, Toolbar, Tooltip, Typography  } from '@mui/material';
import { FaBars, FaCircleUser, FaGithub, FaPlateWheat, FaSquareInstagram } from 'react-icons/fa6';
import {Grid} from "@mui/material";
import { useState } from 'react';
import { Fragment } from 'react';
import { FaFacebookSquare } from 'react-icons/fa';
import { AiFillTikTok } from 'react-icons/ai';


export function Layout({user,logout,admin,partner}) {

    const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = (
    <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
         {user && (
            <><ListItem button component={Link} to="/myprofile">
                  <ListItemIcon>
                      <Avatar />
                  </ListItemIcon>
                  <ListItemText primary={user.email} />
              </ListItem><Divider></Divider></>
         )}
        
      <ListItem button component={Link} to="/etelek">
        <ListItemText primary="Ételek" />
      </ListItem>
      <ListItem button component={Link} to="/partnereink">
        <ListItemText primary="Partnereink" />
      </ListItem>
      <ListItem button component={Link} to="/blog">
        <ListItemText primary="Blog" />
      </ListItem>
      <ListItem button component={Link} to="/charity">
        <ListItemText primary="Charity" />
      </ListItem>
      <ListItem button component={Link} to="/kapcsolat">
        <ListItemText primary="Kapcsolat" />
      </ListItem>
      {admin && (
        <ListItem button component={Link} to="/admin">
          <ListItemText primary="Admin" />
        </ListItem>
      )}
      {partner && (
        <ListItem button component={Link} to="/upload">
          <ListItemText primary="Feltölt" />
        </ListItem>
      )}
      <Divider></Divider>
       {user ? (
        <ListItem button component={Link} to="/">
          <ListItemText primary="Kijelentkezés"  onClick={logout}/>
        </ListItem>
      )  : <ListItem button component={Link} to="/auth/in">
      <ListItemText primary="Bejelentkezés"/>
    </ListItem>}
    </List>
 );

    const [anchorEl, setAnchorEl] =useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

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
                                {admin ? <Link to="/admin" className='font-medium text-l logingomb'>Admin</Link> :null}
                                {partner ? <Link to="/upload" className='font-medium text-l logingomb'>Feltöltés</Link> :null}
                                {user ? <Fragment>
                                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                    <Tooltip title="Fiók beállítások">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                                    </IconButton>
                                    </Tooltip>
                                </Box>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    slotProps={{
                                    paper: {
                                        elevation: 0,
                                        sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                        },
                                    },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                    <Link to="/myprofile"><MenuItem  onClick={handleClose}>
                                    <Avatar /> Profilom 
                                    </MenuItem></Link>
                                    <MenuItem onClick={handleClose}>
                                        Kedvencek
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => { handleClose(); logout(); }}>
                                    <Link to="/"  >Kijelentkezés</Link> 
                                    </MenuItem>
                                </Menu>
                                </Fragment> :<Link to="/auth/in" className='font-medium text-l logingomb' >Bejelentkezés</Link>}
                            </div>
                            <div className='hamburgermenu'>
                            <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                            <FaBars />
                        </IconButton>
                        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                            {menuItems}
                        </Drawer>
                        </div>
                    </div>
                    </Toolbar>
                </div>
            </Box>
            
        </div>
        <div className='page'>
            <Outlet/>    
        </div>  
        <footer> 
        <Grid container className='block m-auto footer_container '>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <div className="footer_links">
              <Link className='footer_link' to="/etelek">Ételek</Link>
              <Link className='footer_link' to="/partnereink">Partnereink</Link>
              <Link className='footer_link' to="/blog">Blog</Link>
              <Link className='footer_link' to="/charity">Charity</Link>
              <Link className='footer_link' to="/kapcsolat">Kapcsolat</Link>
            </div>

          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }} className='footer_jobb'>
            <Link to='https://kkando.hu/' target='_blank'>Kecskeméti SZC Kandó Kálmán Technikum</Link>
            <p>Kecskemét, Bethlen krt. 63, 6000</p>
            <div className="footer_imgs">
              <a className='footer_img' href="https://github.com/Idk6942088/PlateShare_frend" target='_blank'><FaGithub /></a>
              <a className='footer_img' href=""><FaSquareInstagram /></a>
              <a className='footer_img' href=""><FaFacebookSquare /></a>
              <a className='footer_img' href=""><AiFillTikTok /></a>
            </div>
          </Grid>
        </Grid>


       <p className='text-center'>© 2025 PlateShare</p>
      </footer>
    </>
    );

}


