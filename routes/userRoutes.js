const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

router.post("/register", registerUser); // Register endpoint
router.post("/login", loginUser);       // Login endpoint

module.exports = router;