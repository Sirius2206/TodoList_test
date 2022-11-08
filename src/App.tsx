import { FormEvent, useRef, useState } from 'react'
import './App.css'
import { nanoid } from 'nanoid'

type TodoProps = {
  todo: string;
  completed: boolean;
}



function App() {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [mod, setMod] = useState<string>("all")
  const inputRef = useRef<HTMLInputElement | null>(null);

  function addTodo(e: FormEvent) {
    const value = inputRef.current!.value;
    e.preventDefault();
    if (value) {
      setTodos(prevState => [...prevState, { todo: value, completed: false }]);
    }
    inputRef.current!.value = "";
  }

  function toggleElem(elem: TodoProps) {
    const index = todos.indexOf(elem);
    let newTodos: TodoProps[] = Object.assign([], todos);
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  }

  function filterTodos(todo: TodoProps) {
    if (mod !== "true" && mod !== "false") return todo;
    return mod === "true" ? todo.completed === true : todo.completed === false;
  }

  function clearCompleted() {
    setTodos(todos.filter(todo => todo.completed !== true))
  }

  function changeMod(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newMod: string) {
    const btn: HTMLButtonElement = e.target! as HTMLButtonElement;
    if (btn.classList.contains("btn-active")) return;
    setMod(newMod);
    document.querySelector(".btn-active")?.classList.remove("btn-active");
    btn.classList.add("btn-active");

  }

  return <>
    <h1 className='main-title'>todos</h1>
    <div className='container'>
      <form onSubmit={e => addTodo(e)}>
        <input className='input' ref={inputRef} placeholder='What needs to be done?'></input>
      </form>
      <ul>
        {todos.filter(filterTodos).map((elem) =>
          <li
            key={nanoid()}
            className={`todo-elem ` + (elem.completed ? "todo-completed" : "")}
            onClick={() => toggleElem(elem)}
          >
            {elem.todo}
          </li>
        )}
      </ul>
      <footer className='footer'>
        {todos.filter(item => item.completed === false).length > 0
          ? <p>{todos.filter(item => item.completed === false).length} items left</p>
          : <p>Completed</p>}
        <ul className='todo-choose'>
          <li>
            <button
              className="btn btn-active"
              data-testid="all"
              onClick={e => changeMod(e, "all")}
            >
              All
            </button>
          </li>
          <li>
            <button
              className="btn"
              data-testid="active"
              onClick={e => changeMod(e, "false")}
            >
              Active
            </button>
          </li>
          <li>
            <button
              className="btn"
              data-testid="completed"
              onClick={e => changeMod(e, "true")}
            >
              Completed
            </button>
          </li>
        </ul>
        <button 
          className='todo-clear' 
          data-testid="clear"
          onClick={clearCompleted}
          >
            Clear completed
          </button>
      </footer>
    </div>
  </>
}

export default App

