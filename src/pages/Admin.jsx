import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { deleteUser } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

export default function Admin({admin,db}) {

  const [users,setUsers] = useState([]);
  const [userlist,setUserlist] = useState([]);
  const [messages,setMessages] = useState([]);
  const [uzenet,setUzenet] = useState(null);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  let nextId=0;
  let nextIdmessages=0;

  useEffect(() => {
    async function getMessages() {
      const snap = await getDocs(collection(db, "uzenetek"));
      const lst = snap.docs.map(doc => ({ ...doc.data(), id:doc.id }));
    setMessages(lst);
    }
    getMessages();

},[]);

useEffect(() => {
  async function getUserList() {
    const snap = await getDocs(collection(db, "users"));
    const ls = snap.docs.map(doc => ({ ...doc.data(),userid:doc.id}));
    for(let a of ls) {
      if(a.tipus=="mszemely") a.tipus="Magánszemély";
      a.nev=a.veznev+" "+a.kernev;
      a.id=nextId++;
    }
    setUserlist(ls);
  }
  getUserList();

  async function getUsers() {
    let lst =[]
    for(let a of messages) {
      const snap = await getDoc(doc(db, "users", a.id));
      if (snap.exists()){
        lst.push(snap.data());
        lst[nextIdmessages].nev=lst[nextIdmessages].veznev+" "+lst[nextIdmessages].kernev;
        lst[nextIdmessages].id=nextIdmessages++;
      }
    }
    setUsers(lst);
  }
  getUsers();

},[userlist.length]);

  const location=useLocation()
  const userspage=location.pathname=='/admin/felhasznalok';
  const messagespage=location.pathname=='/admin/uzenetek';
  const messagepage=location.pathname=='/admin/uzenetek/uzenet';
  
  const paginationModel = { page: 0, pageSize: 5 };

  const [open, setOpen] = useState(false);

  const handleClickOpen = (e,row) => {
    setOpen(true);
    e.stopPropagation();
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function DeleteUser(index) {
    for(let i=0;i<index.length;i++) {
      
      console.log(index[i]+" "+userlist[index[i]].userid+" "+userlist.length);
      userlist.splice(index[i],1);
      await deleteDoc(doc(db, "users", userlist[index[i]].userid));
      
    }
    setOpen(false);

  }

  
  const columns = [
    { field: 'id', headerName: 'ID', width: 70,},
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'nev', headerName: 'Név', width: 100 },
    { field: 'tipus', headerName: 'Felhasználó típus', width: 130 },
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
              <Box sx={{ width: '100%' }}>
              
              <Paper sx={{ height: 350, width: '100%'}}>
                  <DataGrid
                    rows={userlist}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                      setRowSelectionModel(newRowSelectionModel);
                    }}
                    rowSelectionModel={rowSelectionModel}
                    sx={{ border: 1,borderColor:"white", borderRadius:"0px" }}
                  />
                  </Paper>
                  <Stack direction="row" spacing={1} sx={{padding:'10px',backgroundColor:'white',borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}>
                <Button size="small" sx={{backgroundColor:"blue",color:'white',fontWeight:"bold",padding:'5px'}} >
                  <FaUserEdit className=' m-auto my-0.1 text-white text-2xl rounded-md'/>
                </Button>
                  
                <Button size="small" sx={{backgroundColor:"red",color:'white',fontWeight:"bold",padding:'5px'}}>
                  <MdDeleteForever className=' m-auto text-white text-2xl rounded-md' onClick={(e) => handleClickOpen(e)}/>
                </Button>
                
              </Stack>
            </Box>
            <Dialog
              open={open}
              onClose={()=>setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                 {"FELHASZNÁLÓI FIÓK TÖRLÉSE"}
              </DialogTitle>
              <DialogContent key={rowSelectionModel}>
                 <DialogContentText key={rowSelectionModel} id="alert-dialog-description">
                    {rowSelectionModel.length==0?"Nincs kijelölve felhasználó!":(<>
                      {rowSelectionModel.length>1?"Biztosan törölni szeretéd ezeket a felhasználókat?"
                   :"Biztosan törölni szeretéd ezt a felhasználót?"}
                   <br/></>)}
                   {rowSelectionModel.length!=0?(rowSelectionModel.map((x)=><p>{userlist[x].nev}</p>)):""}
                 </DialogContentText>
              </DialogContent>
              <DialogActions>
                 <Button onClick={()=>setOpen(false)}>Mégse</Button>
                 {rowSelectionModel.length==0?"":<Button onClick={(e)=>DeleteUser(rowSelectionModel)} autoFocus>Törlés</Button>}
                 
              </DialogActions>
            </Dialog>
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
