import React, { useEffect, useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import ContactModal from "../ContactModal/ContactModal";
import AddContact from "../AddContact/AddContact";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, Menu, MenuItem, List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from '@mui/icons-material/Check';

// contacts - default data
const initialContacts = [
  { id: 1, name: "Alexis", phoneNumber: "+998992847674", email: "alexis@gmail.com" },
  { id: 2, name: "Label", phoneNumber: "+998992847674", email: "label@gmail.com" },
];

export default function ContactTable({searchTerm}) {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : initialContacts;
  });  
  const [open, setOpen] = useState(false);  // edit modal state
  const [deleteOpen, setDeleteOpen] = useState(false);  // delet modal state
  const [anchorEl, setAnchorEl] = useState(null);  // dropdown state
  const [selectedContact, setSelectedContact] = useState(null);  // contact data state

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update localStorage whenever contacts state changes
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // add or edit contact function
  const handleAddOrEditContact = (formData, contact) => {
    if (contact) { // If editing, update the contact
      setContacts(contacts.map(c => (c.id === contact.id ? { ...c, ...formData } : c)));
    } else { // If adding, add a new contact
      setContacts([{ id: contacts.length + 1, ...formData }, ...contacts]);
    }

    // Reset selected contact after adding/editing
    setSelectedContact(null);
  };

  // menu open function
  const handleMenuOpen = (event, contact) => {
    setAnchorEl(event.currentTarget);
    setSelectedContact(contact);
  };

  //  menu close function 
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // delete contact function
  const handleDeleteContact = () => {
    setDeleteOpen(true);
    setContacts(contacts.filter((c) => c.id !== selectedContact.id));
  };

  return (
    <>
    <TableContainer
      component={Paper}
      sx={{ maxWidth: '50%', height: '100%', display: { xs: "none", sm: "block" }, boxShadow: 'none', bgcolor: "transparent", borderRadius: 2, overflowY: "scroll", "&::-webkit-scrollbar": { display: "none" }}}
    >
      <Table>
        {/* contact table head */}
        <TableHead>
          <TableRow sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Phone</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="right"> Actions </TableCell>
          </TableRow>
        </TableHead>

        {/* contact table body */}
        <TableBody>
          {filteredContacts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                No contacts found
              </TableCell>
            </TableRow>
          ) : (
            filteredContacts.map((contact) => (
              <TableRow key={contact.id}
                sx={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
                }}
              >
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>{contact.name}</TableCell>
                <TableCell sx={{ color: "rgba(255, 255, 255, 0.6)" }}>{contact.phoneNumber}</TableCell>
                <TableCell sx={{ color: "rgba(255, 255, 255, 0.6)" }}>{contact.email}</TableCell>
                <TableCell align="right">
                  <IconButton edge="end" sx={{ color: "#9c27b0" }} onClick={(event) => handleMenuOpen(event, contact)}>
                    <MenuIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {/* Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} PaperProps={{ sx: { bgcolor: "#121D2B", color: "#fff" } }}>
        <MenuItem onClick={() => { setOpen(true); handleMenuClose() }}>
          <EditIcon sx={{ marginRight: 1 }} /> Edit
        </MenuItem>

        <MenuItem onClick={() => { setDeleteOpen(true); handleMenuClose() }} sx={{color: '#9c27b0'}}>
          <DeleteIcon sx={{ marginRight: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* ContactForm Modal */}
      <ContactModal open={open} handleClose={() => setOpen(false)} label={'Edit'} onSubmit={handleAddOrEditContact} contact={selectedContact} icon={<CheckIcon />} />

      {/* Delete Modal */}
      <DeleteModal open={deleteOpen} handleDeleteClose={() => setDeleteOpen(false)} onDelete={handleDeleteContact} />
    </TableContainer>

    <List sx={{ display: { xs: "block", sm: "none" }, width: '90%', height: '100%' }}>
      {filteredContacts.length === 0 ? (
        <ListItem>
          <ListItemText colSpan={4} align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
            No contacts found
          </ListItemText>
        </ListItem>
      ) : (
        filteredContacts.map((contact) => (
          <ListItem key={contact.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '5px', bgcolor: "rgba(255, 255, 255, 0.05)", mb: 1, borderRadius: 1, overflow: 'hidden' }}>
            <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Typography fontSize={'18px'} fontWeight={'bold'} color="lightgray">{contact.name}</Typography>
  
              <IconButton edge="end" sx={{ color: "#9c27b0" }} onClick={(event) => handleMenuOpen(event, contact)}>
                <MenuIcon fontSize="small"  />
              </IconButton>
            </Box>
  
            <Typography fontSize={'16px'} color="#FFFFFF66">{contact.phoneNumber} | {contact.email}</Typography>
          </ListItem>
        ))
      )}
    </List>

    {/* add contact button */}
    <AddContact onSubmit={handleAddOrEditContact} />
    </>
  );
}
