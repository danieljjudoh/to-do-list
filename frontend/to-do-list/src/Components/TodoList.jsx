// import core and necessary packages
import React, { useState } from "react";

// the main component of the application
const TodoList = () => {
  const [tasks, setTasks] = useState([]); // array of objects for all tasks
  const [heading, setHeading] = useState(""); // the headings and key in each task object
  const [basket, setBasket] = useState({}); // for appending list to correct task object

  // handle new todo task
  const handleNewTask = () => {
    if (heading.trim() !== "") {
      setTasks([...tasks, { heading: heading, listItems: [] }]); // update tasks array
      setHeading(""); // clear heading for next task
    }
  };

  // handle new list item in a specific task
  const handleNewListItem = (index) => {
    if (basket[index] && basket[index].trim() !== "") {
      const newTasks = [...todos]; // make a copy of todo array
      newTasks[index].listItems.push(basket[index]); // append the new item to task
      setTasks(newTasks); // update tasks
      setBasket({ ...basket, [index]: "" }); // clean basket
    }
  };

  // users put items into basket and basket put items to correct task objects
  const handleBasketChange = (index, value) => {
    setBasket({ ...basket, [index]: value }); // put an item into the basket
  };

  // handle delete a whole task
  const handleDeleteTask = (index) => {
    const newTasks = [...tasks]; // make a copy of tasks array
    newTasks.splice(index, 1); // delete the task through its specific index
    setTasks(newTasks); // update the tasks array
  };

  // handle deleting just an item from a task
  const handleDeleteListItem = (index, listIndex) => {
    const newTasks = [...tasks]; // make a copy of tasks array
    newTasks[index].listItems.splice(listIndex, 1); // delete the item from a specific task
    setTasks(newTasks); // update the tasks array
  };

  // display
  return (
    <>
      <div className="container">
        <header>
          <img src="../assets/list-checks.svg" alt="app-logo" />
          <h1>My Tasks</h1>
        </header>
        <section>
          <input
            type="text"
            placeholder="Add a new task..."
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
          <button onClick={handleNewTask}>+</button>
        </section>
        <main>
          {/* for each task a collapsible div container */}
          {tasks.map((task, index) => (
            <div key={index} className="container">
              <input type="checkbox" />
              <h3>{task.heading}</h3>
              <button onClick={() => handleDeleteTask(index)}>
                <img src="../assets/trash.svg" alt="delete-task" />
              </button>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  {task.map((items, listIndex) => (
                    <li key={listIndex} class="nav-item">
                      {items}
                    </li>
                  ))}
                  ;
                </ul>
                <input
                  type="text"
                  className=""
                  placeholder="Add new item..."
                  value={basket[index] || ""} // Use the value from basket object based on the current heading index
                  onChange={(e) => handleBasketChange(index, e.target.value)}
                />
                {/* Button to add the list item to the corresponding heading */}
                <button
                  className=""
                  onClick={() => handleNewListItem(index)}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </main>
        <footer></footer>
      </div>
    </>
  );
};

export default TodoList;
