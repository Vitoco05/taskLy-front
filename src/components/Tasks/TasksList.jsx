import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteTaskThunk, getTasksThunk } from "../../store/slices/tasks.slice"
import TaskCard from "./TaskCard"
import ModalForm from "../ModalForm"

const TasksList = () => {

  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks.tasks)

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)

  const handleShowModalForm = () => {
    setIsOpenModal(!isOpenModal)
    setTaskToEdit(null)
  }

  const openModalForEdit = (task) => {
    setTaskToEdit(task);
    setIsOpenModal(true)
  }

  const deleteTask = (taskId) => {
    dispatch(deleteTaskThunk(taskId))
    dispatch(getTasksThunk())
  }

  useEffect(() => {
    dispatch(getTasksThunk())
  }, [dispatch])

  return (
    <section className="max-w-full min-h-screen flex flex-col gap-4 p-4">
      {
        tasks?.map((task) => <TaskCard openModalForEdit={openModalForEdit} deleteTask={deleteTask} task={task} key={task.id}/>)
      }
      <ModalForm 
        handleShowModalForm={handleShowModalForm}
        setIsOpenModal={setIsOpenModal}
        isOpenModal={isOpenModal}
        taskToEdit={taskToEdit}
      />
    </section>
  )
}

export default TasksList