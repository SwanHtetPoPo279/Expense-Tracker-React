import { useEffect, useState } from "react";

function ExpenseForm({
  addExpense,
  updateExpense,
  editingExpense,
  closeForm,
  darkMode,
}) {
  const [title, setTitle] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setQty(editingExpense.quantity);
      setPrice(editingExpense.price);
      setCategory(editingExpense.category);
      setType(editingExpense.type);
    }
  }, [editingExpense]);

  function handleSubmit() {
    const cleanTitle = title.trim();
    const quantityNum = Number(qty);
    const priceNum = Number(price);

    if (!cleanTitle) return setError("Title is required.");
    if (!isNaN(cleanTitle)) return setError("Title must be text.");
    if (!qty) return setError("Quantity is required.");
    if (isNaN(quantityNum) || quantityNum <= 0)
      return setError("Quantity must be valid number.");
    if (!price) return setError("Price is required.");
    if (isNaN(priceNum) || priceNum <= 0)
      return setError("Price must be valid number.");
    if (!category) return setError("Category is required.");

    setError("");

    const expense = {
      id: editingExpense ? editingExpense.id : Date.now(),
      title: cleanTitle,
      quantity: quantityNum,
      price: priceNum,
      type,
      category,
      date: editingExpense
        ? editingExpense.date
        : new Date().toISOString(),
    };

    if (editingExpense) {
      updateExpense(expense);
    } else {
      addExpense(expense);
    }

    closeForm();
  }

  // className={`border p-2 rounded w-full sm:w-auto ${
  //           darkMode
  //             ? "bg-gray-800 text-white border-gray-600"
  //             : "bg-white text-black"
  //         }`}

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className={`p-6 rounded-lg w-96 space-y-3 ${
            darkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black"
          }`}>

        <h2 className="text-xl font-bold">
          {editingExpense ? "Edit" : "New"}
        </h2>

        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Quantity"
          type="number"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Select Category</option>

          {type === "expense" ? (
            <>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Other">Other</option>
            </>
          ) : (
            <>
              <option value="Salary">Salary</option>
              <option value="Business">Business</option>
              <option value="Freelance">Freelance</option>
              <option value="Other">Other</option>
            </>
          )}
        </select>

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white w-full p-2"
        >
          {editingExpense ? "Update" : "Save"}
        </button>

        <button onClick={closeForm} className="text-red-500 w-full">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ExpenseForm;