import { useEffect, useState } from "react";

export function useExpenses() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  function addExpense(expense) {
    setExpenses([...expenses, expense]);
  }

  function updateExpense(updated) {
    setExpenses(
      expenses.map((item) =>
        item.id === updated.id ? updated : item
      )
    );
  }

  function deleteExpense(id) {
    setExpenses(
      expenses.filter((item) => item.id !== id)
    );
  }

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };
}