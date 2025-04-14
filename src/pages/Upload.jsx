import { Alert, Button, Dialog, DialogActions, DialogTitle, Snackbar } from '@mui/material';
import axios from 'axios';
import { addDoc, collection, doc, onSnapshot, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';

export default function Upload({partner,db,user}) {

  const [ar,setAr] = useState("");
  const [meddig,setMeddig] = useState("");
  const [toltes,setToltes] = useState(false);
  const [mettolkezdet,setMettolkezdet] = useState(Timestamp.now().toDate().toLocaleTimeString());
  const [mettolvege,setMettolvege] = useState(Timestamp.now().toDate().toLocaleTimeString());
  const [mettollejarat,setMettollejarat] = useState(Timestamp.now().toDate().toLocaleTimeString());
  const [mennyiseg,setMennyiseg] = useState("");
  const [leiras,setLeiras] = useState("");
  const [nev,setNev] = useState("");
  const [helyszin,setHelyszin] = useState("");
  const [kategoria,setKategoria] = useState("");
  const [file,setFile] = useState("");
  const[kezdet,setKezdet] = useState(Timestamp.now().toDate().toJSON().split("T")[0]);
  const[vege,setVege] = useState(Timestamp.now().toDate().toJSON().split("T")[0]);
  const[lejarat,setLejarat] = useState(Timestamp.now().toDate().toJSON().split("T")[0]);
  const [felhasznalo, setFelhasznalo] = useState([]);

   async function elelmiszerkepupload() {
          const formData = new FormData();
          const add =await addDoc(collection(db, "etelek"), {nev:nev,ar:ar,db:mennyiseg,helyszin:helyszin,mettol:kezdetdatum,meddig:vegedatum,lejarat:lejaratdatum,kategoria:kategoria,leiras:leiras,kepurl:"",partnernev:felhasznalo[0].partnernev}); // AutoID 
          if(add!= null) {
            formData.append("fajl",file);
            formData.append("publicID",add._key.path.segments[1]);
            const resp = await axios.post("http://plateshare-bkend.onrender.com/etel",formData);
            await updateDoc(doc(db, "etelek", add._key.path.segments[1]), { kepurl:resp.data.url });
            setToltes(false);
            showSnackbar('Élelmiszer sikeresen feltöltve!', 'success');
          }
      }

  useEffect(() => {
           if(user!= null) {
          const q = query(collection(db, "users"), where("email", "==", user.email));
          const unsubscribe = onSnapshot(q, (snapshot) => {
            setFelhasznalo(snapshot.docs.map(doc => ({ ...doc.data(), id:doc.id })));
          });
          return () => unsubscribe();}
      }, [user]);

  
  const kezdetdatum = new Date(kezdet);
  let ma = Timestamp.now().toDate();
  kezdetdatum.setHours(mettolkezdet.split(":")[0]);
  kezdetdatum.setMinutes(mettolkezdet.split(":")[1]);
  kezdetdatum.setSeconds(mettolkezdet.split(":")[2]);
  
  const vegedatum = new Date(vege);
  vegedatum.setHours(mettolvege.split(":")[0]);
  vegedatum.setMinutes(mettolvege.split(":")[1]);
  vegedatum.setSeconds(mettolvege.split(":")[2]);

  const lejaratdatum = new Date(lejarat);
  lejaratdatum.setHours(mettollejarat.split(":")[0]);
  lejaratdatum.setMinutes(mettollejarat.split(":")[1]);
  lejaratdatum.setSeconds(mettollejarat.split(":")[2]);
  
  console.log(lejaratdatum);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
          const [snackbarMessage, setSnackbarMessage] = useState('');
          const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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
 
  async function upload() {
    if(nev=="" ||ar=="" ||mennyiseg=="" ||helyszin=="" ||kategoria=="" ||leiras=="" || file=="") {
      console.log("Nincs kitöltve minden")
      setOpen(true);
      
    } else {
      setToltes(true);
      
      elelmiszerkepupload();
      
      console.log("uploading...");
    }
    
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
   
   
    <div>{partner ? <><div className='feltoltes loginpanel m-auto p-5 drop-shadow-xl'>
    
    <h1 className='text-2xl font-bold text-center mb-1'>Élelmiszer feltöltése</h1>
    
    <div  className='flex flex-col gap-3'>
    
        <input typeof='text' type="text" required placeholder='Élelmiszer neve' value={nev} onChange={ e => setNev(e.target.value)} />
        <input type="number"  required min={0} placeholder='Élelmiszer ára' value={ar} onChange={ e => setAr(e.target.value)}/>
        <input type="text" required placeholder='Élelmiszer leírása' value={leiras} onChange={ e => setLeiras(e.target.value)}/>
        <select className='p-2 border-2 border-gray-300 rounded-md' required defaultValue={""} onChange={e => setKategoria(e.target.value)} >
          <option value="" disabled hidden>Válassz egy kategóriát</option>
          <option value="Leves">Leves</option>
          <option value="Főétel">Főétel</option>
          <option value="Desszert">Desszert</option>
          <option value="Ital">Ital</option>
          <option value="Péksütemény">Péksütemény</option>
          <option value="Zöldség">Zöldség</option>
          <option value="Gyümölcs">Gyümölcs</option>
        </select>
        <input type="number" required min={1} placeholder='Élelmiszer mennyisége' value={mennyiseg} onChange={ e => setMennyiseg(e.target.value)} />
        <div className='flex gap-3 flex-col w-fit'>
          <div className='flex gap-3 justify-between datum'> <label className=' my-auto'>Élelmiszer átvételi időpont kezdete: </label>
          <input type="date" required placeholder='Élelmiszer átvehető' value={kezdet} onChange={e => setKezdet(e.target.value)} />
          <input type="time"  requiredplaceholder='Mettől' value={mettolkezdet} onChange={ e => setMettolkezdet(e.target.value)} />
          </div>
        <div className='flex gap-3 justify-between datum'>
        <label className=' my-auto mr-5'>Élelmiszer átvételi időpont vége: </label>
          <input type="date" required placeholder='Élelmiszer vége' value={vege} onChange={e => setVege(e.target.value)} />
          <input type="time"  requiredplaceholder='meddig' value={mettolvege} onChange={ e => setMettolvege(e.target.value)} />
        </div>
        <div className='flex gap-3 justify-between datum'>
        <label className=' my-auto mr-12'>Élelmiszer lejárati időpontja: </label>
          <input type="date" required placeholder='Élelmiszer lejárat' value={lejarat} onChange={ e => setLejarat(e.target.value)} />
          <input type="time"  requiredplaceholder='Lejárat' value={mettollejarat} onChange={ e => setMettollejarat(e.target.value)} />
        </div>
         
         
        </div>
        <input type="text" required placeholder='Élelmiszer helyszíne' value={helyszin} onChange={ e => setHelyszin(e.target.value)}/>
        <label htmlFor="fileinput" className='etelkepupload'>Kép feltöltése az élelmiszerről {file.name}</label>
        <input type="file"  id="fileinput" accept='.jpg,.png,.jpeg'onChange={e => setFile(e.target.files[0])}/>
        <button className='etel_feltoltes_gomb text-white p-2 rounded-md cursor-pointer  flex justify-center' onClick={upload}>{toltes?<CircularProgress size="24px"/>:"Feltöltés"}</button>
    </div>
     
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Minden mező kitöltése kötelező!"}
      </DialogTitle>
     
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Értettem
        </Button>
      </DialogActions>
    </Dialog>
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
   
     : <Navigate to="/"/>}</div>
    
  )
}
