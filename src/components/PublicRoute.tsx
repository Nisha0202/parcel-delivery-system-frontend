import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { ReactNode } from "react";

export default function PublicRoute({ children }: { children: ReactNode }) {
  const { token } = useSelector((s: RootState) => s.auth);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
