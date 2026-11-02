// import core and necessary packages
import React, {useState} from 'react';
import './TodoList.css';

// the main component of the application
const TodoList = () => {

    const [todos, setTodos] = useState([]); // array of objects for all tasks
    const [headings, setHeadings] = useState(''); // the headings and key in each todo object
    const [basket, setBasket] =useState({}); // for appending list to correct todo object

    // display
    return(
        <>
        </>
    );
};

export default TodoList;