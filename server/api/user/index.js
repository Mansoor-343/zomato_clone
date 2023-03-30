import express from "express";
import { UserModel } from "../../database/allModels"

const Router = express.Router();

/**
 * Route     /
 * Des       Get authorized user data
 * params    _id
 * Access    Public
 * Method    GET
 */
Router.get("/", async (req, res)=> {
    try{
        const { email, fullName, phoneNumber, address} =
         req.user;
        return res.json({ user: { email, fullName, phoneNumber, address}});
    } catch (error){
        return res.status(500).json({ error: error.message });
    }
});

export default Router;