import React, { useEffect } from "react";
import { useForm } from "react-hook-form"; // Importing react-hook-form for form management
import { Box, Button, Modal, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

export default function ContactModal({ open, handleClose, label, onSubmit, contact, icon }) {
  // Initialize the form with react-hook-form
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  // If contact exists, set the form values when the modal opens
  useEffect(() => {
    if (contact) {
      setValue('name', contact.name); // Set the name field value
      setValue('email', contact.email); // Set the email field value
      setValue('phoneNumber', contact.phoneNumber); // Set the phone number field value
    }else {
      reset();
    }
  }, [contact, setValue, reset]);

  // Handler for form submission
  const onSubmitHandler = (data) => {
    if (data.name && data.email && data.phoneNumber) {
      onSubmit(data, contact); // Submit the form data and existing contact
      reset(); // clears input fields
      handleClose(); // Close modal
    }
  };

  return (
    <Modal open={open} onClose={handleClose}> 
      <Box
        sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: {sm: 480, xs: '80%'}, bgcolor: "#121D2B", boxShadow: 24, p: 3,
          borderRadius: 2, display: 'flex', flexDirection: 'column', gap: '20px',
        }}
      >
        {/* Modal title */}
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center", color: '#B554D7' }}>
          {label} Contact
        </Typography>

        {/* Close button for the modal */}
        <CloseIcon onClick={handleClose} sx={{ color: '#B554D7', position: 'absolute', right: '20px', top: '29px', cursor: 'pointer' }} />

        {/* Contact form inputs */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Name input */}
          <Box>
            <Typography variant="body2" color='#FFFFFFB3'>Name</Typography>
            <input
              {...register("name", { required: "Name is required" })} // Register name field with validation
              placeholder='Name'
              style={{ width: '100%', background: '#FFFFFF1A', outline: 'none', color: '#FFFFFF', border: '1px solid #FFFFFF1A', padding: '10px 12px', borderRadius: '8px', fontSize: '16px' }}
            />
            {errors.name && <Typography variant="body2" color="error">{errors.name.message}</Typography>} 
          </Box>

          {/* Email input */}
          <Box>
            <Typography variant="body2" color='#FFFFFFB3'>Email</Typography>
            <input
              {...register("email", { required: "Email is required" })} // Register email field with validation
              placeholder='Email'
              style={{ width: '100%', background: '#FFFFFF1A', outline: 'none', color: '#FFFFFF', border: '1px solid #FFFFFF1A', padding: '10px 12px', borderRadius: '8px', fontSize: '16px' }}
            />
            {errors.email && <Typography variant="body2" color="error">{errors.email.message}</Typography>} 
          </Box>

          {/* Phone number input */}
          <Box>
            <Typography variant="body2" color='#FFFFFFB3'>Phone number</Typography>
            <input
              {...register("phoneNumber", 
                { required: "Phone number is required", 
                  pattern: {value: /^\+998\d{9}$/, // Checking the phone format of the phone of Uzbekistan
                  message: 'Invalid phone number format'} })} // Register phone number field with validation
              placeholder='+998...' type="text"
              style={{ width: '100%', background: '#FFFFFF1A', outline: 'none', color: '#FFFFFF', border: '1px solid #FFFFFF1A', padding: '10px 12px', borderRadius: '8px', fontSize: '16px' }}
            />
            {errors.phoneNumber && <Typography variant="body2" color="error">{errors.phoneNumber.message}</Typography>} 
          </Box>
        </Box>

        {/* Submit button */}
        <Button variant="contained"
          onClick={handleSubmit(onSubmitHandler)} // Trigger form submission using react-hook-form
          startIcon={icon ? icon : <AddIcon />}
          sx={{ width: '105px', height: '48px', borderRadius: '8px', bgcolor: '#B554D7', color: '#121D2B', textTransform: 'none' }}
        >
          {label}
        </Button>
      </Box>
    </Modal>
  );
}
