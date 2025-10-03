import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, deleteTodo } from "./features/todoSlice";
import { motion, AnimatePresence } from "framer-motion";



function App() {
  const [task, setTask] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (task.trim()) {
      dispatch(addTodo(task));
      setTask("");
    }
  };

  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-lg w-96 p-6">
        <h1 className="text-2xl font-semibold text-center mb-4 text-black"> Todo List</h1>

        {/* Input */}
        <div className="flex mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none"
          />
          <button
            onClick={handleAdd}
            className="bg-black text-white px-4 py-2 rounded-r-lg hover:bg-gray-800"
          >
            Add
          </button>
        </div>

        {/* Task List */}
      <AnimatePresence>
  <ul className="space-y-2">
    {todos.map((todo) => (
      <motion.li
        key={todo.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg"
      >
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
            className="cursor-pointer"
          />
          <span
            className={`${
              todo.completed ? "line-through text-gray-500" : "text-black"
            }`}
          >
            {todo.text}
          </span>
        </div>
        <button
          onClick={() => dispatch(deleteTodo(todo.id))}
          className="text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </motion.li>
    ))}
  </ul>
</AnimatePresence>

        {todos.length === 0 && (
          <p className="text-gray-500 text-center mt-4">No tasks yet. Add one!</p>
        )}
      </div>
    </div>
  );
}

export default App;
