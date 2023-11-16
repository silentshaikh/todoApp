import React, { useState,useEffect } from 'react';
import './App.css';
import {AiOutlinePlus,AiFillDelete,AiOutlineEdit} from 'react-icons/ai';
import { Tooltip } from 'antd';
function App() {
  const getLoStr = () => {
    let getList = localStorage.getItem("Todo-App-React");
    return getList ? JSON.parse(getList) : [] ;
  } 
  const [inpValue,setInpValue] = useState("");
  const [itemList,setItemList] = useState(getLoStr());
  const [btnTogg,updBtnTogg] = useState(true);
  const [editTodo,setEditTodo] = useState(null);
  const addList = () => {
    if(inpValue == ""){
      alert("Please Fill the INput");
    }else if(inpValue && !btnTogg){
      setItemList(
        itemList.map((e) => {
          if(e.id == editTodo){
            return {...e, valueInp: inpValue};
          }
          return e;
        })
      )
      updBtnTogg(true);
    setInpValue("");
    setEditTodo(null);
    } else{
      const todoItem = {id: new Date().getTime().toString(),valueInp: inpValue,};
            setItemList([...itemList,todoItem])
    setInpValue("");
    }
  };
  const itemDelte = (index) => {
    let delItem = itemList.filter((e) => {
      return index != e.id;
    })
    setItemList(delItem)
  }
  const itemEdit = (id) => {
    let editList = itemList.find((element) => {
      return id == element.id;
    });
    updBtnTogg(false);
    setInpValue(editList.valueInp);
    setEditTodo(id)
  }
  const remAll = () => {
    setItemList([]);
  }
  useEffect(() => {
    localStorage.setItem("Todo-App-React",JSON.stringify(itemList));
  },[itemList])
    return (
   <>
    <div className="todo">
      <h1 className='head'>Create Your Todo List </h1>
      <div className="input">
        <input type="text" name="" id="" placeholder='✍️ Add List' value={inpValue} onChange={(e) => setInpValue(e.target.value)} />
        {btnTogg ? <Tooltip title='Add Item' color='#48dbfb' key='#48dbfb'> <AiOutlinePlus className='icon' onClick={addList} /></Tooltip> : <Tooltip title='Edit Item' color='#55efc4' key='#55efc4' > <AiOutlineEdit className='icon' id='edit' style={{color:' #55efc4',}} onClick={addList} /> </Tooltip>}
      </div>
      <ol className="list">
        {itemList.map((element) => {
          return( <>
            <li key={element.id}><p>{element.valueInp}</p><AiOutlineEdit id='edit' onClick={() => itemEdit(element.id)} /><AiFillDelete className='delete' onClick={() => itemDelte(element.id)}/></li>
          </>);
        })}
      </ol>
      <div className="btn">
        <button className='rem' onClick={remAll}>Remove All</button>
      </div>
    </div>
   </>
  );
}

export default App;
