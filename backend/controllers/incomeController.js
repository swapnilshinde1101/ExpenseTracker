// const xlsx = require('xlsx');
// const Income = require("../models/Income");
const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");
const Income = require("../models/Income");


// Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    try {
      const { icon, source, amount, date } = req.body;
  
      // Validation: Check for missing fields
      if (!source || !amount || !date) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newIncome = new Income({
        userId,
        icon,
        source,
        amount,
        date: new Date(date),
      });
  
      await newIncome.save();
      res.status(200).json(newIncome);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };

// Get All Income Source
exports. getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
    const income = await Income. find({ userId }).sort({ date: -1 });
    res. json(income) ;
    } catch (error) {
    res.status(500).json({ message: "Server Error" });
    }    
};

// Delete Income Source
exports.deleteIncome = async (req, res) => {
  try {
    await Income. findByIdAndDelete(req.params.id) ;
    res. json({ message: "Income deleted successfully" });
    } catch (error) {
    res.status(500).json({ message: "Server Error" }); 
    }
  };
  
// Download Excel
// exports.downloadIncomeExcel = async (req, res) => {
//     const userId = req.user.id;
//     try {
//     const income =await Income.find({ userId }). sort({ date: - 1 });
  
//     // Prepare data for Excel
//     const data = income.map ((item) => ({
//     Source: item. source,
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
  
exports.downloadIncomeExcel = async (req, res) => {
  try {
    const userId = req.user.id;
    const incomeData = await Income.find({ userId }).sort({ date: - 1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Income");

    worksheet.columns = [
      { header: "Source", key: "source", width: 30 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Date", key: "date", width: 20 },
    ];

    incomeData.forEach(income => {
      worksheet.addRow({
        source: income.source,
        amount: income.amount,
        date: income.date.toISOString().split("T")[0],
      });
    });

    const filePath = path.join(__dirname, "../income_details.xlsx");

    // Write and wait for file to be saved
    await workbook.xlsx.writeFile(filePath);

    // Send the file
    res.download(filePath, "income_details.xlsx", (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).send("Could not download file.");
      }

      // Optional: delete file after sending to clean up
      fs.unlink(filePath, () => {});
    });
  } catch (error) {
    console.error("Excel generation failed:", error);
    res.status(500).json({ message: "Server Error" });
  }
};