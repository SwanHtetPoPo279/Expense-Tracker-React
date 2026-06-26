export function filterExpenses(expenses, selectedCategory, search) {
  return expenses.filter((expense) => {
    const categoryMatch =
      selectedCategory === "All" ||
      expense.category === selectedCategory;

    const searchMatch = expense.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });
}