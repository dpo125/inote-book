const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'abdullahisagoodb$oy';

// ===============================
// ROUTER 1: CREATE USER (SIGNUP)
// ===============================
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {

    let success = false;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const email = req.body.email.trim().toLowerCase();
        const password = req.body.password.trim();

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ 
                success,
                error: "User with this email already exists" 
            });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        user = await User.create({
            name: req.body.name.trim(),
            email,
            password: secPass,
        });

        const payload = { user: { id: user.id } };
        const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success, error: "Internal server error occurred" });
    }
});

// ===============================
// ROUTER 2: LOGIN USER
// ===============================
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {

    let success = false;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const email = req.body.email.trim().toLowerCase();
        const password = req.body.password.trim();

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Invalid credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Invalid credentials" });
        }

        const payload = { user: { id: user.id } };
        const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success, error: "Internal server error occurred" });
    }
});

// ===============================
// ROUTER 3: GET USER DETAILS
// ===============================
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id; 
        const user = await User.findById(userId).select("-password");
        res.json(user); 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occurred");
    }
});

module.exports = router;