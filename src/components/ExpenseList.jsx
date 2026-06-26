import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function ExpenseList({ expenses, deleteExpense, editExpense, darkMode }) {
  return (
    <div className="space-y-3">

      {expenses.length === 0 ? (
        <p className="text-center opacity-60">No expenses yet</p>
      ) : (
        expenses.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 border rounded"
          >

            <div>
              <h2 className="font-bold">
                {index + 1}. {item.title}
              </h2>
              <p className="text-sm opacity-70">{item.date}</p>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <p>{item.category}</p>
              <p>{item.quantity} × {item.price}</p>

              <div className="flex gap-2">
                <button onClick={() => editExpense(item.id)}>
                  <FaEdit />
                </button>

                <button onClick={() => deleteExpense(item.id)}>
                  <MdDelete />
                </button>
              </div>
            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default ExpenseList;