import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function ProtectedRoute({ children }: Props) {
  const { user, token } = useAppSelector((state) => state.auth);
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export function AdminRoute({ children }: Props) {
  const { user, token } = useAppSelector((state) => state.auth);
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== 1) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
