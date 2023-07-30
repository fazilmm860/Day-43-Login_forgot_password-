const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')
dotenv.config()
const connection = require("./db/conn")



const port = process.env.PORT

const app = express()
connection();

// app.get("/", (req, res) => {
//     res.status(201).json("server created")
// })

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(port, () => {
    console.log(`Server Started on the Port ${port}`);
})