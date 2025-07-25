import { borderStyle } from "../../utils/taskBorder";

const TaskCard = ({ task, deleteTask, openModalForEdit }) => {
  const { taskName, description, priority, createdAt } = task;

  return (
    <article
      className={`bg-white rounded-2xl shadow-md p-4 w-full max-w-md mx-auto border-l-4 
                    ${borderStyle(priority)} hover:shadow-lg transition duration-300`}
    >
      <h2 className="text-xl font-semibold text-gray-800 capitalize">{taskName}</h2>
      <p className="text-gray-600 mt-2">{description.charAt(0).toUpperCase() + description.slice(1)}</p>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span className="capitalize">
          Prioridad: <b>{priority}</b>
        </span>
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-xl text-sm">
          Completar
        </button>
        <button
          onClick={() => openModalForEdit(task)} 
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-xl text-sm">
          Editar
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-xl text-sm"
        >
          Borrar
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
