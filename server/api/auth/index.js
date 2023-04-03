import express from "express"

import { UserModel } from "../../database/allModels"

const Router = express.Router();

/**
 * Route   /signup
 * des      create  new account
 * params   none
 * Acess    public
 * Method   POST
 */

Router.post("/signup", async (req, res) => {
        try {
            await UserModel.findByEmailAndPhone(req.body.credentials);
            const newUser = await UserModel.create(req.body.credentials);
            const token = newUser.generateJwtToken();
            return res.status(200).json({ token, status: "Success" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    /**
 * Route   /signin
 * des      login to existing account
 * params   none
 * Acess    public
 * Method   POST
 */
Router.post("/signin", async (req,res)=> {
    try{
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);
        const token = user.generateJwtToken();
        return res.status(200).json.apply({ token, status: "Suceess"});
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;

