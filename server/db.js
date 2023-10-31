const mongoose = require("mongoose");

const connectToMongo = async () => {
    const mongoURI = `mongodb+srv://${process.env.DB}:${process.env.DB_PASSWORD}@cluster0.utksmht.mongodb.net/Notepad?retryWrites=true&w=majority`;
    await mongoose.connect(mongoURI).then(() => {
        console.log("Db connected");
    }).catch((error) => {
        console.log("Something went wrong" + error);
    })
};

module.exports = connectToMongo;