import Dish from '../models/Dish.js'
import DishModel from '../models/Dish.js'




export const create = async (req, res) => {
    try {
        const doc = new DishModel({
            title: req.body.title,
            compositions: req.body.compositions,
            weight: req.body.weight,
            cost: req.body.cost,
        });

        const dish = await doc.save();

        res.json(dish)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "cannt create dish"
        })
    }
}



export const getAll = async (req, res) => {
    try {
        const dishes = await DishModel.find();


        res.json(dishes)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'cannt get dishes'
        })
    }
}



export const remove = async (req, res) => {
    try {
      const dishID = req.params.id;
  
      DishModel.findOneAndDelete(
        {
          _id: dishID,
        },
        (err, doc) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: 'cannt delete dish',
            });
          }
  
          if (!doc) {
            return res.status(404).json({
              message: 'dish not found',
            });
          }
  
          res.json({
            success: true,
          });
        },
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'cannt get dishes',
      });
    }
  };