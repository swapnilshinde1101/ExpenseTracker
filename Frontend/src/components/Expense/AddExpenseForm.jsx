import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: ""
  });

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  const handleAddExpense = () => {
    if (!expense.category || !expense.amount || !expense.date) {
      alert("Please fill in all required fields.");
      return;
    }

    onAddExpense(expense);

    // Optionally reset the form
    setExpense({ category: "", amount: "", date: "", icon: "" });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

<Input
  value={expense.category}
  onChange={(value) => handleChange("category", value)} // ✅ FIXED
  label="Category"
  placeholder="Rent, Groceries, etc"
  type="text"
/>

<Input
  value={expense.amount}
  onChange={(value) => handleChange("amount", value)} // ✅ FIXED
  label="Amount"
  type="number"
/>

<Input
  value={expense.date}
  onChange={(value) => handleChange("date", value)} // ✅ FIXED
  label="Date"
  type="date"
/>


      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={handleAddExpense}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
