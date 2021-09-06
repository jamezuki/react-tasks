import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('https://jamezuki-express-tasks.herokuapp.com/tasks')
    const data = await res.json()
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`https://jamezuki-express-tasks.herokuapp.com/tasks/${id}`)
    const data = await res.json()
    return data
  }

  const deleteTask = async (id) => {
    await fetch(`https://jamezuki-express-tasks.herokuapp.com/tasks/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter((task) => task._id !== id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`https://jamezuki-express-tasks.herokuapp.com/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
    const data = await res.json()
    setTasks(tasks.map((task) => (task._id === id ? { ...task, reminder: data.reminder } : task)))
  }

  const addTask = async (task) => {
    const res = await fetch('https://jamezuki-express-tasks.herokuapp.com/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    const data = await res.json()
    setTasks([...tasks, data])
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        'No Tasks to Show'
      )}
    </div>
  )
}

export default App
