const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the User model
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    amount: {
      type: Number,
      required: [true, "Please add an amount"],
    },
    date: {
      type: Date,
      required: [true, "Please add a date"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
