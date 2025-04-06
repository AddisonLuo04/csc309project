import "./Layout.css";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { Link, AppBar} from '@mui/material';
// for authorization
// import { useAuth } from "../contexts/....";

const Layout = () => {
    // const { user, logout } = useAuth();
    return <>
        <header>
            {/* <AppBar color="#4a4e69">  --> trying app bar out but style isnt great so far*/}
                <Link component={RouterLink} to="/">Home</Link>
                {/* { user ? <>
                    <Link to="/profile" className="user">{user.username}</Link>
                    <a href="#" onClick={logout}>Logout</a>
                    </> :
                    <Link to="/login">Login</Link>
                } */}
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