import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import TodoForm from "./TodoForm";
import "./App.css"

export default function App() {

  const [todos, setTodos] = useState([
    {
      "id": 1,
      "title": "Wash the car",
      "dateDue": new Date("2025-07-04"),
      "urgency": 3,
      "done": false
    },
    {
      "id": 2,
      "title": "Get grocery",
      "dateDue": new Date("2025-07-05"),
      "urgency": 2,
      "done": true
    },
    {
      "id": 3,
      "title": "Clean the room",
      "dateDue": new Date("2025-07-05"),
      "urgency": 5,
      "done": false
    }
  ])


  const [showAddTodo, setShowAddTodo] = useState(false);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-SG");
  }



  // const renderTodos = () => {
  //   let jsx = [];
  //   for (let t of todos) {
  //     jsx.push(<li key={t.id}>{t.title} (Date Due: {formatDate(t.dateDue)}) Urgency:{t.urgency}</li>)
  //   }
  //   return jsx;
  // }

  return <>
    <div className="container">
      <h1>Todo List</h1>
      <button onClick={() => {
        setShowAddTodo(true);
      }}>Add New Todo</button>

      <div className="dialog" style={{
        "display": showAddTodo ? "block" : "none"
      }}>
        <TodoForm onSubmit={(title, dateDue, urgency) => {
          const newTodo = {
            id: Math.floor(Math.random() * 1000 + 1),
            title: title,
            dateDue: new Date(dateDue),
            urgency: urgency,
            done: false
          };
          // React only "detect" that state has changed only if its value
          // to "change" an array
          // 1. clone the array
          // 2. modify the clone
          // 3. replace the array in the state with the clone

          // STRAIGHTFOWARD:
          // const clone = todos.slice();
          // clone.push(newTodo);
          // setTodos(clone);

          setTodos([...todos, newTodo]);


        }} 
        onCancel = {()=>{
          setShowAddTodo(false);
        }}
        />
      </div>

      <ul className="list-group">
        {
          // the map function returns a new array
          // each element in the new array is a "copy" of the original element but modified in same way
          todos.map(function (t) {
            return <li key={t.id} className="list-group-item">
              <h2>{t.title}</h2>
              <ul>
                <li>Urgency: {t.urgency}</li>
                <li>Date Due: {formatDate(t.dateDue)}</li>
                <li>Done: <input type="checkbox" checked={t.done} /></li>
              </ul>
            </li>
          })
        }
      </ul>
    </div>
  </>
}