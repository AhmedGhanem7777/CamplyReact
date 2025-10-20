

import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");
const getRole  = () => localStorage.getItem("role")  || sessionStorage.getItem("role")  || "";

// مسارات مقيّدة: تمنع الوصول عند غياب التوكن أو عدم السماح بالدور
export const ProtectedRoute = ({ children, allow }: { children: ReactNode; allow: string[] }) => {
  const location = useLocation();
  const token = getToken();
  if (!token) return <Navigate to="/login" state={{ from: location }} replace />;
  const role = getRole();
  if (!allow.includes(role)) return <Navigate to="/home" replace />;
  return <>{children}</>;
};

// مسارات الهوية للضيوف فقط: إخفاؤها عن المستخدم المسجل
export const GuestOnlyRoute = ({ children }: { children: ReactNode }) => {
  const token = getToken();
  const role  = getRole();
  if (!token) return <>{children}</>;
  if (role === "مسؤول" || role === "صاحب_مخيم") return <Navigate to="/dashboard" replace />;
  return <Navigate to="/home" replace />;
};
