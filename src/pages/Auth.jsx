import { Alert, Button,FormControlLabel, Radio, RadioGroup, Snackbar, TextField } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useState } from 'react'
import { Link, replace, useLocation, useNavigate } from 'react-router-dom'

export default function Auth({auth}) {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [kernev,setKernev] = useState("");
  const [veznev,setVeznev] = useState("");
  const [loginError,setLoginError] = useState(false);
  const [open, setOpen] = useState(false);

  console.log(open);

  const navigate = useNavigate();

  const location=useLocation()
  console.log(location.pathname);
  const isSignIn=location.pathname=='/auth/in';

  async function login() {
    try{
      await signInWithEmailAndPassword(auth, email, password);
       setEmail(""); setPassword("");
       navigate('/',{replace:true});
       setLoginError(false);
       setOpen(true);
       
    } catch(error){
      console.error(error);
      setLoginError(true);
    }
  }

  function enter(e){
    if(e.key === "Enter") login();
  }

  const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
  return;
  }
  setOpen(false);
};



  return (
    <>
    <div className='loginpanel m-auto drop-shadow-xl' onKeyDown={e => enter(e)}>
        
        <h3 className='border-b-2 pb-3  border-gray-400 text-center text-2xl font-bold mb-1 '>{isSignIn ? "Bejelentkezés" : "Regisztráció"}</h3>
        
        {!isSignIn && (
         <>
          <RadioGroup
            className='m-auto'
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="usertype"
          >
           <FormControlLabel value="maganszemely" control={<Radio />} label="Magánszemély" />
           <FormControlLabel value="partner" control={<Radio />} label="Partner" />
          </RadioGroup>

         <div className='flex gap-3  border-t-2 pt-3  border-gray-400'>
         <TextField
         className='w-1/2'
         required
         label="Vezetéknév"
         value={veznev}
         onChange={e => setVeznev(e.target.value)}
       />
          <TextField
          className='w-1/2'
          required
          label="Keresztnév"
          value={kernev}
          onChange={e => setKernev(e.target.value)}
        />
        </div>
       
         </>
       )}
        
          <TextField
          error={loginError}
          required
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
            error={loginError}
            required
            label="Jelszó"
            type="password"
            value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {!isSignIn ? (
        <Button variant="contained" >Regisztráció</Button>
        ) : (<Button variant="contained" onClick={login}>Bejelentkezés</Button>)}
       
         <Link className='m-auto font-light' to="/pwreset">Elfelejtetted a jelszód?</Link>
         <Link className='m-auto font-light' to="/auth/up">Még nincs fiókod? Kattints ide</Link>
    </div>
       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
       <Alert
       onClose={handleClose}
       severity="success"
       variant="filled"
       sx={{ width: '100%' }}
       >
       Sikeres bejelentkezés!
       </Alert>
      </Snackbar>
    </>
  )
}
