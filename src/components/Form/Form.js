import './Form.css';
import {useState} from "react";

// создаем компонент Form, который позволяет добавлять новые задачи
const Form = (props) => {
    const [value, setValue] = useState("") //создаем состояние, чтобы объект input был управляемым, по умолчанию пустым

    return (
        <form className="form" onSubmit={e => {
            e.preventDefault(); // установим дефолтное поведение на onSubmit, чтобы наша страница не перезагружалась
            props.putTodo(value); // передаем значение value
            setValue(""); // обнуляем наше состояние на пустое, когда мы отправляем задачу, чтобы у нас не оставался заполненный input
        }
        }>
            <input type="text" placeholder='Введите текст...' className="input" value={value} onChange={e => setValue(e.target.value)} />
        </form>    
    );
};

export default Form;