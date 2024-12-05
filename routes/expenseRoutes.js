const express = require("express");
const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const router = express.Router();


router.get("/:userId", getExpenses); 
router.post("/:userId", createExpense); 
router.put("/:userId/:id", updateExpense); 
router.delete("/:userId/:id", deleteExpense); 

module.exports = router;
