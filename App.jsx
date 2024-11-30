import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './component/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todosString = localStorage.getItem("todos")
    //jb hmary pass todostring null nhi hogi tb ye hoga.. mtlb hmary pass data a
    //already save hoga tb e ye kaam hoga.
    if (todosString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const SaveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const togglefinished = (e) => {
    setshowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    SaveToLS()
    setTodos(newTodos)
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    SaveToLS()
    setTodos(newTodos)

  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    SaveToLS()

  }

  const handleChange = (e) => {
    setTodo(e.target.value)

  }



  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    SaveToLS()


  }


  return (
    <>
      <Navbar />
      
      <div className="mx-3 md:container md:mx-auto my-5 bg-violet-100 rounded-xl p-5 min-h-[80vh] md:w-[40%]">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage your Task at one place!</h1>
        <div className='addTodo my-5 flex flex-col gap-5'>
          <h2 className='text-2xl font-bold'>Add Todo</h2>

          <div className='flex'>
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 hover:bg-violet-950 p-4 py-2 text-sm font-bold text-white rounded-full mx-2'>Add</button>

          </div>

        </div>
        <div className=''>
          <input className='my-4' onChange={togglefinished} type="checkbox" checked={showFinished} /> Show Finished
          <h2 className='font-bold text-2xl'> Your Todos </h2>

          <div className='todos'>
            {todos.length === 0 && <div className='m-5'> No Todos Here!!</div>}
            {todos.map(item => {



              return (showFinished || !item.isCompleted) && <div key={item.id} className='todo flex md:w-1/2 justify-between my-3'>
                <div className='flex gap-5'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id='' />

                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className='buttons flex'>
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='button bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='button  bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
                </div>

              </div>
            })}
          </div>

        </div>
      </div>

    </>
  )
}

export default App
