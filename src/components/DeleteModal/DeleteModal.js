import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import warning from './warning.png';

export default function DeleteModal({open, handleDeleteClose, onDelete}) {
  return (
    <Modal open={open} onClose={handleDeleteClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {sm: 480, xs: '80%'},
          bgcolor: "#121D2B",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {/* warning img */}
        <Box sx={{width: {sm: 'auto', xs: '50px'}}}>
          <img src={warning} alt="warning" width={'100%'}/>
        </Box>

        <Typography color='white' sx={{fontSize: {sm: 'auto', xs: '15px'},}}>Are you sure? Deleting cannot be undone.</Typography>

        {/* buttons container */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Button variant="contained" onClick={handleDeleteClose} sx={{ width: {sm: '206px', xs: '130px'}, height: '48px', borderRadius: '8px', bgcolor: '#B554D7', color: '#121D2B', textTransform: 'none' }}>
                No, keep
            </Button>
            <Button variant="outlined" onClick={() => {onDelete(); handleDeleteClose()}} sx={{ width: {sm: '206px', xs: '130px'}, height: '48px', borderRadius: '8px', border: '2px solid #FFFFFF1A', color: '#B554D7', textTransform: 'none' }}>
                Delete
            </Button>
        </Box>
      </Box>
    </Modal>
  )
}
