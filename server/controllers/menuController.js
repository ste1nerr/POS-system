import Menu from '../models/Menu.js'
import MenuModel from '../models/Menu.js'


export const createMenu = async (req, res) => {
    const { user, dishes } = req.body;

    const newMenu = new Menu({
        user,
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
        .populate('user')
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
    // Define the new dish object
    const newDish = {
        title: req.body.title,
        compositions: req.body.compositions,
        weight: req.body.weight,
        cost: req.body.cost,
        type: req.body.type
    };

    try {
        // Find the document and update the dishes array with the new dish object
        await Menu.updateOne({ _id: menuID }, { $push: { dishes: newDish } });
        res.json({
            success: true,
        });
        console.log("New dish added successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'cannt update dish',
        });
    }
}

// Find the document and update the dishes array with the new dish object
export const RemoveDish = async (req, res) => {
    Menu.updateOne({ _id: menuId }, { $pull: { dishes: { title: dishTitle } } })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
}

