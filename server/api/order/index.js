import express from "express";
import passport from "passport";

import { OrderModel } from "../../database/allModels";

const Router = express.Router();
/**
 * Route   /
 * des      Get all orders by user id.
 * params   _id
 * Acess    private
 * Method   GET
 */
Router.get(
    "/", 
    passport.authenticate("jwt", { session: false}),
    async (req, res) =>{
        try {
            const { user } = req;

            const getOrders = await OrderModel.findOne({ user: user._id });

            if(!getOrders){
                return res.status(400).json({ error: "User not found"});
            }
            return res.status(200).json({ orders: getOrders });
        }catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    )

export default Router;