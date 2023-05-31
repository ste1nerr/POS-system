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
  IconButton
} from '@mui/material';
import { styled } from '@mui/system'; // Add this import statement
import DeleteIcon from '@mui/icons-material/Delete';
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
      fontFamily: 'Montserrat, sans-serif', // Добавьте это свойство для изменения шрифта
      '&:hover': {
        backgroundColor: '#9ECF92', // Измените цвет hover-эффекта здесь
      },
    },
    textfield: {
      borderRadius: '20px', // Add border radius to match the text fields
    },
    tableCell: {
      fontFamily: 'Montserrat, sans-serif',
    },
  };

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
    marginLeft: '18px',
    borderRadius: 0,
    marginTop: '20px',
    width: '220px',
    backgroundColor: '#F4F4F4',
    fontFamily: 'Montserrat, sans-serif',
    '&:hover': {
      color: 'white',
      backgroundColor: '#9ECF92',
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
      await axios.post(`http://localhost:5000/storage/create/${user._id}`, newItem);
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
        <Grid container spacing={2} >
          <Grid item xs={6}>
            <TextField
              style={styles.textfield}
              name="ingredientName"
              label="Ingredient Name"
              value={newItem.ingredientName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="quantity"
              label="Quantity"
              value={newItem.quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="unit"
              label="Unit"
              value={newItem.unit}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="minQuantity"
              label="Min Quantity"
              value={newItem.minQuantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="maxQuantity"
              label="Max Quantity"
              value={newItem.maxQuantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="supplier"
              label="Supplier"
              value={newItem.supplier}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="pricePerUnit"
              label="Price Per Unit"
              value={newItem.pricePerUnit}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="deliveryDate"
              label="Delivery Date"
              value={newItem.deliveryDate}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="expirationDate"
              label="Expiration Date"
              value={newItem.expirationDate}
              onChange={handleInputChange}
            />
          </Grid>
          <AddButton variant="contained" onClick={handleAddItem}>Add</AddButton>
        </Grid>
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
              <TableRow key={item._id}>
                <TableCell>{item.ingredientName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.minQuantity}</TableCell>
                <TableCell>{item.maxQuantity}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>{item.pricePerUnit}</TableCell>
                <TableCell>{item.deliveryDate}</TableCell>
                <TableCell>{item.expirationDate}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteItem(item.ingredientName)}>
                    <DeleteIcon />
                  </IconButton>
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
