import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchForm({onSearch}) {
  const handleSearchChange = (event) => {
    onSearch(event.target.value); // Send search input to parent
  };

  return (
    <Box sx={{ width: {xs: '90%', sm: '40%'}, height: 'auto', textAlign: 'center' }}>
        <Typography color='#FFFFFF66'>Search name & email</Typography>

        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', mt: 2 }}>
            <input 
                type="text" placeholder='Search'
                onChange={handleSearchChange} // Handle input change
                style={{ width: '100%', background: '#FFFFFF1A', outline: 'none', color: '#FFFFFF', border: '1px solid #FFFFFF1A', padding: '10px 12px', borderRadius: '40px', fontSize: '16px' }} 
            />
            <IconButton 
                sx={{ color: '#121D2B', bgcolor: '#B554D7', 
                '&:hover': {
                    bgcolor: '#B554D7',
                } 
                }}
            ><SearchIcon /></IconButton>
        </Box>
    </Box>
  )
}
