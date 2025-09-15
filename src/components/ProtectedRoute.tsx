import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Navigate } from "react-router-dom";
import type { UserRole } from "../features/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode; 
  role?: UserRole;
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const auth = useSelector((state: RootState) => state.auth);
  const { token, role: userRole } = auth;

  if (!token) return <Navigate to="/login" replace />;
  if (role && role !== userRole) return <Navigate to="/" replace />;

  return <>{children}</>;
}
