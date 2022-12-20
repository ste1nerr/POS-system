
import Dish from '../models/Dish.js'
import DishModel from '../models/Dish.js'
export const create = async (req, res) => {
    try{
        const doc = new DishModel({
            title: req.body.title,
            compositions: req.body.compositions,
            weight: req.body.weight,
            cost: req.body.cost,
        });

        const dish = await doc.save();

        res.json(dish)
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "cannt create dish"
        })
    }
}