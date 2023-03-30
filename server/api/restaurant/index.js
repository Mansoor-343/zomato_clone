import express from "express";

import { RestaurantModel } from "../../database/allModels";

const Router = express.Router();

/**
 * Route    /
 * Des      GEt all the restaurant details based on the city
 * params   none
 * aceess   Public
 * Method   POST
 */
Router.post("/", async (req, res) => {
    try {
        //http://localhost:4000/restaurant/?city=pdl
        const { city } = req.query;
        const restaurant = await RestaurantModel.find({ city });
        if (restaurants.length ===0){
            return res.json({ error: "No  restaurant found in this city."});
        }
        return res,json({ restaurant});
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route    /:_id
 * Des      GEt individual  restaurant details based on the id
 * params   _id
 * aceess   Public
 * Method   POST
 */
Router.post("/", async (req, res) => {
    try {
       const { _id } = req.params;
       const restaurant = await RestaurantModel.findById(_id);

       if (!restaurant) {
        return res.status(400).json({ error: "Restaurant Not found"});
       }

       return res.json ({ restaurant });
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route    /search/:searchString
 * Des      GEt   restaurant details based on Search String
 * params   SearchString
 * aceess   Public
 * Method   POST
 */
Router.post("/search/:searchString", async (req, res) => {
    /**
     * searching = raj
     * rsults = {
     * RajHotel
     * RajRao
     * RamRaj
     * }
     */
    try {
       const { SearchString } = req.params;
       const restaurants = await RestaurantModel.find({
        name: { $regex: SearchString, $options: "i"},
       });

       if (!restaurants.length ===0) {
        return res.status(400).json({ error: `No restaurant matched with ${searchString}`});
       }

       return res.json ({ restaurants });
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;