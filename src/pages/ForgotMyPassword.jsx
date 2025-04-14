import { Alert, Button, Snackbar, TextField } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function ForgotMyPassword({auth}) {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateForm = () => {
        if (!email) {
            setEmailError("Email cím megadása kötelező");
            return false;
        } else if (!validateEmail(email)) {
            setEmailError("Érvényes email cím megadása kötelező");
            return false;
        }
        setEmailError("");
        return true;
    };

    async function forgotPassword() {
        if (!validateForm()) return;

        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess(true);
            setEmail("");
        } catch (error) {
            console.error(error);
            setErrorMessage(getErrorMessage(error.code));
            setError(true);
        }
    }

    const getErrorMessage = (errorCode) => {
        switch(errorCode) {
            case "auth/user-not-found":
                return "Nincs regisztrált felhasználó ezzel az email címmel";
            case "auth/invalid-credential":
                return "Nincs regisztrált felhasználó ezzel az email címmel";
            case "auth/invalid-email":
                return "Érvénytelen email cím formátum";
            default:
                return "Hiba történt a jelszó visszaállítás közben";
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    return (
      <>
        <div className='loginpanel m-auto drop-shadow-xl'>
            <h3 className='border-b-2 pb-3 border-gray-400 text-center text-2xl font-bold mb-1'>
                Elfelejtett jelszó
            </h3>
            
            <div className='flex flex-col gap-3 pt-3 border-gray-400'>
                <TextField
                    required
                    label="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    error={!!emailError}
                    helperText={emailError}
                    onKeyPress={(e) => e.key === 'Enter' && forgotPassword()}
                />
                
                <Button 
                    className=' jelszoIgenyles_gomb'
                    variant="" 
                    onClick={forgotPassword}
                >
                    Új jelszó igénylése
                </Button>
                
                <Link className='m-auto font-light' to="/auth/in">
                    Van már fiókod? Kattints ide
                </Link>
                <Link className='m-auto font-light' to="/auth/up">
                    Nincs még fiókod? Kattints ide
                </Link>  
            </div>

           
        </div>
         <Snackbar 
         open={success} 
         autoHideDuration={6000} 
         onClose={handleClose}
         anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
     >
         <Alert onClose={handleClose} severity="success" sx={{ width: '100%',marginBottom:'50px'}}>
             Ellenőrizd az email fiókodat a jelszó visszaállítási linkért!
         </Alert>
     </Snackbar>

     <Snackbar 
         open={error} 
         autoHideDuration={6000} 
         onClose={handleClose}
         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
     >
         <Alert onClose={handleClose} severity="error" sx={{ width: '100%',marginBottom:'50px'}}>
             {errorMessage}
         </Alert>
     </Snackbar>
     </>
    )
}