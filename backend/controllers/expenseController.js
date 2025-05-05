const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");
const Expense = require("../models/Expense");

// Add Expense
exports.addExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { icon, category, amount, date } = req.body;

    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    console.error("Add Expense Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Expenses
exports.getAllExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Get Expenses Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Delete Expense Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Download Excel
// exports.downloadExpenseExcel = async (req, res) => {
//     const userId = req.user.id;
//     try {
//     const expense =await Expense.find({ userId }). sort({ date: - 1 });
  
//     // Prepare data for Excel
//     const data = expense.map ((item) => ({
//    category: expense.category,
//     Amount: item. amount,
//     Date: item.date,
//     })) ;
//     const wb = xlsx.utils.book_new();
//     const ws = xlsx. utils. json_to_sheet(data);
//     xlsx. utils. book_append_sheet (wb, ws, "Income") ;
//     xlsx.writeFile(wb, 'income_details.xlsx');
//     res. download ('income_details. xlsx' );
//     } catch (error) {
//     res.status(500).json({ message: "Server Error" });
  
//   }
// };


// Download Excel
exports.downloadExpenseExcel = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Expenses");

    worksheet.columns = [
      { header: "Category", key: "category", width: 30 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Date", key: "date", width: 20 },
    ];

    expenses.forEach((expense) => {
      worksheet.addRow({
        category: expense.category,
        amount: expense.amount,
        date: expense.date.toISOString().split("T")[0],
      });
    });

    const filePath = path.join(__dirname, "../expense_details.xlsx");
    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, "expense_details.xlsx", (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).send("Could not download file.");
      } else {
        fs.unlink(filePath, () => {});
      }
    });
  } catch (error) {
    console.error("Excel generation failed:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
