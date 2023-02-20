import Dish from '../models/Dish.js'
import DishModel from '../models/Dish.js'



export const create = async (req, res) => {
  try {
    const doc = new Dish({
      title: req.body.title,
      compositions: req.body.compositions,
      weight: req.body.weight,
      cost: req.body.cost,
      menu: req.body.menu
    });

    const dish = await doc.save();
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: "cannt create dish"
    })
  }
}


export const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find().populate('menu');
    res.status(200).json({ dishes });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: 'cannt get dishes'
    })
  }
};


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

export const update = async (req, res) => {
  try {
    const dishID = req.params.id;

    await DishModel.updateOne(
      {
        _id: dishID,
      },
      {
        title: req.body.title,
        compositions: req.body.compositions,
        weight: req.body.weight,
        cost: req.body.cost,
        menu: req.body.menu
      },
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'cannt update dish',
    });
  }
};