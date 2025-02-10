import { Alert, Button,FormControlLabel, Radio, RadioGroup, Snackbar, TextField } from '@mui/material'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Auth({db,auth,sikertelen,setSikeres,setSikertelen,sikertelenClose}) {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [kernev,setKernev] = useState("");
  const [veznev,setVeznev] = useState("");
  const [loginError,setLoginError] = useState(false);
  


  const navigate = useNavigate();
  const location=useLocation()
  console.log(location.pathname);
  const isSignIn=location.pathname=='/auth/in';

  async function login() {
    
    try{
      await signInWithEmailAndPassword(auth, email, password);
       setEmail(""); setPassword("");
       navigate('/',{replace:true});
       setSikeres(true);
    } catch(error){
      console.error(error);
      setSikertelen(true);
    }
  }

  async function register() {

    try {
        
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", auth.currentUser.reloadUserInfo.localId), {email:email, veznev:veznev, kernev:kernev, tipus:usertype});
        setEmail(""); setPassword("");
        
    } catch (error) {
        console.log(error);
        setSikertelen(true);
        
    }
  }

 

  function enter(e){
    if(isSignIn && e.key === "Enter") login();
  }

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
           <FormControlLabel value="mszemely" control={<Radio   onClick={e => setUsertype(e.target.value)} />} label="Magánszemély" />
           <FormControlLabel value="partner" control={<Radio  onClick={e => setUsertype(e.target.value)}/>} label="Partner" />
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
    
          required
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
           
            required
            label="Jelszó"
            type="password"
            value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {!isSignIn ? (
        <Button variant="contained" onClick={register} >Regisztráció</Button>
        ) : (<Button variant="contained" onClick={login}>Bejelentkezés</Button>)}
       
         <Link className='m-auto font-light' to="/pwreset">Elfelejtetted a jelszód?</Link>
         {!isSignIn ? <Link className='m-auto font-light' to="/auth/in">Van már fiókod? Kattints ide</Link>
         : <Link className='m-auto font-light' to="/auth/up">Nincs még fiókod? Kattints ide</Link>  }

    </div>
       
    </>
  )
}
