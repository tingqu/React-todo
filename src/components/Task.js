import { FaTimes } from 'react-icons/fa'
const Task = ({task, onDelete,onToggle}) => {
    return (
        //This is the way to dynamically determine the className in the react
        <div className={`task ${task.reminder ?'reminder':''}`} onDoubleClick={()=>onToggle(task.id)}>
            <h3>{task.text} <FaTimes style = {{cursor:'pointer'}} onClick={() => onDelete(task.id)} /></h3>
            <p> {task.date}</p>
            
        </div>
    )
}

export default Task
