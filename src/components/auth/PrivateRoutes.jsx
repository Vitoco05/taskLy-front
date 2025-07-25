import { Navigate, Outlet } from "react-router-dom";
import HeaderTask from "../layout/HeaderTask";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyTokenThunk } from "../../store/slices/users.slice";

const PrivateRoutes = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  console.log(user)

  useEffect(() => {
    dispatch(verifyTokenThunk()).finally(() => setLoading(false));
  }, [dispatch]);

  if (loading)
    return <div className="text-center mt-10">Verificando sesión...</div>;

  if (!user || !user.isVerified) return <Navigate to="/" />;

  return (
    <HeaderTask>
      <Outlet />
    </HeaderTask>
  );
};

export default PrivateRoutes;
