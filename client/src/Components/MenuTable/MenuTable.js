import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import Cart from '../Cart/Cart';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
  IconButton,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';


const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '68vw',
  overflowX: 'auto',
  borderRadius: theme.shape.borderRadius,
  fontFamily: 'Montserrat',
}));
<TableContainer component={StyledPaper} style={{ maxWidth: '100%' }}></TableContainer>
const themeColors = {
  grey: '#F4F4F4',
  dark: '#000000',
  primary: '#3A3A3A', // dark light
  secondary: '#9ECF92', // green
  text: '#000000', // white
  hover: '#CCCCCC', // Цвет для hover-эффекта
  red: '#F05457',
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: 'Montserrat', // Добавьте это свойство для изменения шрифта
  fontWeight: 'bold',
  color: themeColors.text,
}));

const ButtonGroup = styled('div')(({ theme }) => ({
  fontFamily: 'Montserrat', // Добавьте это свойство для изменения шрифта
  display: 'flex',
  justifyContent: 'space-between', // Расположение кнопок по краям контейнера
  marginTop: theme.spacing(2), // Отступ сверху
  marginBottom: theme.spacing(2), // Отступ снизу
  '& > *': {
    marginRight: theme.spacing(1),
    color: themeColors.text,
  },
}));

const StyledTable = styled(Table)(({ theme }) => ({
  fontFamily: 'Montserrat', // Добавьте это свойство для изменения шрифта
}));

const StickyTableHeader = styled(TableHead)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 1,
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  '&:hover': {
    backgroundColor: themeColors.red, // Измените цвет hover-эффекта здесь
  },
}));

const EditButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Montserrat', // Добавьте это свойство для изменения шрифта
  color: themeColors.text,
  backgroundColor: themeColors.grey,
  '&:hover': {
    backgroundColor: themeColors.secondary, // Измените цвет hover-эффекта здесь
  },
}));


const AddCompositionButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Montserrat', // Добавьте это свойство для изменения шрифта
  boxShadow:
    '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
  backgroundColor: themeColors.grey,
  color: themeColors.dark,
  marginRight: theme.spacing(1),
  '&:hover': {
    backgroundColor: themeColors.secondary, // Измените цвет hover-эффекта здесь
  },
}));

const SaveButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Montserrat', // Добавьте это свойство для изменения шрифта
  backgroundColor: themeColors.grey,
  color: themeColors.dark,
  marginRight: theme.spacing(1),
  '&:hover': {
    backgroundColor: themeColors.secondary, // Измените цвет hover-эффекта здесь
  },
}));

const CancelButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Montserrat', // Добавьте это свойство для изменения шрифта
  color: themeColors.text,
  backgroundColor: themeColors.grey,
  '&:hover': {
    backgroundColor: themeColors.red, // Измените цвет hover-эффекта здесь
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Montserrat', // Добавьте это свойство для изменения шрифта
  color: themeColors.text,
  backgroundColor: themeColors.grey,
  '&:hover': {
    backgroundColor: themeColors.secondary, // Измените цвет hover-эффекта здесь
  },
}));






//COMPONENT

