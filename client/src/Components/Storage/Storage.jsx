import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Grid,
  IconButton,
  InputLabel
} from '@mui/material';
import { styled } from '@mui/system';



const styles = {
  container: {
    marginBottom: '20px',
  },
  gridItem: {
    borderRadius: 20,
    display: 'flex',
    gap: '10px',
  },
  button: {
    marginLeft: '18px',
    borderRadius: 0,
    marginTop: '20px',
    width: '220px',
    backgroundColor: '#F4F4F4',
    fontFamily: 'Montserrat, sans-serif',
    '&:hover': {
      backgroundColor: '#9ECF92',
    },
  },
  textfield: {
    borderRadius: '20px',
  },
  tableCell: {
    fontFamily: 'Montserrat, sans-serif',
  },
};

const Storage = () => {
  const { user } = useContext(UserContext);
  const [storageData, setStorageData] = useState([]);
  const [newItem, setNewItem] = useState({
    ingredientName: '',
    quantity: '',
    unit: '',
    minQuantity: '',
    maxQuantity: '',
    supplier: '',
    pricePerUnit: '',
    deliveryDate: '',
    expirationDate: '',
  });


  const ButtonGroup = styled('div')(({ theme }) => ({
    fontFamily: 'Montserrat',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '& > *': {
      marginRight: theme.spacing(1),
      color: theme.palette.text.primary,
    },
  }));

  const AddButton = styled(Button)({
    color: 'black',
    borderRadius: '10px',
    marginTop: '20px',
    width: '220px',
    backgroundColor: '#F4F4F4',
    fontFamily: 'Montserrat, sans-serif',
    '&:hover': {
      color: 'white',
      backgroundColor: '#9ECF92',
    },
  });

  const DeleteButton = styled(Button)({
    color: 'black',
    borderRadius: '10px',
    width: '100px',
    backgroundColor: '#F4F4F4',
    fontFamily: 'Montserrat, sans-serif',
    '&:hover': {
      color: 'white',
      backgroundColor: '#F05457',
    },
  });
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/storage/get/${user._id}`);
      setStorageData(response.data);
    } catch (error) {
      console.error('Error fetching storage data:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddItem = async () => {
    try {
      const formattedDeliveryDate = new Date(newItem.deliveryDate).toISOString().split('T')[0];
      const formattedExpirationDate = new Date(newItem.expirationDate).toISOString().split('T')[0];

      await axios.post(`http://localhost:5000/storage/create/${user._id}`, {
        ...newItem,
        deliveryDate: formattedDeliveryDate,
        expirationDate: formattedExpirationDate,
      });

      fetchData();
      setNewItem({
        ingredientName: '',
        quantity: '',
        unit: '',
        minQuantity: '',
        maxQuantity: '',
        supplier: '',
        pricePerUnit: '',
        deliveryDate: '',
        expirationDate: '',
      });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (ingredientName) => {
    try {
      await axios.post(`http://localhost:5000/storage/delete/${user._id}`, {
        ingredientName: ingredientName,
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.formRow}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <InputLabel>Ingredient Name</InputLabel>
              <TextField
                style={styles.textfield}
                name="ingredientName"
                value={newItem.ingredientName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel>Quantity</InputLabel>
              <TextField
                name="quantity"
                value={newItem.quantity}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel>Unit</InputLabel>
              <TextField
                name="unit"
                value={newItem.unit}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </div>
        <div style={styles.formRow}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <InputLabel>Min Quantity</InputLabel>
              <TextField
                name="minQuantity"
                value={newItem.minQuantity}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel>Max Quantity</InputLabel>
              <TextField
                name="maxQuantity"
                value={newItem.maxQuantity}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel>Supplier</InputLabel>
              <TextField
                name="supplier"
                value={newItem.supplier}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </div>
        <div style={styles.formRow}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <InputLabel>Price Per Unit</InputLabel>
              <TextField
                name="pricePerUnit"
                value={newItem.pricePerUnit}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4} style={styles.dateInput}>
              <InputLabel>Delivery Date</InputLabel>
              <TextField
                name="deliveryDate"
                type="date"
                value={newItem.deliveryDate}
                onChange={handleInputChange}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={4} style={styles.dateInput}>
              <InputLabel>Expiration Date</InputLabel>
              <TextField
                name="expirationDate"
                type="date"
                value={newItem.expirationDate}
                onChange={handleInputChange}
                sx={{ width: '100%' }}
              />
            </Grid>
          </Grid>
        </div>
        <AddButton variant="contained" color="primary" onClick={handleAddItem}>
          Add
        </AddButton>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={styles.tableCell}>Ingredient Name</TableCell>
              <TableCell style={styles.tableCell}>Quantity</TableCell>
              <TableCell style={styles.tableCell}>Unit</TableCell>
              <TableCell style={styles.tableCell}>Min Quantity</TableCell>
              <TableCell style={styles.tableCell}>Max Quantity</TableCell>
              <TableCell style={styles.tableCell}>Supplier</TableCell>
              <TableCell style={styles.tableCell}>Price Per Unit</TableCell>
              <TableCell style={styles.tableCell}>Delivery Date</TableCell>
              <TableCell style={styles.tableCell}>Expiration Date</TableCell>
              <TableCell style={styles.tableCell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {storageData.map((item) => (
              <TableRow key={item.ingredientName}>
                <TableCell>{item.ingredientName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.minQuantity}</TableCell>
                <TableCell>{item.maxQuantity}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>{item.pricePerUnit}</TableCell>
                <TableCell>{new Date(item.deliveryDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(item.expirationDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DeleteButton
                    onClick={() => handleDeleteItem(item.ingredientName)}
                  >
                    delete
                  </DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

};

export default Storage;