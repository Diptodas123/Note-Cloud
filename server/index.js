const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const connectToMongo = require("./db");
const bodyParser = require("body-parser");
const PORT = 8000;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

connectToMongo();

//Avialable routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
    res.send("Hello World");
})
app.listen(PORT, () => {
    console.log(`Application running at http://localhost:${PORT}`);
})