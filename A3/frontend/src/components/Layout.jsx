import "./Layout.css";
import { Link, Outlet } from "react-router-dom";
// for authorization
// import { useAuth } from "../contexts/....";

const Layout = () => {
    // const { user, logout } = useAuth();
    return <>
        <header>
            <Link to="/">Home</Link>
            {/* { user ? <>
                <Link to="/profile" className="user">{user.username}</Link>
                <a href="#" onClick={logout}>Logout</a>
                </> :
                <Link to="/login">Login</Link>
            } */}
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