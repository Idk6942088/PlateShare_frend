    import './App.css'
    import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
    import Grid from '@mui/material/Grid2';
    import './App.css';
    import { Alert, Avatar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Snackbar, Toolbar, Tooltip, Typography, Badge } from '@mui/material';
    import { FaBars, FaGithub, FaPlateWheat, FaSquareInstagram } from 'react-icons/fa6';
    import { FaShoppingCart } from 'react-icons/fa';
    import { useState } from 'react';
    import { Fragment } from 'react';
    import { FaFacebookSquare } from 'react-icons/fa';
    import { AiFillTikTok } from 'react-icons/ai';
    import { FaChevronUp } from "react-icons/fa";
    import { useEffect } from 'react';
    import { MdDeleteForever } from 'react-icons/md';
    import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';

    export function Layout({db,kosarrefresh,setKosarrefresh, user, logout, admin, partner, userpfp }) {
        const [drawerOpen, setDrawerOpen] = useState(false);
        const navigate = useNavigate();
        const location = useLocation()
       
        const [cartOpen, setCartOpen] = useState(false);
        const [kosar, setKosar] = useState([]);
        const [etel, setEtel] = useState([]);

        const [refresh, setRefresh] = useState(false);

        // Snackbar állapotok
        const [snackbarOpen, setSnackbarOpen] = useState(false);
        const [snackbarMessage, setSnackbarMessage] = useState('');
        const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success', 'error', 'warning', 'info'

        const showSnackbar = (message, severity) => {
            setSnackbarMessage(message);
            setSnackbarSeverity(severity);
            setSnackbarOpen(true);
        };

        const handleSnackbarClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            setSnackbarOpen(false);
        };

        const toggleCart = (open) => (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }
            setCartOpen(open);
            if (open) {
                setRefresh(!refresh);
            }
        };

        useEffect(() => {
        const fetchCart = async () => {
            if(user) {
                const docRef = doc(db, "kosar", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                setKosar(docSnap.data().kosar || []);
                }
            }
        };
        fetchCart();
        }, [kosarrefresh,user]);
        
        const megrendeles = async () => {
            try {
                const snap = await getDocs(collection(db, "etelek"));
                const lst = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setEtel(lst);
                
                for (let cartItem of kosar) {
                    const foodItem = lst.find(item => item.id === cartItem.id);
                    
                    if (foodItem) {
                        const newQuantity = foodItem.db - cartItem.db;
                        
                        if (newQuantity > 0) {
                            await updateDoc(doc(db, "etelek", cartItem.id), {
                                db: newQuantity
                            });
                            await deleteDoc(doc(db, "kosar", user.uid));
                        } 
                        else if (newQuantity === 0) {
                            await deleteDoc(doc(db, "etelek", cartItem.id));
                            await deleteDoc(doc(db, "kosar", user.uid));
                            navigate("/etelek");
                        }
                    }
                }
                const updatedSnap = await getDocs(collection(db, "etelek"));
                const updatedList = updatedSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setEtel(updatedList);
                setCartOpen(false);
                setRefresh(!refresh);
                setKosar([]);
                setKosarrefresh(!kosarrefresh);
                showSnackbar('Élelmiszer sikeresen megrendelve!', 'success');
            } catch (error) {
                console.error("Hiba a törléskor:", error);
            }
        };


        const torles = async (id) => {
            try {
                await updateDoc(doc(db, "kosar", user.uid), {
                    kosar: kosar.filter(item => item.id !== id)
                });

                setKosar(prev => prev.filter(item => item.id !== id));
                showSnackbar('Termék sikeresen eltávolítva a kosárból', 'success');
            } catch (error) {
                console.error("Hiba a törléskor:", error);
                showSnackbar('Hiba történt a termék eltávolítása közben', 'error');
            }
        };

        const cartMenu = (
            <div className="w-64 p-3">
                <Typography variant="h6" component="div" className="font-bold mb-4">
                    Bevásárló kosár
                </Typography>
                <Divider sx={{ height: 2, borderWidth: 1, borderColor: '#8c8c8c' }} />
                {kosar.length === 0 ? (
                    <Typography className="text-center py-4">A kosár üres</Typography>
                ) : (
                    <List>
                        {kosar.map((item, index) => (
                            <ListItem key={index}>
                                <div className='flex w-full'>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={`${item.db} x ${item.price} Ft`}
                                    />
                                    <ListItemText>
                                        <MdDeleteForever onClick={() => torles(item.id)} style={{ color: "red", fontSize: "25pt", margin: "auto", marginTop: "4px"}} />
                                    </ListItemText>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                )}
                <Divider sx={{ height: 2, borderWidth: 1, borderColor: '#8c8c8c' }} />
                <div className="flex justify-between items-center mt-4">
                    <Typography variant="subtitle1">
                        Összesen: {kosar.reduce((sum, item) => sum + (item.price * item.db), 0)} Ft
                    </Typography>
                    <Button
                        variant="contained"
                        color="success"
                        disabled={kosar.length === 0}
                        onClick={()=>megrendeles()}
                    >
                        Megrendelés
                    </Button>
                </div>
            </div>
        );

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
                            <Avatar src={userpfp} />
                        </ListItemIcon>
                        <ListItemText primary={user.email} />
                    </ListItem><Divider /></>
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
                <Divider />
                {user ? (
                    <ListItem button component={Link} to="/">
                        <ListItemText primary="Kijelentkezés" onClick={logout} />
                    </ListItem>
                ) : (
                    <ListItem button component={Link} to="/auth/in">
                        <ListItemText primary="Bejelentkezés" />
                    </ListItem>
                )}
            </List>
        );

        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };

            const [showMenu, setShowMenu] = useState(true);
            const [scrollDirection, setScrollDirection] = useState(null);
            const [atTop, setAtTop] = useState(true);


            useEffect(() => {
                let lastScrollY = window.scrollY;
            
                const handleScroll = () => {
                const currentScrollY = window.scrollY;
            
                setAtTop(currentScrollY === 0);
            
                if (currentScrollY > lastScrollY) {
                    setShowMenu(false);
                    setScrollDirection('down');
                } else if (currentScrollY < lastScrollY) {
                    setShowMenu(true);
                    setScrollDirection('up');
                }
            
                lastScrollY = currentScrollY;
                };
            
                window.addEventListener('scroll', handleScroll);
                return () => window.removeEventListener('scroll', handleScroll);
            }, []);

        const { pathname } = useLocation();
            const isHome = location.pathname === '/';
            const [showButton, setShowButton] = useState(false);
        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);
            useEffect(() => {
                const handleScroll = () => {
                setShowButton(window.scrollY > 50);
                };
                window.addEventListener('scroll', handleScroll);
                return () => window.removeEventListener('scroll', handleScroll);
            }, []);
        function scrollUp() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return (

                <>
                    <div className={` ${isHome ? 'menu homeMenu' : 'menu otherMenu'}  ${showMenu ? 'show-menu' : 'hide-menu'} ${scrollDirection === 'up' ? 'scrolled-up' : ''}${atTop ? 'at-top' : ''}` }>
                        <Box>
                            <div className='menu'>
                                <Toolbar>
                                    <div className='buttons'>
                                        <div className='logo'>
                                            <Link to="/">
                                                <IconButton
                                                    disableRipple
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="menu"
                                                >
                                                    <FaPlateWheat />
                                                    <h2 className='m-auto'>PlateShare</h2>
                                                </IconButton>
                                            </Link>
                                        </div>
                                        <Divider orientation="vertical" />
                                        <div className='pagesbutton'>
                                            <Link className='linkbutton' to="/etelek">Ételek</Link>
                                            <Link className='linkbutton' to="/partnereink">Partnereink</Link>
                                            <Link className='linkbutton' to="/blog">Blog</Link>
                                            <Link className='linkbutton' to="/charity">Charity</Link>
                                            <Link className='linkbutton' to="/kapcsolat">Kapcsolat</Link>
                                        </div>
                                        <div className='signbutton flex gap-3'>
                                            <Tooltip title="Bevásárló kosár">
                                                <IconButton
                                                    onClick={toggleCart(true)}
                                                    size="small"
                                                    sx={{ ml: 2 }}
                                                >
                                                    <Badge badgeContent={kosar.length>0 ?kosar.reduce((sum, item) => sum + (item.db), 0):null} color="error">
                                                        <FaShoppingCart />
                                                    </Badge>
                                                </IconButton>
                                            </Tooltip>

                                        {admin && <Link to="/admin" className='font-medium text-l logingomb'>Admin</Link>}
                                        {partner && <Link to="/upload" className='font-medium text-l logingomb'>Feltöltés</Link>}

                                        {user ? (
                                            <Fragment>
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
                                                            <Avatar src={userpfp} sx={{ width: 32, height: 32 }} />
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
                                                    <Link to="/myprofile">
                                                        <MenuItem onClick={handleClose}>
                                                            <Avatar src={userpfp} /> Profilom
                                                        </MenuItem>
                                                    </Link>
                                                    <MenuItem onClick={handleClose}>
                                                        Kedvencek
                                                    </MenuItem>
                                                    <Link to="/receptjeim">
                                                        <MenuItem onClick={handleClose}>
                                                            Receptjeim
                                                        </MenuItem>
                                                    </Link>
                                                    <Divider />
                                                    <MenuItem onClick={() => { handleClose(); logout(); }}>
                                                        <Link to="/">Kijelentkezés</Link>
                                                    </MenuItem>
                                                </Menu>
                                            </Fragment>
                                        ) : (
                                            <Link to="/auth/in" className='font-medium text-l logingomb'>Bejelentkezés</Link>
                                        )}
                                    </div>
                                    <div className='hamburgermenu'>
                                        <div>
                                            <Tooltip title="Bevásárló kosár">
                                                <IconButton
                                                    onClick={toggleCart(true)}
                                                    size="small"
                                                    sx={{ ml: 2,mr:1 }}
                                                >
                                                    <Badge badgeContent={kosar.length>0 ?kosar.reduce((sum, item) => sum + (item.db), 0):null} color="error">
                                                        <FaShoppingCart />
                                                    </Badge>
                                                </IconButton>
                                            </Tooltip>
                                            <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                                                <FaBars />
                                            </IconButton>
                                            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                                                {menuItems}
                                            </Drawer>
                                        </div>
                                    </div>
                                </div>
                            </Toolbar>
                        </div>
                    </Box>
                </div>

              
                <Drawer anchor="right" open={cartOpen} onClose={toggleCart(false)}>
                    {cartMenu}
                </Drawer>

                        <div className='page'>
                            <Outlet />
                        </div>
                        
                <footer>
                    <Grid container className='block m-auto footer_container'>
                        <Grid item xs={12} sm={12} md={6}>
                            <div className="footer_links">
                                <Link className='footer_link' to="/etelek"><input type="button" value="Ételek" /></Link>
                                <Link className='footer_link' to="/partnereink"><input type="button" value="Partnereink" /></Link>
                                <Link className='footer_link' to="/blog"><input type="button" value="Blog" /></Link>
                                <Link className='footer_link' to="/charity"><input type="button" value="Charity" /></Link>
                                <Link className='footer_link' to="/kapcsolat"><input type="button" value="Kapcsolat" /></Link>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} className='footer_jobb'>
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
                <Link to={pathname} onClick={scrollUp}>
                    <div className={`up ${showButton ? 'fade-in' : 'fade-out'}`}>
                        <FaChevronUp className="upIcon" />
                    </div>
                </Link>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert 
                        onClose={handleSnackbarClose} 
                        severity={snackbarSeverity}
                        sx={{ width: '100%' }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </>
        );
    }