function MenuTable() {
  const [menu, setMenu] = useState([]);
  const { user } = useContext(UserContext)

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch(`http://localhost:5000/menu/${user.menu_id}`);
      const data = await response.json();
      setMenu(data.menu.dishes);
    } catch (error) {
      console.error(error);
    }
  };

  const removeDishFromMenu = (el) => {
    fetch(`http://localhost:5000/menu/remove/${user.menu_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(el),
    })
      .then((response) => {
        if (response.ok) {

          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        fetchMenu();
      })
      .catch((error) => {
        console.error('Error:', error);
        // Обработайте ошибку и выполните соответствующие действия
      });
  };

  const [data, setData] = useState([]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [selectedComposition, setSelectedComposition] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('');

  const handleEditClick = (rowIndex) => {
    if (editingRow === rowIndex) {
      setEditingRow(null);
    } else {
      setEditingRow(rowIndex);
      setSelectedComposition('');
      setSelectedWeight('');
    }
  };

  const saveEditedDish = (dishData) => {
    axios
      .post(`http://localhost:5000/menu/AddDish/${user.menu_id}`, dishData)
      .then((response) => {
        console.log(response.data);
        fetchMenu(); // Получить обновленное меню после сохранения
      })
      .catch((error) => {
        console.error('Error:', error);
        // Обработайте ошибку и выполните соответствующие действия
      });
  };

  const handleSaveEditClick = (el) => {
    const updatedData = [...data];
    const selectedCompositionItem = compositionOptions.find(
      (option) => option === selectedComposition
    );
    const compositionString = `${selectedCompositionItem} (${selectedWeight})`;
    if (selectedCompositionItem && selectedWeight) {
      if (updatedData[editingRow]?.dishes[0]?.compositions) {
        updatedData[editingRow].dishes[0].compositions += `, ${compositionString}`;
      } else {
        updatedData[editingRow].dishes[0].compositions = compositionString;
      }
    }
    setData(updatedData);
    setEditingRow(null);
    setSelectedComposition('');
    setSelectedWeight('');
  
    // Отправить обновленные данные на сервер
    const dishData = updatedData.find((item, index) => index === editingRow)?.dishes[0];
    axios
      .post(`http://localhost:5000/menu/update/${user.menu_id}`, dishData)
      .then((response) => {
        console.log(response.data);
        fetchMenu(); // Получить обновленное меню после сохранения
      })
      .catch((error) => {
        console.error('Error:', error);
        // Обработайте ошибку и выполните соответствующие действия
      });
  };


  const handleSaveAddClick = () => {
    const updatedData = [...data];
    const selectedCompositionItem = compositionOptions.find(
      (option) => option === selectedComposition
    );
    const compositionString = `${selectedCompositionItem} (${selectedWeight})`;
    if (selectedCompositionItem && selectedWeight) {
      if (updatedData[editingRow]?.dishes[0]?.compositions) {
        updatedData[editingRow].dishes[0].compositions += `, ${compositionString}`;
      } else {
        updatedData[editingRow].dishes[0].compositions = compositionString;
      }
    }
    setData(updatedData);
    setEditingRow(null);
    setSelectedComposition('');
    setSelectedWeight('');

    // Отправить обновленные данные на сервер
    const dishData = updatedData[editingRow].dishes[0];
    console.log()
    axios
      .post(`http://localhost:5000/menu/AddDish/${user.menu_id}`, dishData)
      .then((response) => {
        console.log(response.data);
        fetchMenu(); // Получить обновленное меню после сохранения
      })
      .catch((error) => {
        console.error('Error:', error);
        // Обработайте ошибку и выполните соответствующие действия
      });
  };

  const handleCancelClick = () => {
    setEditingRow(null);
    setSelectedComposition('');
    setSelectedWeight('');
  };

  const handleCellEdit = (event, rowIndex, columnId) => {
    const updatedData = [...data];
    updatedData[rowIndex].dishes[0][columnId] = event.target.value;
    setData(updatedData);
  };
  

  const handleAddRow = () => {
    const newRow = {
      dishes: [
        {
          title: '',
          compositions: '',
          weight: '',
          cost: '',
          type: '',
        },
      ],
    };
    setSelectedComposition('');
    setSelectedWeight('');
    setData([...data, newRow]);
    setEditingRow(data.length);
  };

  const compositionOptions = [
    'Composition 1',
    'Composition 2',
    'Composition 3',
    'Composition 4',
    'Composition 5',
  ];




  const handleCompositionSelect = () => {
    const updatedData = [...data];
    const selectedCompositionItem = compositionOptions.find(
      (option) => option === selectedComposition
    );
    const compositionString = `${selectedCompositionItem} (${selectedWeight})`;

    if (updatedData[editingRow]?.dishes[0]?.compositions) {
      updatedData[editingRow].dishes[0].compositions += `, ${compositionString}`;
    } else {
      updatedData[editingRow].dishes[0].compositions = compositionString;
    }

    setData(updatedData);
    setSelectedComposition('');
    setSelectedWeight('');
  };



  return (
    <Grid container>
      <Grid item>
        <StyledPaper>
          {editingRow !== null ? (
            <TableContainer>
              <StyledTable>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <TextField
                        value={data[editingRow]?.dishes[0]?.title || ''}
                        onChange={(event) => handleCellEdit(event, editingRow, 'title')}
                        fullWidth
                        label="Title"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={selectedComposition}
                        onChange={(event) => setSelectedComposition(event.target.value)}
                        fullWidth
                        label="Composition"
                      >
                        {compositionOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                      {selectedComposition && (
                        <TextField
                          value={selectedWeight}
                          onChange={(event) => setSelectedWeight(event.target.value)}
                          fullWidth
                          label="Weight"
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={data[editingRow]?.dishes[0]?.cost || ''}
                        onChange={(event) => handleCellEdit(event, editingRow, 'cost')}
                        fullWidth
                        label="Cost"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={data[editingRow]?.dishes[0]?.weight || ''}
                        onChange={(event) => handleCellEdit(event, editingRow, 'weight')}
                        fullWidth
                        label="Weight"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={data[editingRow]?.dishes[0]?.type || ''}
                        onChange={(event) => handleCellEdit(event, editingRow, 'type')}
                        fullWidth
                        label="Type"
                      />
                    </TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <AddCompositionButton
                          onClick={handleCompositionSelect}
                          disabled={!selectedComposition || !selectedWeight}
                        >
                          Add Composition
                        </AddCompositionButton>
                        <SaveButton variant="contained" onClick={handleSaveAddClick}>
                          Save
                        </SaveButton>
                        <CancelButton variant="contained" onClick={handleCancelClick}>
                          Cancel
                        </CancelButton>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </StyledTable>
            </TableContainer>
          ) : (
            <>
              <TableContainer>
                <StyledTable>
                  <StickyTableHeader>
                    <TableRow>
                      <StyledTableCell>Title</StyledTableCell>
                      <StyledTableCell>Composition</StyledTableCell>
                      <StyledTableCell>Cost</StyledTableCell>
                      <StyledTableCell>Weight</StyledTableCell>
                      <StyledTableCell>Type</StyledTableCell>
                      <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                  </StickyTableHeader>
                  <TableBody>
                    {menu.map((el) => (
                      <TableRow key={el.id}>
                        <StyledTableCell>{el.title}</StyledTableCell>
                        <StyledTableCell>{el.compositions}</StyledTableCell>
                        <StyledTableCell>{el.weight}</StyledTableCell>
                        <StyledTableCell>{el.cost}</StyledTableCell>
                        <StyledTableCell>{el.type}</StyledTableCell>
                        <StyledTableCell>
                          <ButtonGroup>
                            <EditButton onClick={() => handleEditClick(el)}>Edit</EditButton>
                            <DeleteButton onClick={() => removeDishFromMenu(el)}>
                              <DeleteIcon />
                            </DeleteButton>
                          </ButtonGroup>
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </StyledTable>
              </TableContainer>
              <AddButton fullWidth variant="contained" onClick={handleAddRow}>
                Add Row
              </AddButton>
            </>
          )}
        </StyledPaper>
      </Grid>
    </Grid>
  );
  
  
}
export default MenuTable;
