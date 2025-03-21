import { collection, getDocs } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

export default function Admin({admin,db}) {

  const [users,setUsers] = useState([]);

  useEffect(() => {
    if(users.length == 0) {
      async function getUsers() {
        const snap = await getDocs(collection(db, "users"));
        const lst = snap.docs.map(doc => ({ ...doc.data(), id:doc.id }));
      setUsers(lst);
      }
      getUsers();
    }

  },[]);
  
  

const navigate = useNavigate();
  const location=useLocation()
  console.log(location.pathname);
  console.log(users);
  const userspage=location.pathname=='/admin/felhasznalok';
  const messages=location.pathname=='/admin/uzenetek';
  const orders=location.pathname=='/admin/rendelesek';
  const termekek=location.pathname=='/admin/termekek';

  return (
    <div className='adminpage'>{admin ? 
      <div>
        <h1 className='text-3xl font-bold'>Admin Control Panel </h1>
        <div className='adminmenu flex flex-col gap-5 justify-center mt-5 pt-5'>
          <div className='adminmenu_content flex flex-row gap-5 justify-center'>
          <Link to="/admin/felhasznalok">Felhasználók</Link>
          <Link to="/admin/termek">Termékek</Link>
          <Link to="/admin/rendelesek">Rendelések</Link>
          <Link to="/admin/uzenetek">Üzenetek</Link>
          </div>
          <div className='admincontent'>
            {userspage ? 
              
                <div className='userslist'>
                
                  <table>
                  <tr>
                  <td className='userheader'>Email</td>
                  <td>Név</td>
                  <td>Felhasználó típus</td>
                  <td></td>
                  </tr>
                 
                  
                  {users.map(user => (
                    <tr key={user.id} className='userrow'>
                      <td className='useremail'>{user.email}</td>
                      <td>{user.veznev} {user.kernev}</td>
                      <td>{user.tipus}</td>
                      <td className='usertorol'>X</td>
                    </tr>
                  ))}
                  </table>
                </div>
              
            
            : ""}
            {messages ? "Üzenetek" : ""}
          
          </div>
        </div>
       
      </div>
      
      
      : <Navigate to="/"/>}</div>
  )
}
