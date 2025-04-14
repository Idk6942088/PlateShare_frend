import { Alert, Button, FormControlLabel, Radio, RadioGroup, Snackbar, TextField } from '@mui/material'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

export default function Auth({db, user, auth}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [kernev, setKernev] = useState("");
  const [veznev, setVeznev] = useState("");
  const [usertype, setUsertype] = useState("mszemely");
  const [partnernev, setPartnernev] = useState("");
  
  // Error states
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    veznev: "",
    kernev: "",
    partnernev: ""
  });

  // Notification states
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" // 'success' or 'error'
  });

  const navigate = useNavigate();
  const location = useLocation();
  const isSignIn = location.pathname === '/auth/in';

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      veznev: "",
      kernev: "",
      partnernev: ""
    };

    let isValid = true;

    if (!email) {
      newErrors.email = "Email cím megadása kötelező";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Érvényes email cím megadása kötelező";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Jelszó megadása kötelező";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "A jelszónak legalább 6 karakter hosszúnak kell lennie";
      isValid = false;
    }

    if (!isSignIn) {
      if (!veznev) {
        newErrors.veznev = "Vezetéknév megadása kötelező";
        isValid = false;
      }

      if (!kernev) {
        newErrors.kernev = "Keresztnév megadása kötelező";
        isValid = false;
      }

      if (usertype === "partner" && !partnernev) {
        newErrors.partnernev = "Partnernév megadása kötelező";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const showNotification = (message, severity) => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({...notification, open: false});
  };

  async function login() {
    if (!validateForm()) return;
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail(""); 
      setPassword("");
      showNotification("Sikeres bejelentkezés!", "success");
      setTimeout(() => navigate('/', {replace: true}), 1500);
    } catch(error) {
      let errorMessage = "Sikertelen bejelentkezés";
      if (error.code === "auth/user-not-found") {
        errorMessage = "Nem található felhasználó ezzel az email címmel";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Hibás jelszó";
      }
      showNotification(errorMessage, "error");
    }
  }

  async function register() {
    if (!validateForm()) return;

    try {    
      await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", auth.currentUser.reloadUserInfo.localId), {
        email: email, 
        veznev: veznev, 
        kernev: kernev,
        pfpURL: "",
        tipus: usertype,
        ...(usertype === "partner" && { partnernev: partnernev })
      });
      setEmail(""); 
      setPassword("");
      showNotification("Sikeres regisztráció! Most már bejelentkezhetsz.", "success");
      setTimeout(() => navigate('/auth/in', {replace: true}), 1500);
    } catch (error) {
      let errorMessage = "Sikertelen regisztráció";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Ez az email cím már használatban van";
      }
      showNotification(errorMessage, "error");
    }
  }

  function enter(e) {
    if (e.key === "Enter") {
      isSignIn ? login() : register();
    }
  }

  return (
    <>
      {user ? <Navigate to="/"/> : ""}
      <div className='loginpanel m-auto drop-shadow-xl' onKeyDown={e => enter(e)}>

        <h3 className='border-b-2 pb-3 border-gray-400 text-center text-2xl font-bold mb-1'>
          {isSignIn ? "Bejelentkezés" : "Regisztráció"}
        </h3>
        
        {!isSignIn && (
          <>
            <RadioGroup
              className='m-auto'
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="usertype"
            >
              <FormControlLabel 
                value="mszemely" 
                control={<Radio checked={usertype === "mszemely"} onClick={e => setUsertype(e.target.value)} />} 
                label="Magánszemély" 
              />
              <FormControlLabel 
                value="partner" 
                control={<Radio checked={usertype === "partner"} onClick={e => setUsertype(e.target.value)}/>} 
                label="Partner" 
              />
            </RadioGroup>

            <div className='flex gap-3 border-t-2 pt-3 border-gray-400'>
              <TextField
                className='w-1/2'
                required 
                label="Vezetéknév"
                value={veznev}
                onChange={e => setVeznev(e.target.value)}
                error={!!errors.veznev}
                helperText={errors.veznev}
              />
              <TextField
                className='w-1/2'
                required
                label="Keresztnév"
                value={kernev}
                onChange={e => setKernev(e.target.value)}
                error={!!errors.kernev}
                helperText={errors.kernev}
              />
            </div>
            
            {usertype === "partner" && (
              <TextField
                className=''
                required
                label="Partnernév"
                value={partnernev}
                onChange={e => setPartnernev(e.target.value)}
                error={!!errors.partnernev}
                helperText={errors.partnernev}
              />
            )}
          </>
        )}
        
        <TextField
          required
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        
        <TextField
          required
          label="Jelszó"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
        
        {!isSignIn ? (
          <Button variant="contained be_reg_gombok" onClick={register}>Regisztráció</Button>
        ) : (
          <Button variant="contained be_reg_gombok" onClick={login}>Bejelentkezés</Button>
        )}
       
        <Link className='m-auto font-light' to="/pwreset">Elfelejtetted a jelszód?</Link>
        {!isSignIn ? (
          <Link className='m-auto font-light' to="/auth/in">Van már fiókod? Kattints ide</Link>
        ) : (
          <Link className='m-auto font-light' to="/auth/up">Nincs még fiókod? Kattints ide</Link>
        )}
      </div>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%', mb: 5 }}
          
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  )
}