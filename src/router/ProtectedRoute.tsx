import { Navigate, Outlet } from "react-router-dom";
import { useAppStore } from "../stores/appStore";

const ProtectedRoute: React.FC = () => {
  const { isLogged } = useAppStore();
  const token = localStorage.getItem("authToken");

  if (token && isLogged) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
