const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");
const moment = require("moment");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const fs = require("fs");
const nodemailer = require("nodemailer");
const Jimp = require("jimp");


// current Date
let cDate = moment().format("Do MMM YYYY");
console.log('Current Date: ', cDate);

// meta Data 
// const metaDataObj = require("../meta/metaData");

// middleware for authenticating
let isLogin = require("../middleware/isLogin");
let isLogout = require("../middleware/isLogout");

// Setup Session
route.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24 * 1;
route.use(
    session({
        secret: process.env.SECRET_KEY,
        cookie: { maxAge: oneDay },
        saveUninitialized: true,
        resave: true,
    })
);


// schema for database  
const adminSchema = require("../model/adminSchema");


// setup nodemailer
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
    },
});



// setup multer for packages
const packageStorageMulter = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, "public/packages");
    },
    filename: function (request, file, callback) {
        callback(
            null,
            "packagesImg-" + Date.now() + path.extname(file.originalname)
        );
    },
});

// setup multer limitation for packages
const uploadPackageMulter = multer({
    storage: packageStorageMulter,
    limits: {
        fieldSize: 1024 * 1024 * 10,
    },
});



route.get("/", async (req, res) => {
    try {
        res.status(200).render('home');
    } catch (error) {
        console.error(error);
        res.status(500).render('error/page500');
    }
});
route.get('/about' , (req,res) => {
    try {
        res.status(200).render('about');
    } catch (error) {
        console.log(error);
    }
    
} )





module.exports = route;

