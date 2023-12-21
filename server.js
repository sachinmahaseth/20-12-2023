const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4444;
const path = require("path");
const mainRoute = require("./source/routes/routes");
const dataBase = require("./source/database/connection");
dataBase();



// set express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set app engine and te,plating
app.set("view engine", "ejs");
app.set("views", "views");
app.set("trust proxy", true);

// set files path
const staticPath = path.join(__dirname, "./public");
app.use(express.static(staticPath));

app.use('/public', express.static('public'));


// render routes
app.use(mainRoute);

app.use((req, res, next) => {
    res.status(404).render("page404");
});

app.use((req, res, next) => {
    res.status(500).send("page500");
});

app.listen(port, () => {
    console.log(`Server is Running ${port}`);
});
