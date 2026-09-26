import { Navigate } from "react-router-dom";

const withAuth = (WrappedComponent) => function ProtectedComponent(props) {
  return localStorage.getItem("token")
    ? <WrappedComponent {...props} />
    : <Navigate to="/auth" replace />;
};

export default withAuth;
