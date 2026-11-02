// import core and necessary packages
import React, {useState} from 'react';
import './TodoList.css';

// the main component of the application
const TodoList = () => {

    const [todos, setTodos] = useState([]); // array of objects for all tasks
    const [headings, setHeadings] = useState(''); // the headings and key in each todo object
    const [basket, setBasket] =useState({}); // for appending list to correct todo object

    // handle text length for headings and lists
    const truncate = (str, max) => str.length > max ? str.slice(0, max) : str;
    const maxHeading = 20;
    const maxText = 20;

    // handle new to-do by adding a heading
    const handleNewTodo = () => {
        if (headings.trim() !== "") {
            headings = truncate(headings, maxHeading);
            setTodos([...todos, {heading: headings, lists: []}]);
            setHeadings('');
        };
    };

    // handle new list item to a specific to-do heading
    const handleNewItem = (index) => {
        // check if the input for a given index is not empty of just whitespaced
        if (basket[index] && basket[index].trim() !== "") {
            const newTodos = [...todos]; // make a copy of to-do array
            newTodos[index].lists.push(basket[index]); // append the new list item
            setTodos(newTodos); // update todo array
            setBasket({...basket, [index]: ""}); // clear basket
        };
    };

    // handle add to basket
    const handleBasketChange = (index, value) => {
        setBasket({...basket, [index]: value}); // add to basket
    };

    // handle delete todo object
    const handleDeleteTodo = (index) => {
        const newTodos = [...todos]; // create a shallow copy of todos array
        newTodos.splice(index, 1); // delete that specific index from the array
        setTodos(newTodos); // update todos array
    };

    // handle delete todo list item
    const handleDeleteItem = (index, listIndex) => {
        const newTodos = [...todos]; // create a copy of the todos array
        newTodos[index].lists.splice(listIndex, 1); // delete that list item
        setTodos(newTodos); // update todos array        
    };

    // display
    return(
        <>
            <div className='container'>
                <div className='toDo-Header'>
                    <img src="../assets/list-checks.svg" alt="header-icon" />
                    <h1 className='title'>My Tasks</h1>
                </div>
                <div className='newTodo-container'>
                    <input 
                    type="text"
                    placeholder='Add a new task...'
                    value={headings}
                    onChange={(e) => {setHeadings(e.target.value)}} // upadate headings state
                    />
                    <button onClick={handleNewTodo}>+</button>
                </div>
            </div>
        </>
    );
};

export default TodoList;