import { MailCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmailVerificationNotice = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          <MailCheck className="text-blue-500 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verifica tu correo</h2>
          <p className="text-gray-600 mb-6">
            Te hemos enviado un enlace de verificación a tu dirección de correo electrónico. Por favor, revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-2 text-blue-600 hover:underline"
          >
            Volver al login
          </button>
        </div>
      </div>
    </section>
  );
};

export default EmailVerificationNotice;
