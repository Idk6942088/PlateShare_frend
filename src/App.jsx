import './App.css'
import { Layout } from './Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import Etelek from './pages/Etelek';
import Partnereink from './pages/Partnereink';
import Blog from './pages/Blog';
import Charity from './Charity';
import Kapcsolat from './pages/Kapcsolat';
import Admin from './pages/Admin';
import Upload from './pages/Upload';
import Notfound from './pages/Notfound';
import Auth from './pages/Auth';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig.js";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from 'react';
import { useState } from 'react';
import Etel from './pages/Etel.jsx';
<<<<<<< HEAD
<<<<<<< HEAD
import Myprofile from './pages/Myprofile.jsx';
=======
>>>>>>> f2b3d7e (Etel.jsx)
=======
import Myprofile from './pages/Myprofile.jsx';
>>>>>>> cafc879 (Myprofile)

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


function App() {

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [partner, setPartner] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [etelurl, setEtelurl] = useState('');
<<<<<<< HEAD


  const [sikeres,setSikeres] = useState(false);
  const [sikertelen,setSikertelen] = useState(false);

  const sikeresClose = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }
    setSikeres(false);
  };

  const sikertelenClose = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }
    setSikertelen(false);
  };
=======
>>>>>>> f2b3d7e (Etel.jsx)


  const [sikeres,setSikeres] = useState(false);
  const [sikertelen,setSikertelen] = useState(false);

  const sikeresClose = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }
    setSikeres(false);
  };

  const sikertelenClose = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }
    setSikertelen(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if(currentUser) {
        tipus(currentUser);
      } else {
        setAdmin(false);
        setPartner(false);
      }
      
    });
    return () => unsubscribe();
  }, []);

  async function tipus(user) {
    
      const q = query(collection(db, "users"),where("email", "==", user.email));
      const snap = await getDocs(q);
      const lst = snap.docs.map(doc => ({ ...doc.data(), id:doc.id }));
      if(user && lst[0].tipus == "admin") {
        setAdmin(true);
        setPartner(false);
      } else if(user && lst[0].tipus == "partner") {
        setPartner(true);
        setAdmin(false);
      }
    
   
  }

  async function logout() {
    await signOut(auth);
    
  }

  const router = createBrowserRouter([
    { path: "/", element: <Layout user={user} logout={logout} admin={admin} partner={partner} />, children: [
      { path: "/", element: <Home sikeres={sikeres} sikeresClose={sikeresClose}/> },
      { path: "/etelek", element: <Etelek db={db}/> },
      { path: "/etel/:id", element: <Etel db={db}/> },
      { path: "/partnereink", element: <Partnereink /> },
      { path: "/blog", element: <Blog /> },
      { path: "/charity", element: <Charity /> },
      { path: "/kapcsolat", element: <Kapcsolat /> },
      { path: "/admin", element: <Admin admin={admin}/> },
      { path: "/upload", element: <Upload partner={partner} db={db}/> },
<<<<<<< HEAD
<<<<<<< HEAD
      { path: "/myprofile", element: <Myprofile user={user} db={db}/> },
      { path: "/auth/in", element: <Auth auth={auth} sikertelen={sikertelen} setSikeres={setSikeres} setSikertelen={setSikertelen} sikertelenClose={sikertelenClose} setUser={setUser}/> },
      { path: "/auth/up", element: <Auth auth={auth} db={db} sikertelen={sikertelen} setSikeres={setSikeres} setSikertelen={setSikertelen} sikertelenClose={sikertelenClose}/> },
<<<<<<< HEAD
=======
=======
      { path: "/myprofile", element: <Myprofile user={user} db={db}/> },
>>>>>>> cafc879 (Myprofile)
      { path: "/auth/in", element: <Auth auth={auth} setUser={setUser}/> },
      { path: "/auth/up", element: <Auth /> },
>>>>>>> b0d0cd4 (Upload)
=======
>>>>>>> 2b50362 (User)
      { path: "*", element: <Notfound /> }
    ]}
  ]);

  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
