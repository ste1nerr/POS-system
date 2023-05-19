import Menu from '../models/Menu.js'
import MenuModel from '../models/Menu.js'
import UserModel from '../models/User.js'
export const createMenu = async (req, res) => {
    const {dishes } = req.body;

    const newMenu = new Menu({
        dishes
    });

    await newMenu.save()
        .then(result => {
            res.status(201).json({
                message: 'Menu created successfully',
                result
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({
                error: 'Failed to create menu'
            });
        });
};

export const getAll = async (req, res) => {
    Menu.find()
        .then(menu => {
            res.status(200).json({
                menu
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error.message
            });
        });
};

export const AddDish = async (req, res) => {
    const menuID = req.params.menuid;
    // Define the new dish object with quantity set to 1
    const newDish = {
      title: req.body.title,
      compositions: req.body.compositions,
      weight: req.body.weight,
      cost: req.body.cost,
      type: req.body.type,
      quantity: 1
    };
  
    try {
      // Find the menu by ID
      const menu = await Menu.findOne({ _id: menuID });
  
      // Check if the menu exists
      if (!menu) {
        return res.status(404).json({ message: 'Menu not found' });
      }
  
      // Update the dishes array with the new dish object
      menu.dishes.push(newDish);
      await menu.save();
  
      res.json({
        success: true,
      });
      console.log("New dish added successfully");
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Cannot update dish',
      });
    }
  };
// Find the document and update the dishes array with the new dish object
export const RemoveDish = async (req, res) => {
    Menu.updateOne({ _id: menuId }, { $pull: { dishes: { title: dishTitle } } })
        .then(result => {
            // console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
}


export const OutputDish  = async(req, res) => {
    const { menu_id } = req.params;
    Menu.findOne({ _id: menu_id })
        .then(menu => {
            // console.log(menu_id)
            if (!menu) {
                return res.status(404).json({ error: "Menu not found" });
            }
            // console.log(menu)
            res.status(200).json({ menu });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
}