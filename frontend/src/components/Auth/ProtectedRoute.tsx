import { Navigate, Outlet } from "react-router-dom";

type props = {
  children?: any;
  isAllowed: boolean;
  redirectTo: string;
};

const ProtectedRoute = ({
  children,
  isAllowed,
  redirectTo = "/login",
}: props) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
