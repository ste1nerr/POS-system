import Cart from '../models/Cart.js'
import Menu from '../models/Menu.js'
import Storage from '../models/Storage.js';

export const getIngredientByUserId = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const elements = await Storage.find({ user_id: user_id });
    res.json(elements);
  } catch (error) {
    console.error('Ошибка при получении элементов по user_id:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

export const createIngredient = async (req, res) => {
  try {
    const {
      ingredientName,
      quantity,
      unit,
      minQuantity,
      maxQuantity,
      supplier,
      pricePerUnit,
      deliveryDate,
      expirationDate,
    } = req.body;
    const user_id = req.params.user_id;

    const newIngredient = new Storage({
      ingredientName,
      quantity,
      unit,
      minQuantity,
      maxQuantity,
      supplier,
      pricePerUnit,
      deliveryDate,
      expirationDate,
      user_id
    });

    const savedIngredient = await newIngredient.save();

    res.status(201).json(savedIngredient);
    console.log("New ingredient created successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Cannot create ingredient',
    });
  }
};

export const deleteIngredient = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { ingredientName } = req.body;

    const deletedIngredient = await Storage.findOneAndDelete({
      user_id,
      ingredientName,
    });

    if (!deletedIngredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    res.status(200).json({ message: 'Ingredient deleted successfully' });
    console.log('Ingredient deleted successfully');
  } catch (error) {
    console.error('Error deleting ingredient:', error);
    res.status(500).json({ message: 'Error deleting ingredient' });
  }
};