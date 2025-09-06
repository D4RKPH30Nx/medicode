import dotenv from "dotenv";
dotenv.config();

import express from "express";
import {ApiResponse} from "./utils/ApiResponse.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// TODO: Raj's Task
app.post("/auth", (req, res) => {

    let {name, abhaId} = req.body;

    res
    .status(200)
    .json(new ApiResponse(200, {name: name, abhaId: abhaId}));
});

// TODO: Jay's task 
app.post("/search", (req, res) => {
    let {query} = req.body;
});

app.listen(PORT, () => {
    console.log(`Server Live on http://localhost:${PORT}`);
});