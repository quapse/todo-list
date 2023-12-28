import './App.css';
import {useEffect, useState} from "react";
import Form from '../Form/Form';

// App - самый главный компонент, внутри которого мы будем строить всю структуру нашего приложения
function App() {
    const [todos, setTodos] = useState ([]) // создаем состояние, которое хранит наши задачи, по умолчанию пустой массив
    const [allTodos, setAllTodos] = useState (0) // создаем состояние, которое подсчитывает сколько всего задач, по умолчанию 0
    const [allComplete, setAllComplete] = useState(0) // создаем состояние, которое подсчитывает сколько всего выполненных задач, по умолчанию 0

// активируем кнопку подсчета выполненных задач
    useEffect( () => {
        setAllComplete(todos.filter(todo => todo.done === true).length)
    }, [todos])

// создаем функцию добавления задачи
    const putTodo = (value) => {
        if (value) {
            setTodos([...todos, {id: Date.now(), text: value, done: false}]) // если была введено новая задача, то сохраняет старые задачи в списке + добавляем в этот список введенное новое значение
            setAllTodos(allTodos + 1)
        } else {
            alert("Введите текст!") // если отправляем нулевое значение, то будет выводиться alert с данным текстом
        }
    }

// реализуем функцию, с помощью которой можно будет указать, выполнена задача или нет
    const toggleTodo = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id !== id) return todo;

            return {
                ...todo,
                done: !todo.done
            }
        }))
    }

// активируем кнопку удаления определенных задач + корректируем кнопку подсчета всех задач после удаления какой-либо задачи
    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
        setAllTodos(allTodos - 1)
    }

// кнопка удаления всех задач
    const clearTodos = () => {
        setTodos([]);
        setAllTodos(0)
    }

  return (
    <div className = "wrapper">
      <div className = "container">
        <h1 className="title">Todolist</h1>
          <Form 
              putTodo={putTodo} // передаем функцию добавления задачи
          />
          <ul className="todos">
              {
                  todos.map(todo => {      //Выводим наши задачи
                      return (
                          <li className={todo.done ? "todo done" : "todo"} key={todo.id} onClick={() => toggleTodo(todo.id)}>
                              {todo.text}
                              <img src="./delete.png" alt="delete" className="delete" onClick={e => {
                                  e.stopPropagation();
                                  removeTodo(todo.id);
                              }
                              }/>
                          </li>
                        );
                    })
                }
                <div className="info">
                    <span>All todos: {allTodos}</span>
                    <span>Complete: {allComplete}</span>
                </div>
                <button className="btn" onClick={clearTodos}>Clear All</button>
            </ul>
        </div>
    </div>
  );
}

export default App;
