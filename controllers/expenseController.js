const Expense = require("../models/Expense");


const getExpenses = async (req, res) => {
  const { userId } = req.params;
  try {
    const expenses = await Expense.find({ user: userId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createExpense = async (req, res) => {
  const { userId } = req.params; 
  const { title, amount, date } = req.body;

  try {
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


const updateExpense = async (req, res) => {
  const { userId, id } = req.params; 
  const { title, amount, date } = req.body;

  try {
    const expense = await Expense.findOne({ _id: id, user: userId }); 
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

   
    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.date = date || expense.date;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteExpense = async (req, res) => {
  const { userId, id } = req.params; 

  try {
    const expense = await Expense.findOne({ _id: id, user: userId }); 
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await expense.remove();
    res.json({ message: "Expense removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getExpenses, createExpense, updateExpense, deleteExpense };
