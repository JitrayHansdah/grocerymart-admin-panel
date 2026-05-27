import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const admin =
        localStorage.getItem("admin");

    return admin
        ? children
        : <Navigate to="/login" />;
}

export default ProtectedRoute;