export default function Filters({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  darkMode,
}) {
  return (
    <div className="w-full mt-5">

      <div className="flex flex-col md:flex-row md:items-center gap-3">

        
        <input
          className={`border p-2 rounded w-full md:flex-1 ${
            darkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black"
          }`}
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        
        <select
          className={`border p-2 rounded w-full md:w-auto ${
            darkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black"
          }`}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Salary">Salary</option>
          <option value="Other">Other</option>
        </select>

        
        <select
          className={`border p-2 rounded w-full md:w-auto ${
            darkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black"
          }`}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
          <option value="high">High Price</option>
          <option value="low">Low Price</option>
        </select>

      </div>
    </div>
  );
}