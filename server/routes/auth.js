const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "Diptoisagoodb$oy"

//ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post("/createuser", [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    //If there're errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let success = false;
        //check whether the user with this email exists already 
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success: success, error: "A user with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(req.body.password, salt);

        //if user doesn't already exist then create the document
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword
        })

        const data = {
            id: user.id
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


//ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post("/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can't be blank").exists(),
], async (req, res) => {

    //If there're errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let success = false;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: success, error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);   //retures boolean
        if (!passwordCompare) {
            return res.status(400).json({ success: success, error: "Please try to login with correct credentials" });
        }

        const payload = {
            id: user.id
        };

        const authToken = jwt.sign(payload, JWT_SECRET);
        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


//ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". login required
router.post("/getuser", fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;