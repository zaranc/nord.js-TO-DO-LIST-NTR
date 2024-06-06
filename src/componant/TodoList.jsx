import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteData, fetchdata, postdata, updateData } from '../Toolkit/Slice/todoSlice'
import { deletetodo } from '../BACKEND/services/todo.services'

const TodoList = () => {
    const dispatch = useDispatch()
    const [todo, setTodo] = useState([])
    const [completedtask, setcompletedtask] = useState()
    const [uncompletedtasks, setuncompletedtasks] = useState()

    const { task, isLoading, isError } = useSelector((state) => state.todo.data)
    // const completedTasks = useSelector((state) => state.todo.data.completedTask)
    // const uncompletedTasks = useSelector((state) => state.todo.data.uncompletedTask)

    // Fetch initial data when component mounts
    useEffect(() => {
        dispatch(fetchdata())
    }, [dispatch])

    useEffect(() => {
        let completedtaskfilter = task.filter((val) => val.status == true)
        setcompletedtask(completedtaskfilter)


        let uncompletedtaskfilter = task.filter((val) => val.status == false)
        setuncompletedtasks(uncompletedtaskfilter)
    
      
    }, [task])
    

    // Handle form input changes
    const getuserdata = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value })
    }

    // Handle checkbox toggle
    const handleCheck = (id, checked) => {
        const checkData = task.find((task) => task._id === id)
        dispatch(updateData({ id, data: { ...checkData, status: checked } }))
    }

    // Handle form submission
    const handlesubmit = (e) => {
        e.preventDefault()
        dispatch(postdata({ data: todo, endpoint: "addtask" }))
    }

    //delete data
    let handleDelete = (id) =>{
        dispatch(deleteData(id));
       
    }

    if (isError) {
        return <div>Error: {isError}</div>
    }

    if (isLoading) {
        return <h1>Loading.......</h1>
    }

    return (
        <div>
            <form onSubmit={handlesubmit}>
                <fieldset>
                    <legend>ADD TASK</legend>

                    <label htmlFor="task">ADD TASK:</label>
                    <input type="text" id="task" name="task" onChange={getuserdata} />

                    <label htmlFor="description">DESCRIPTION:</label>
                    <input type="text" id="description" name="description" onChange={getuserdata} />
                </fieldset>

                <input type="submit" value="Submit" />
            </form>

            <h1>{`All tasks: ${task?.length}`}</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Task Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Manage</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {task?.map((val, ind) => (
                        <tr key={val?._id}>
                            <th scope="row">{val?._id}</th>
                            <td>{val.task}</td>
                            <td>{val.description}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={val.status}
                                    onChange={(e) => handleCheck(val._id, e.target.checked)}
                                    style={{ scale: "1.5" }}
                                />
                            </td>
                            <td>
                               <button onClick={()=>handleDelete(val._id)}>delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1>{`Completed tasks: ${completedtask?.length}`}</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Task Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {completedtask?.map((val, ind) => (
                        <tr key={val?._id}>
                            <th scope="row">{val?._id}</th>
                            <td>{val.task}</td>
                            <td>{val.description}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={val.status}
                                    onChange={(e) => handleCheck(val._id, e.target.checked)}
                                    style={{ scale: "1.5" }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1>{`Uncompleted tasks: ${uncompletedtasks?.length}`}</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Task Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {uncompletedtasks?.map((val, ind) => (
                        <tr key={val?._id}>
                            <th scope="row">{val?._id}</th>
                            <td>{val.task}</td>
                            <td>{val.description}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={val.status}
                                    onChange={(e) => handleCheck(val._id, e.target.checked)}
                                    style={{ scale: "1.5" }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TodoList
