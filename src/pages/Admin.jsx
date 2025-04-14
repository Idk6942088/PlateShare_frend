import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Stack,TextField,Snackbar,Alert,CircularProgress,IconButton,Menu,MenuItem,ListItemIcon,Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { deleteUser } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useState, useEffect } from 'react';
import { FaUserEdit, FaSave, FaEllipsisV } from 'react-icons/fa';
import { MdDeleteForever, MdCancel } from 'react-icons/md';
import { Link, Navigate, useLocation } from 'react-router-dom';

export default function Admin({ admin, db, auth }) {
  const [users, setUsers] = useState([]);
  const [userlist, setUserlist] = useState([]);
  const [messages, setMessages] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editForm, setEditForm] = useState({
    veznev: '',
    kernev: '',
    email: '',
    tipus: ''
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const location = useLocation();
  const userspage = location.pathname === '/admin/felhasznalok';


  
  // Fetch users data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usersSnap = await getDocs(collection(db, "users"));
        const usersData = usersSnap.docs.map(doc => ({ 
          ...doc.data(),
          userid: doc.id,
          id: doc.id,
          nev: `${doc.data().veznev} ${doc.data().kernev}`,
          tipus: doc.data().tipus === "mszemely" ? "Magánszemély" : doc.data().tipus
        }));
        
        setUserlist(usersData);
        
        const messagesSnap = await getDocs(collection(db, "uzenetek"));
        setMessages(messagesSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setNotification({
          open: true,
          message: "Hiba történt az adatok betöltésekor",
          severity: "error"
        });
        setLoading(false);
      }
    };

    fetchData();
  }, [db]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'nev', headerName: 'Név', width: 200 },
    { field: 'tipus', headerName: 'Felhasználó típus', width: 150 },
    {
      field: 'actions',
      headerName: 'Műveletek',
      width: 100,
      renderCell: (params) => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setSelectedRow(params.row);
            setAnchorEl(e.currentTarget);
          }}
        >
          <FaEllipsisV />
        </IconButton>
      ),
    },
  ];

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEditClick = () => {
    if (!selectedRow) return;
    setCurrentUser(selectedRow);
    setEditForm({
      veznev: selectedRow.veznev,
      kernev: selectedRow.kernev,
      email: selectedRow.email,
      tipus: selectedRow.tipus === "Magánszemély" ? "mszemely" : selectedRow.tipus
    });
    setOpenEditDialog(true);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    if (!selectedRow) return;
    setCurrentUser(selectedRow);
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotification({...notification, open: false});
  };

  const handleDeleteConfirm = async () => {
    try {
      if (currentUser) {
        // Single user deletion
        await deleteDoc(doc(db, "users", currentUser.userid));
        setUserlist(userlist.filter(user => user.userid !== currentUser.userid));
        setNotification({
          open: true,
          message: "Felhasználó sikeresen törölve",
          severity: "success"
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setNotification({
        open: true,
        message: "Hiba történt a felhasználó(k) törlésekor",
        severity: "error"
      });
    } finally {
      setOpenDeleteDialog(false);
      setCurrentUser(null);
    }
  };

  const handleEditSave = async () => {
    try {
      if (!currentUser) return;
      
      await updateDoc(doc(db, "users", currentUser.userid), {
        veznev: editForm.veznev,
        kernev: editForm.kernev,
        email: editForm.email,
        tipus: editForm.tipus
      });
      
      setUserlist(userlist.map(user => 
        user.userid === currentUser.userid ? {
          ...user,
          veznev: editForm.veznev,
          kernev: editForm.kernev,
          email: editForm.email,
          tipus: editForm.tipus === "mszemely" ? "Magánszemély" : editForm.tipus,
          nev: `${editForm.veznev} ${editForm.kernev}`
        } : user
      ));
      
      setNotification({
        open: true,
        message: "Felhasználó sikeresen frissítve",
        severity: "success"
      });
    } catch (error) {
      console.error("Error updating user:", error);
      setNotification({
        open: true,
        message: "Hiba történt a felhasználó frissítésekor",
        severity: "error"
      });
    } finally {
      setOpenEditDialog(false);
      setCurrentUser(null);
    }
  };

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className='adminpage'>
      {!admin ? (
        <Navigate to="/" />
      ) : loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress size={60} />
        </Box>
      ) : (
        <div>
          <h1 className='text-3xl font-bold'>Admin Control Panel</h1>
          <div className='adminmenu flex flex-col gap-5 justify-center mt-5 pt-5'>
            <div className='adminmenu_content flex flex-row gap-5 justify-center'>
              <Link to="/admin/felhasznalok">Felhasználók</Link>
            </div>
            <div className='admincontent'>
              {userspage && (
                <Box sx={{ width: '100%' }}>
                  <Paper sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={userlist}
                      columns={columns}
                      initialState={{ pagination: { paginationModel } }}
                      pageSizeOptions={[5, 10]}
                      onRowSelectionModelChange={(newSelection) => {
                        setRowSelectionModel(newSelection);
                      }}
                      rowSelectionModel={rowSelectionModel}
                      sx={{ border: 1, borderColor: "white", borderRadius: "0px" }}
                    />
                  </Paper>
                </Box>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>
          <ListItemIcon>
            <FaUserEdit fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Szerkesztés</Typography>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <MdDeleteForever fontSize="small" color="error" />
          </ListItemIcon>
          <Typography variant="inherit" color="error">Törlés</Typography>
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>
          {currentUser ? "FELHASZNÁLÓ TÖRLÉSE" : "KIJELÖLT FELHASZNÁLÓK TÖRLÉSE"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {currentUser ? (
              `Biztosan törölni szeretnéd a(z) ${currentUser.nev} felhasználót?`
            ) : (
              `Biztosan törölni szeretnéd a kijelölt ${rowSelectionModel.length} felhasználót?`
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Mégse</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Törlés
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>FELHASZNÁLÓ SZERKESZTÉSE</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Vezetéknév"
              value={editForm.veznev}
              onChange={(e) => setEditForm({...editForm, veznev: e.target.value})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Keresztnév"
              value={editForm.kernev}
              onChange={(e) => setEditForm({...editForm, kernev: e.target.value})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm({...editForm, email: e.target.value})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              select
              label="Felhasználó típusa"
              value={editForm.tipus}
              onChange={(e) => setEditForm({...editForm, tipus: e.target.value})}
              SelectProps={{
                native: true,
              }}
            >
              <option value="mszemely">Magánszemély</option>
              <option value="partner">Partner</option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenEditDialog(false)}
            startIcon={<MdCancel />}
          >
            Mégse
          </Button>
          <Button 
            onClick={handleEditSave}
            color="primary"
            startIcon={<FaSave />}
          >
            Mentés
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}