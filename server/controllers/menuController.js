import Menu from '../models/Menu.js'
import MenuModel from '../models/Menu.js'
import UserModel from '../models/User.js'

export const createMenu = async (req, res) => {
    const { dishes } = req.body;

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
export const removeDishFromMenu = async (req, res) => {
    const menu_id = req.params.menu_id;
    const title = req.body.title;
  
    try {
      const result = await Menu.updateOne({ _id: menu_id }, { $pull: { dishes: { title: title } } });
      console.log(result);
  
      if (result.nModified > 0) {
        res.status(200).send({ message: 'Dish removed successfully.' });
      } else {
        res.status(404).send({ message: 'Dish not found in the menu.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error.' });
    }
  };

export const updateMenu = async (req, res) => {
    try {
        const dishTitle = req.body.title;
        const newDish = req.body.dish; // Contains the updated dish data

        // Find the menu document
        const menu = await Menu.findOne();

        // Find the dish in the menu
        const dish = menu.dishes.find((item) => item.title === dishTitle);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found in menu' });
        }

        // Update the dish properties
        dish.title = newDish.title;
        dish.compositions = newDish.compositions;
        dish.weight = newDish.weight;
        dish.cost = newDish.cost;
        dish.type = newDish.type;
        dish.quantity = newDish.quantity;

        await menu.save();

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Cannot update dish in menu' });
    }
};

export const OutputDish = async (req, res) => {
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



