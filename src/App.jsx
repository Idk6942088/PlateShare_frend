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
import Myprofile from './pages/Myprofile.jsx';

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


function App() {

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [partner, setPartner] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
    setRefresh(!refresh);
    
  }

  const router = createBrowserRouter([
    { path: "/", element: <Layout user={user} logout={logout} admin={admin} partner={partner} />, children: [
      { path: "/", element: <Home /> },
      { path: "/etelek", element: <Etelek db={db}/> },
      { path: "/partnereink", element: <Partnereink /> },
      { path: "/blog", element: <Blog /> },
      { path: "/charity", element: <Charity /> },
      { path: "/kapcsolat", element: <Kapcsolat /> },
      { path: "/admin", element: <Admin admin={admin}/> },
      { path: "/upload", element: <Upload partner={partner} db={db}/> },
      { path: "/myprofile", element: <Myprofile user={user} db={db}/> },
      { path: "/auth/in", element: <Auth auth={auth} setUser={setUser}/> },
      { path: "/auth/up", element: <Auth /> },
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
