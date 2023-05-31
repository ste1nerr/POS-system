import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { styled } from '@mui/system';

const CustomButton = styled(Button)`
  &:hover {
    background-color: #f05457;
    color: white;
  }
`;

const CustomCancelButton = styled(Button)`
  &:hover {
    color: white;
    background-color: #f05457;
  }
`;

const CustomSaveButton = styled(Button)`
  &:hover {
    color: white;
    background-color: #9ecf92;
  }
`;

const CustomDialogTitle = styled(DialogTitle)`
  font-family: 'Montserrat', sans-serif;
`;

const CustomTextField = styled(TextField)`
  .MuiInputBase-root {
    color: #3a3a3a;
  }

  .MuiInputLabel-root {
    color: #3a3a3a;
    font-family: 'Montserrat', sans-serif;
  }

  .MuiOutlinedInput-root {
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #3a3a3a;
    }
  }
`;

const CustomDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 20px;
  }
`;

const PersonalData = ({ onSave, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');

  const handleSubmit = () => {
    // Обработка отправки формы
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Street:', street);
    onSave({ firstName, lastName, street }); // Вызов колбэка и передача данных
    onClose(); // Закрытие модального окна
  };

  return (
    <CustomDialog open={true} onClose={onClose}>
      <CustomDialogTitle>Enter data</CustomDialogTitle>
      <DialogContent>
        <CustomTextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <CustomTextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <CustomTextField
          label="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <CustomCancelButton onClick={onClose} sx={{ color: '#f05457', fontWeight: 'bold' }}>
          Cancel
        </CustomCancelButton>
        <CustomSaveButton onClick={handleSubmit} color="primary" sx={{ color: '#9ecf92', fontWeight: 'bold' }}>
          Save
        </CustomSaveButton>
      </DialogActions>
    </CustomDialog>
  );
};

export default PersonalData;