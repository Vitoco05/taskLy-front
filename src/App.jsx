import "./App.css";
import LoginForm from "./pages/LoginForm";
import CreateUserForm from "./pages/CreateUserForm";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./components/auth/PrivateRoutes";
import TasksList from "./components/Tasks/TasksList";
import EmailVerificationNotice from "./pages/EmailVerificationNotice";
import VerifyPage from "./pages/VerifyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm/>}/>
      <Route path="/register" element={<CreateUserForm/>}/>
      <Route path="/verify-message" element={<EmailVerificationNotice/>}/>
      <Route path="/verify/:token" element={<VerifyPage />} />
      
      <Route element={<PrivateRoutes/>}>
        <Route path="/home" element={<TasksList/>}/>
      </Route>
    </Routes>
  );
}

export default App;
