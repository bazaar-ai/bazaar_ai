import { Navigate } from "react-router-dom";
import { useAuth } from "../shared/context/AuthContext";

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/qeydiyyat" replace />;
  }

  return children;
}
