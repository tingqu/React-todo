import Task from './Task'

const Tasks = ({tasks, onDelete, onToggle}) => {
    return (
        <>
        {/* Use map to loop through the array */}
            {tasks.map((task, index)=>(
            <Task key = {index} task = {task}  onDelete = {onDelete} onToggle = {onToggle}/>
            ))}
        </>
    )
}

export default Tasks
