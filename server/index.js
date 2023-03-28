import express from 'express';
import dotenv from "dotenv";

// Database connection
import ConnectDB from "./database/connection";

dotenv.config();

const zomato = express();

zomato.use(express.json());

zomato.get('/',(req,res)=> {
    res.json({
        message:"server is running"
    });
});

const PORT = 4000;

zomato.listen(PORT,() =>{
    ConnectDB()
    .then(() => {
        console.log("server is Running !!!");
    })
    .catch((error)=> {
        console.log("Server is running, but database connection failed");
        console.log(error);
    });

    
});