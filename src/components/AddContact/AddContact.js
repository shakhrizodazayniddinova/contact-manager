import React, { useState } from 'react';
import { Button } from '@mui/material';
import ContactModal from '../ContactModal/ContactModal';
import AddIcon from "@mui/icons-material/Add";

export default function AddContact({onSubmit}) {
  const [open, setOpen] = useState(false);  // modal state

  return (
    <>
    <Button startIcon={<AddIcon />} onClick={() => setOpen(true)} 
      sx={{ maxWidth: '176px', maxHeight: '48px', border: '2px solid #B554D7', borderRadius: '8px', color: '#B554D7', textTransform: 'none', padding: '10px 22px' }}
    > Add contact </Button>

    {/* ContactForm Modal */}
    <ContactModal open={open} handleClose={() => setOpen(false)} label={'Add'} onSubmit={onSubmit} />
    </>
  )
}
