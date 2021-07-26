import TodoList from "./components/TodoList";
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { useCallback, useState } from "react";
import {v4} from 'uuid';
import React , {useEffect} from "react";

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
  //state, props
  const[todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    const dataList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if(dataList) {
      setTodoList(JSON.parse(dataList));
    }
    
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
    
  }, [todoList]);

  const onTextChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onClickBtn = useCallback((e) => {
    //Addtext to List
    setTodoList([...todoList, {id: v4(), name: textInput, isCompleted: false}]);
    setTextInput("");
  }, [textInput, todoList] );

  //CheckWordDone
  const onCheckDone = useCallback((id) => {
    setTodoList((preState) =>
      preState.map((todo) =>
        todo.id === id ? {...todo, isCompleted: true} :todo
      )
    );
  }, []);

  return (
    <div className="App">
      <h1>Hello Tracker!</h1>
      <Textfield name="add-todo" placeholder="Add work to do..." elemAfterInput={<Button isDisabled={!textInput}    appearance='primary' onClick={onClickBtn}>Add

          </Button>
        }
        css={{padding:"2px 4px 2px"}}
        value={textInput}
        onChange={onTextChange}
      ></Textfield>
      <TodoList todoList={todoList} onCheckDone = {onCheckDone} />
    </div>
  );
}

export default App;
