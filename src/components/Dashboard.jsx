import { useState } from "react";

export default function Dashboard({ expenses,darkMode }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const years = [
    ...new Set(expenses.map((e) => new Date(e.date).getFullYear())),
  ].sort((a, b) => b - a);

  const filtered = expenses.filter((item) => {
    const d = new Date(item.date);
    return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
  });

  const income = filtered
    .filter((i) => i.type === "income")
    .reduce((a, b) => a + b.quantity * b.price, 0);

  const expense = filtered
    .filter((i) => i.type === "expense")
    .reduce((a, b) => a + b.quantity * b.price, 0);

  return (
    <div className="p-3 space-y-4">

      
      <div className="flex flex-col sm:flex-row gap-2">
        <select
          className={`border p-2 rounded w-full sm:w-auto ${
            darkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black"
          }`}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
        </select>

        <select
           className={`border p-2 rounded w-full sm:w-auto ${
            darkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black"
          }`}
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 border rounded">Income: {income}</div>
        <div className="p-3 border rounded">Expense: {expense}</div>
        <div className="p-3 border rounded">Balance: {income - expense}</div>
      </div>

    </div>
  );
}