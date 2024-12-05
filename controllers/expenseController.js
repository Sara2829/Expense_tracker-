const Expense = require("../models/Expense");
const mongoose = require("mongoose");

// Get all expenses for a user
const getExpenses = async (req, res) => {
  try {
    // If req.user exists, use it; otherwise, use req.body.user for testing purposes
    const userId = req.user?._id || req.body.user;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const expenses = await Expense.find({ user: userId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new expense
const createExpense = async (req, res) => {
  const { user, title, amount, date } = req.body;

  try {
    // If req.user exists, use its ID; otherwise, use req.body.user for testing
    const userId = req.user?._id || user;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const expense = await Expense.create({
      user: userId,
      title,
      amount,
      date,
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an expense
const updateExpense = async (req, res) => {
  const { user, title, amount, date } = req.body;

  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Use req.user._id or req.body.user for authorization check
    const userId = req.user?._id || user;

    if (expense.user.toString() !== userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Update fields
    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.date = date || expense.date;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an expense
const deleteExpense = async (req, res) => {
  const { user } = req.body;

  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Use req.user._id or req.body.user for authorization check
    const userId = req.user?._id || user;

    if (expense.user.toString() !== userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await expense.remove();
    res.json({ message: "Expense removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getExpenses, createExpense, updateExpense, deleteExpense };
