const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");


const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");


const app = express();
dotenv.config();


app.use(express.json());
app.use(cors());


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
connectDB();


app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);


app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});


app.use((err, req, res, next) => {
  res.status(res.statusCode || 500).json({
    message: err.message,
  });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
