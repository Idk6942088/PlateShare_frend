import './App.css'
import { Layout } from './Layout';
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import Etelek from './pages/Etelek';
import Partnereink from './pages/Partnereink';
import Blog from './pages/Blog';
import Charity from './pages/Charity';
import Kapcsolat from './pages/Kapcsolat';
import Admin from './pages/Admin';
import Upload from './pages/Upload';
import Notfound from './pages/Notfound';
import Auth from './pages/Auth';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig.js";
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from 'react';
import { useState } from 'react';
import Myprofile from './pages/Myprofile.jsx';
import Etel from './pages/Etel.jsx';
import axios from 'axios';
import ReceptUpload from './pages/ReceptUpload.jsx';
import Receptek from './pages/Receptek.jsx';
import ReceptRészlet from './pages/ReceptRészlet.jsx';

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);



export default function App() {

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [partner, setPartner] = useState(false);
  const [userpfp,setUserpfp] = useState("");


  const [sikeres,setSikeres] = useState(false);
  const [sikertelen,setSikertelen] = useState(false);

  useEffect(()=> {
    async function getpfp() {
      if(user) {
        const snap = await getDoc(doc(db, "users", user.reloadUserInfo.localId));
        if (snap.exists()) console.log(snap.data());
        if(!snap.data().pfpURL == "") {
          setUserpfp(snap.data().pfpURL);
        } else {
          setUserpfp("");
        }
    }
  }
    getpfp();
  },[user]);

 
  
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
    { path: "/", element: <Layout user={user} userpfp={userpfp} logout={logout} admin={admin} partner={partner} />, children: [
      { path: "/", element: <Home sikeres={sikeres} sikeresClose={sikeresClose}/> },
      { path: "/etelek", element: <Etelek db={db}/> },
      { path: "/etel/:id", element: <Etel db={db}/> },
      { path: "/partnereink", element: <Partnereink /> },
      { path: "/blog", element: <Blog /> },
      { path: "/blog/receptupload", element: <ReceptUpload /> },
      { path: "/blog/receptek", element: <Receptek /> },
      { path: "/blog/recipe/:id", element: <ReceptRészlet /> },
      { path: "/charity", element: <Charity /> },
      { path: "/kapcsolat", element: <Kapcsolat user={user} db={db} /> },
      { path: "/admin", element: <Admin admin={admin} db={db}/> },
      { path: "/admin/felhasznalok", element: <Admin admin={admin} db={db}/> },
      { path: "/admin/uzenetek", element: <Admin admin={admin} db={db}/> },
      { path: "/admin/uzenetek/uzenet", element: <Admin admin={admin} db={db}/> },
      { path: "/upload", element: <Upload partner={partner} db={db} user={user}/> },
      { path: "/myprofile", element: <Myprofile user={user} setUserpfp={setUserpfp} db={db} userpfp={userpfp}/> },
      { path: "/auth/in", element: <Auth auth={auth} user={user} sikertelen={sikertelen} setSikeres={setSikeres} setSikertelen={setSikertelen} sikertelenClose={sikertelenClose} setUser={setUser}/> },
      { path: "/auth/up", element: <Auth auth={auth} user={user} db={db} sikertelen={sikertelen} setSikeres={setSikeres} setSikertelen={setSikertelen} sikertelenClose={sikertelenClose}/> },
      { path: "*", element: <Notfound /> }
    ]}
  ]);

  return (
    <div className='app'>
       <RouterProvider path="/" router={router} />
    </div>
  )
}