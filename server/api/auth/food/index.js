import express from "express"

import { FoodModel } from "../../database/allModels"

const Router = express.Router();

/**
 * Route    /:_id
 * des      get food based on id
 * params   _id
 * Acess    public
 * Method   Get
 */

Router.get("/:_id", async (req, res)=>{
    try {
        const {_id} = req.params;
        const foods = FoodModel.findById(_id);
        return res.json({ foods });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route   /r/:_id
 * des      get all food based on particular restaurant
 * params   _id
 * Acess    public
 * Method   Get
 */
Router.get("/r/:_id", async (req, res)=>{
    try {
        const { _id } = req.params;
        const foods = await FoodModel.find({
            restaurant: _id,
        });
        return res.json ({ foods });
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
/**
 * Route   /c/:category
 * des      get all food based on particular restaurant
 * params   category
 * Acess    public
 * Method   Get
 */
Router.get("/c/:category", async (req, res)=>{
    try {
        const { category } = req.params;
        const foods = await FoodModel.find({
            category:{ $regex: category, $options: "i" },
        });

        if (!foods)
            return res
                .status(404)
                .json({ error: `No food matched with ${category}` });
        return res.json ({ foods });
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router
