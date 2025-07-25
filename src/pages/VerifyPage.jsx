import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const VerifyPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/verify/${token}`)
      .then(() => {
        alert("Cuenta verificada correctamente");
        navigate("/");
      })
      .catch(() => {
        alert("Token inválido o expirado");
        navigate("/");
      });
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center">
      <p>Verificando cuenta...</p>
    </section>
  );
};

export default VerifyPage;
