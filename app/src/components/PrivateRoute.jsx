import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo) {
    return <Outlet />;
  } else {
    // toast.error("Please login to access");
    return <Navigate to="/login" />;
  }
};
export default PrivateRoute;
