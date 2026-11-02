import React, { useState } from "react";
import logo from "../assets/list-checks.svg";
import deleteIcon from "../assets/trash.svg";

// The main component of the application
const TodoList = () => {
  const [tasks, setTasks] = useState([]); // array of objects for all tasks
  const [heading, setHeading] = useState(""); // the headings and key in each task object
  const [basket, setBasket] = useState({}); // for appending list to correct task object

  // Handle new todo task
  const handleNewTask = () => {
    if (heading.trim() !== "") {
      setTasks([...tasks, { heading: heading, listItems: [] }]); // update tasks array
      setHeading(""); // clear heading for next task
    }
  };

  // Handle new list item in a specific task
  const handleNewListItem = (index) => {
    if (basket[index] && basket[index].trim() !== "") {
      // Safely clone tasks and update the specific sub-array immutably
      const newTasks = tasks.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            listItems: [...task.listItems, basket[index]],
          };
        }
        return task;
      });

      setTasks(newTasks); // update tasks
      setBasket({ ...basket, [index]: "" }); // clean basket for this index
    }
  };

  // Users put items into basket and basket put items to correct task objects
  const handleBasketChange = (index, value) => {
    setBasket({ ...basket, [index]: value }); // put an item into the basket
  };

  // Handle delete a whole task
  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks); // update the tasks array
  };

  // Handle deleting just an item from a task
  const handleDeleteListItem = (index, listIndex) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          listItems: task.listItems.filter((_, li) => li !== listIndex),
        };
      }
      return task;
    });
    setTasks(newTasks); // update the tasks array
  };

  // Display
  return (
    <div className="container">
      <header className="d-flex align-items-center fw-bolder my-3">
        <img src={logo} alt="app-logo" className="text-primary" style={{ width: "40px", height: "30px" }} />
        <h1 className="m-0 ms-2">My Tasks</h1>
      </header>

      <section className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task..."
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
        <button type="button" className="btn btn-primary" onClick={handleNewTask}>
          +
        </button>
      </section>

      <main>
        {/* For each task, a collapsible div container */}
        {tasks.map((task, index) => (
          <div key={index} className="card mb-3 p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <input type="checkbox" className="form-check-input me-2" />
                <h3 className="m-0">{task.heading}</h3>
              </div>
              <div>
                <button className="btn btn-danger btn-sm me-2" onClick={() => handleDeleteTask(index)}>
                  <img src={deleteIcon} alt="delete-task" style={{ width: "16px" }} />
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#navbarNav-${index}`}
                  aria-expanded="false"
                  aria-controls={`navbarNav-${index}`}
                >
                  Toggle Items
                </button>
              </div>
            </div>

            {/* Dynamic target ID ensures only this specific task collapses */}
            <div className="collapse mt-3" id={`navbarNav-${index}`}>
              <ul className="list-group mb-2">
                {task.listItems.map((item, listIndex) => (
                  <li key={listIndex} className="list-group-item d-flex justify-content-between align-items-center">
                    {item}
                    <button className="btn btn-sm text-danger" onClick={() => handleDeleteListItem(index, listIndex)}>
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="input-group mt-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add new item..."
                  value={basket[index] || ""}
                  onChange={(e) => handleBasketChange(index, e.target.value)}
                />
                <button className="btn btn-success" onClick={() => handleNewListItem(index)}>
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
      <footer></footer>
    </div>
  );
};

export default TodoList;