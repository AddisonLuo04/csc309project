// renavigate user to a not found page if they are not properly authorized
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NotFound from "../pages/NotFound";

const ProtectedRoute = ({ children }) => {
    const { user, authLoading, isLoggingOut } = useAuth();
    if (authLoading || isLoggingOut) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return <NotFound type="unauthorized" />;
    }
    return children;
};

export default ProtectedRoute;
