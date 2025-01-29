import React, { useState } from 'react';
import ContactList from '../ContactList/ContactList';
import AddContact from '../AddContact/AddContact';
import { Box } from '@mui/material';
import SearchForm from '../SearchForm/SearchForm';

export default function ContactManagementApp() {
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term
  };
  
  return (
    // contact app container
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '60px', bgcolor: '#121D2B', padding: '50px 0' }}>
        {/* contact search form container */}
        <SearchForm onSearch={handleSearch} />

        {/* contact lists */}
        <ContactList searchTerm={searchTerm} />
    </Box>
  )
}
