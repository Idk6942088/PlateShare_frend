import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

export default function Admin({admin,db}) {

  const [users,setUsers] = useState([]);
  const [messages,setMessages] = useState([]);
  const [uzenet,setUzenet] = useState(null);
  const [rowid,setRowid] = useState(null);
  
  let nextId=0;

  useEffect(() => {
    async function getMessages() {
      const snap = await getDocs(collection(db, "uzenetek"));
      const lst = snap.docs.map(doc => ({ ...doc.data(), id:doc.id }));
    setMessages(lst);
    }
    getMessages();

},[]);

useEffect(() => {
  async function getUsers() {
    let lst =[]
    for(let a of messages) {
      const snap = await getDoc(doc(db, "users", a.id));
      if (snap.exists()){
        lst.push(snap.data());
        lst[nextId].nev=lst[nextId].veznev+" "+lst[nextId].kernev;
        lst[nextId].id=nextId++;
      }
    }
    setUsers(lst);
  }
  getUsers();

},[messages]);


const navigate = useNavigate();
  const location=useLocation()
  const userspage=location.pathname=='/admin/felhasznalok';
  const messagespage=location.pathname=='/admin/uzenetek';
  const messagepage=location.pathname=='/admin/uzenetek/uzenet';
  const orders=location.pathname=='/admin/rendelesek';
  const termekek=location.pathname=='/admin/termekek';
  

  const paginationModel = { page: 0, pageSize: 5 };

  const [open, setOpen] = useState(false);

  const handleClickOpen = (e,row) => {
    setOpen(true);
    e.stopPropagation();
    setRowid(row.id);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'nev', headerName: 'Név', width: 100 },
    { field: 'tipus', headerName: 'Felhasználó típus', width: 130 },
    { field: 'delete', headerName: '', width: 115, renderCell: (params) => {
      return (
        <>
        <MdDeleteForever className='bg-red-500 m-auto p-1 my-2  text-white text-4xl rounded-md' onClick={(e) => handleClickOpen(e,params.row)}/>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"FELHASZNÁLÓI FIÓK TÖRLÉSE"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Biztosan törölni szeretéd ezt a felhasználót?<br/>
            {rowid!=null?users[rowid].nev:""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Mégse</Button>
          <Button onClick={handleClose} autoFocus>
            Törlés
          </Button>
        </DialogActions>
      </Dialog>
        </>
      );
    } },
  ];
  
  return (
    <div className='adminpage'>{admin ? 
      <div>
        <h1 className='text-3xl font-bold'>Admin Control Panel </h1>
        <div className='adminmenu flex flex-col gap-5 justify-center mt-5 pt-5'>
          <div className='adminmenu_content flex flex-row gap-5 justify-center'>
          <Link to="/admin/felhasznalok">Felhasználók</Link>
          <Link to="/admin/uzenetek">Üzenetek</Link>
          </div>
          <div className='admincontent'>
            {userspage ? 
                <>
                  <Paper sx={{ height: 350, width: '100%'}}>
                  <DataGrid
                    rows={users}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    
                    sx={{ border: 0 }}
                  />
                  </Paper>
                  </>
            
            : ""}
            {messagespage && messages.length==0 ? "Nincsenek üzenetek" : 
            <div className=''> {messagespage && users.map((x,i)=> <div className='uzenetbox'><span>{x.veznev} {x.kernev}</span> <span>{x.email}</span> {<Link to="/admin/uzenetek/uzenet"><Button variant="contained" onClick={()=>setUzenet(i)} >Megnyitás</Button></Link>} {<Button variant="contained" color='error'>Lezárás</Button>}</div>  )} </div>}
            {messagepage ? <div className='uzenetcontent'>{messages.map((x,i)=> <div className='bg-blue-600 text-white font-medium  p-2 m-2 rounded-xl'>{x.uzenet}</div>)}<Button variant="contained">Válasz küldése</Button> </div> : ""}
          </div>
        </div>
       
      </div>
      
      
      : <Navigate to="/"/>}</div>
  )
}
