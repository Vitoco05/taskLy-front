import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUserThunk } from "../store/slices/users.slice";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (data) => {
    dispatch(loginUserThunk(data))
      .then((user) => {
        if (user?.isVerified) {
          navigate("/home");
        } else {
          navigate("/verify-message");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">TaskLy</h1>

      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto border-l-4 border-blue-500 transition duration-300">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
          Iniciar sesión
        </h2>

        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginForm;
