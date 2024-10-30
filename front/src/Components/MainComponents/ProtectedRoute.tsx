import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Layout from "./Layout";
const ProtectedRoute = () => {
  const current = useSelector((state: { type: any }) => state.type.current);
  const layoutStatus = useSelector(
    (state: { layoutState: any }) => state.layoutState
  );
  return current.id ? (
  <>
      {layoutStatus.showLayout && <Layout />}
      <Header />
      <Outlet />
      </>
  ) : (
    <Navigate to={"/"} />
  );
};

export default ProtectedRoute;
