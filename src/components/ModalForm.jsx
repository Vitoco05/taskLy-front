import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createTaskThunk, getTasksThunk, updateTaskThunk } from "../store/slices/tasks.slice";
import { defaultTaskValues } from "../utils/defaultTaskValues";
import { useEffect } from "react";

const ModalForm = ({ handleShowModalForm, setIsOpenModal, isOpenModal, taskToEdit = null }) => {
  const { handleSubmit, register, reset, setValue } = useForm();
  const dispatch = useDispatch();

   useEffect(() => {
    if (taskToEdit) {
      setValue("taskName", taskToEdit.taskName);
      setValue("description", taskToEdit.description);
      setValue("priority", taskToEdit.priority);
    } else {
      reset(defaultTaskValues);
    }
  }, [taskToEdit, reset, setValue]);
  
  const submit = (data) => {
    if(taskToEdit) {
      dispatch(updateTaskThunk(taskToEdit.id, data))
    } else {
      dispatch(createTaskThunk(data));
    }
    setIsOpenModal(false);
    dispatch(getTasksThunk());
  };

  if (!isOpenModal) return null;

  return (
    <section className="fixed inset-0 bg-black bg-opacity-40 px-3 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto border-l-4 border-blue-500 transition duration-300">
        <button
          onClick={() => handleShowModalForm}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
          type="button"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit(submit)} className="space-y-4 mt-4">
          <h2 className="text-center text-xl font-semibold text-gray-800 mb-2">
            {taskToEdit ? "Editar tarea" : "Crear una tarea"}
          </h2>

          <div>
            <label
              htmlFor="taskName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tarea
            </label>
            <input
              type="text"
              id="taskName"
              {...register("taskName", {
                required: "Debes ponerle un nombre a tu tarea.",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Descripción
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Debes agregar la descripción de la tarea"
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Prioridad
            </label>
            <select
              id="priority"
              {...register("priority", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {taskToEdit ? "Guardar cambios" : "Crear tarea"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ModalForm;
