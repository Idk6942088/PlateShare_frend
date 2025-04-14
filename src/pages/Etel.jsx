import { Box, Button, CircularProgress, Divider, Grid } from '@mui/material';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IoLocationSharp } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { FaShop } from 'react-icons/fa6';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Etel({ db, user, setKosarrefresh, kosarrefresh }) {
    const [etel, setEtel] = useState({});
    const [kosar, setKosar] = useState([]);
    const location = useLocation();
    const etelId = location.pathname.split("etel/")[1];
    const [refresh, setRefresh] = useState(false);
    const [load, setLoad] = useState(false);
    
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    useEffect(() => {
        async function getEtel() {
            const snap = await getDoc(doc(db, "etelek", etelId));
            if (snap.exists()) {
                setEtel(snap.data());
            }
            setLoad(true);
        }
        getEtel();
        
    }, [db, etelId,kosarrefresh]);

    useEffect(() => {
        if(user) {
            async function getKosar() {
                const snap = await getDoc(doc(db, "kosar", user?.uid));
                if (snap.exists()) setKosar(snap.data());
            }
            getKosar();
        }
       
    }, [refresh, db, user]);
    
    const AddToCart = async (userId) => {
      try {
          
          const cartRef = doc(db, "kosar", userId);
          const cartDoc = await getDoc(cartRef);
          
          let currentCart = [];
          
          if (!cartDoc.exists()) {
              
              await setDoc(cartRef, {
                  kosar: []
              });
          } else {
              
              currentCart = cartDoc.data().kosar || [];
          }
  
          
          const existingItemIndex = currentCart.findIndex(item => item.id === etelId);
          const maxQuantity = etel.db || Infinity;
          let newQuantity = 1;
          let isMaxReached = false;
  
          
          if (existingItemIndex !== -1) {
              newQuantity = currentCart[existingItemIndex].db + 1;
              if (newQuantity > maxQuantity) {
                  newQuantity = maxQuantity;
                  isMaxReached = true;
              }
              currentCart[existingItemIndex].db = newQuantity;
          } else {
              currentCart.push({
                  id: etelId,
                  name: etel.nev || 'Névtelen termék',
                  price: etel.ar || 0,
                  image: etel.kepurl || '',
                  partner: etel.partnernev || '',
                  db: 1
              });
          }
  
          
          await updateDoc(cartRef, {
              kosar: currentCart
          });
  
          
          setKosarrefresh(!kosarrefresh);
          setRefresh(!refresh);
          
          if (isMaxReached) {
              setSnackbarMessage(`Elérted a maximális rendelhető mennyiséget (${maxQuantity} db)`);
              setSnackbarSeverity('warning');
          } else {
              setSnackbarMessage('Termék sikeresen hozzáadva a kosárhoz');
              setSnackbarSeverity('success');
          }
          setSnackbarOpen(true);
  
      } catch (error) {
          console.error("Hiba a kosár frissítésekor:", error);
          setSnackbarMessage('Hiba történt a kosár frissítése közben');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
      }
  };

    return (
      <>
        <div className='etel'>
          {load ?
          <Grid container spacing={2} key={etel.id}>
          <Grid item xs={12} sm={12} md={6}>
              <img className='etelkep' src={etel.kepurl} alt={etel.nev} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
              <p className='font-bold uppercase text-4xl text-center' id='etel_kateg'>{etel.kategoria}</p>
              <div id="etel_partnev">
                  <span><FaShop /></span>
                  <span>{etel.partnernev}</span>
              </div>
              <div id="etel_cim">
                  <span><IoLocationSharp /></span>
                  <span>{etel.helyszin}</span>
              </div>
              <div className="etel_ar_db">
                 
                     <p>{etel.ar},-Ft</p>
                      <p>{etel.db} darab</p>
                     
                 
              </div>
              <Button 
                  onClick={() => AddToCart(user?.uid)} 
                  id='etel_gomb' 
                  variant="contained" 
                  endIcon={<FaShoppingBag />}
              >
                  Vásárlás
              </Button>
              <div className="etel_leiras">
                  <p>{etel.leiras}</p>
              </div>
          </Grid>
      </Grid> 
          :<Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>}
           
        </div>
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