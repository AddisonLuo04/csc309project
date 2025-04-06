import { useState } from "react";
import { Link } from "react-router-dom";
import "./main.css";

function Home() {
    // some starter from T11, change later
    const [count, setCount] = useState(0);

    return <>
        <h1>A3</h1>
        <div className="row">
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
        </div>
        <div className="row">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    </>;
}

export default Home;