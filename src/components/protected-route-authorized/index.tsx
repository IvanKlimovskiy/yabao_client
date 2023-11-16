import { FC } from "react";
import { ProtectedRouteProps } from "./index.types.ts";
import { useAppSelector } from "../../services/store/index.types.ts";
import { Navigate } from "react-router-dom";

const ProtectedRouteAuthorized: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthorized } = useAppSelector((state) => state.profile);

  return isAuthorized ? children : <Navigate to={"/"} replace />;
};
export default ProtectedRouteAuthorized;
