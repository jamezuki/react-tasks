import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
  const styleFaTimes = {
    color: 'red',
    cursor: 'pointer',
  }

  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(task._id)}
    >
      <h3>
        {task.text} <FaTimes style={styleFaTimes} onClick={() => onDelete(task._id)} />
      </h3>
      <p>{task.date}</p>
    </div>
  )
}

export default Task
