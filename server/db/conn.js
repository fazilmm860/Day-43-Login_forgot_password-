const mongoose = require('mongoose')

const DB = process.env.DATABASE

const connection = () => {
    mongoose.set('strictQuery', true);

    mongoose.connect(DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() =>
        console.log("DataBase Connected")
    ).catch((error) => {
        console.log(error);
    })
}
module.exports = connection;