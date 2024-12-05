const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getAllUsers } = require("../controllers/userController.js");

router.post("/register", registerUser); // Register endpoint
router.post("/login", loginUser);       // Login endpoint
router.get("/all", getAllUsers);        // Endpoint to get all users

module.exports = router;
