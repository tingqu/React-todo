
//useEffect is used when you wish something happend when the page loads
import { useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
// import the booswatch ot any css theme in the file.
import 'bootswatch/dist/sketchy/bootstrap.min.css';
//Way to import the own componentsl
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    const getTasks = async()=>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }


  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }
  //Add the Task 
  const addTask = async (task)=>{
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers :{
        'Content-type':'application/json'
      },
      body:JSON.stringify(task),
    })

    const data = await res.json()
    setTasks([...tasks, data])
    // const id=Math.floor(Math.random*1000) +1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  //Delete the Task 
  const deleteTask = async (id)=>{
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE'
    })
    setTasks(tasks.filter((task)=>task.id !== id))
  }

  //Toggle reminder
  const toggleReminder = async (id)=>{
    const taskToToggle = await fetchTask(id)

    const updTask = {...taskToToggle, reminder : !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: "PUT",
      headers:{
        'Content-type': "application/json"
      },
      body: JSON.stringify(updTask)
    })

    const data  = await res.json()
    //... is used to copy the object and if wishing to change part of property, you can just change the property by separating the comma.
    setTasks(tasks.map((task)=> task.id === id? {...task,reminder: data.reminder}: task))
    
  }
  //This only allow to return single parent element 
  return (
    <Router>
      {/* className is similar to class in HTML */}
      <div className="container">
        {/* {} is used to change the value to string */}
        {/* <h1>hello from react</h1>
      <h2>Hello {name}</h2> */}
        {/* One way to add value Adding the title property to pass the value  ex: title = "Hello"*/}
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        
        <Route path="/" exact render={(props)=>{
          <>
            {showAddTask && <AddTask onAdd={addTask} />}

            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : "No Task to Show"}

          </>
        }}/>

        <Route path = "/about" component={About}/>
        <Footer />

      </div>
      </Router>
  );
}

export default App;
