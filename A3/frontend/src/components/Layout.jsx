import "./Layout.css";
import { Link, Outlet } from "react-router-dom";
import { AppBar} from '@mui/material';
// for authorization
import { useAuth } from "../contexts/AuthContext"

const Layout = () => {
    const { user, logout, clearError } = useAuth();
    return <>
        <header>
            {/* <AppBar color="#4a4e69">  --> trying app bar out but style isnt great so far*/}
                {/* <Link component={RouterLink} to="/">Home</Link> */}
                <Link to="/">Home</Link>
                { user ? <>
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