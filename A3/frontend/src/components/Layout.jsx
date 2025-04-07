import "./Layout.css";
import { Link, Outlet } from "react-router-dom";
import { AppBar, MenuItem, Select } from '@mui/material';
// for authorization
import { useAuth } from "../contexts/AuthContext"
import { useUser } from "../contexts/UserContext";

const Layout = () => {
    const { user, logout, clearError } = useAuth();
    const { currentInterface, setCurrentInterface, availableInterfaces } = useUser();
    return <>
        <header>
            {/* <AppBar color="#4a4e69">  --> trying app bar out but style isnt great so far*/}
            {/* <Link component={RouterLink} to="/">Home</Link> */}

            <Link to="/">Home</Link>
            {user && availableInterfaces.length > 1 && (
                <select
                    value={currentInterface}
                    onChange={(e) => setCurrentInterface(e.target.value)}

                >
                    {availableInterfaces.map((role) => (
                        <option key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                    ))}
                </select>
            )}

            {user ? <>
                <Link to="/profile" className="user">{user.utorid}</Link>
                <a href="#" onClick={logout}>Logout</a>
            </> :
                <Link to="/login">Login</Link>
            }
            {/* </AppBar> */}
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            CSC309 A3 Addison Luo & Alicia Zhang
        </footer>
    </>;
};

export default Layout;