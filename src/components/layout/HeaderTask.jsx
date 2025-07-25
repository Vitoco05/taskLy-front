import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUserThunk } from "../../store/slices/users.slice";
import { useNavigate } from "react-router-dom";
import ModalForm from "../ModalForm";

const HeaderTask = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUserThunk())
    navigate('/')
  };

  const handleShowModalForm = () => {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <section>
      <nav className="bg-white dark:bg-gray-900 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/logo-header.png"
              className="h-8"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              TaskLy
            </span>
          </div>
          <button
            onClick={handleToggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <button
                  onClick={handleShowModalForm}
                  className="block text-blue-700 p-4 rounded-sm md:border-0  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Nueva tarea
                </button>
              </li>
              <li>
                <button
                  className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-red-500 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
      <ModalForm handleShowModalForm={handleShowModalForm} setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal}/>
    </section>
  );
};

export default HeaderTask;