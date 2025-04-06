import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';

const MyRoutes = () => {
    return <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
        </Route>
    </Routes>;
}

function App() {
    return (
        <BrowserRouter>
            <MyRoutes />
        </BrowserRouter>
    );
}

export default App;
