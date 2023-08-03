const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')
dotenv.config()
const connection = require("./db/conn")
const router = require('./routes/router')



const port = process.env.PORT

const app = express()
connection();

app.get("/", (req, res) => {
    res.status(201).json("server created")
})

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use(router);

app.listen(port, () => {
    console.log(`Server Started on the Port ${port}`);
})