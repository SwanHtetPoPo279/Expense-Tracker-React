import { useState, useEffect } from "react";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Dashboard from "./components/Dashboard";
import Filters from "./components/Filters";
import PieChartBox from "./components/PieChartBox";
import ThemeToggle from "./components/ThemeToggle";

import { useExpenses } from "./hooks/useExpenses";
import { filterExpenses } from "./utils/filters";

function App() {
  const {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
  } = useExpenses();

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const filtered = filterExpenses(
    expenses,
    selectedCategory,
    search
  );

  const sorted = [...filtered];

  switch (sortBy) {
    case "az":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "za":
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "high":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "low":
      sorted.sort((a, b) => a.price - b.price);
      break;
  }

  const categoryData = sorted.reduce((acc, item) => {
    const cat = item.category || "Other";
    acc[cat] = (acc[cat] || 0) + item.quantity * item.price;
    return acc;
  }, {});

  const pieData = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  const incomeCount = expenses.filter((i) => i.type === "income").length;
  const expenseCount = expenses.filter((i) => i.type === "expense").length;

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen p-3 md:p-6" : "bg-white text-black min-h-screen p-3 md:p-6"}>
      
      <div className="relative mb-4">
        <h1 className="text-center text-xl md:text-3xl font-bold">
          Expense Tracker
        </h1>

        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <ThemeToggle
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </div>
      </div>

      
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/2 bg-white/5 p-3 rounded">
          <PieChartBox data={pieData} />
        </div>

        <div className="w-full lg:w-1/2">
          <Dashboard expenses={expenses}
          darkMode={darkMode} />
        </div>
      </div>

      
      <div className="mt-5 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <Filters
          search={search}
          setSearch={setSearch}
          darkMode={darkMode}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 mt-5 rounded w-full md:w-auto"
          onClick={() => {
            setEditingExpense(null);
            setShowForm(true);
          }}
        >
          New
        </button>
      </div>

     
      {showForm && (
        <div className="px-2">
          <ExpenseForm
            addExpense={addExpense}
            updateExpense={updateExpense}
            editingExpense={editingExpense}
            closeForm={() => setShowForm(false)}
            darkMode={darkMode}
          />
        </div>
      )}

      
      <div className="mt-5">
        <ExpenseList
          expenses={sorted}
          deleteExpense={deleteExpense}
          darkMode={darkMode}
          editExpense={(id) => {
            setEditingExpense(expenses.find((e) => e.id === id));
            setShowForm(true);
          }}
        />
      </div>

    </div>
  );
}

export default App;