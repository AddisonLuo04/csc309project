import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Success from "./pages/Success";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import { DashboardProvider } from "./contexts/DashboardContext";
import Register from "./pages/Register";
import Transaction from "./pages/Transaction";
import { TransactionProvider } from "./contexts/TransactionContext";
import Promotion from "./pages/Promotion";
import { PromotionProvider } from "./contexts/PromotionContext";
import Event from "./pages/Event";
import { EventProvider } from "./contexts/EventContext";


const theme = createTheme();

const MyRoutes = () => {
    return <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/success" element={<Success />} />

            {/* protected routes... */}
            <Route
                path="/profile"
                element={
                    <ProtectedRoute clearanceLevel="regular">
                        <Profile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/register"
                element={
                <ProtectedRoute clearanceLevel="cashier">
                    <Register />
                </ProtectedRoute>
                }
            />
            <Route 
                path="/transaction"
                element={
                    <ProtectedRoute clearanceLevel="regular">
                        <Transaction />
                    </ProtectedRoute>
                }
            />
            <Route 
                path="/promotion"
                element={
                    <ProtectedRoute clearanceLevel="regular">
                        <Promotion />
                    </ProtectedRoute>
                }
            />
            <Route 
                path="/event"
                element={
                    <ProtectedRoute clearanceLevel="regular">
                        <Event />
                    </ProtectedRoute>
                }
            />
            {/* catch-all route */}
            <Route path="*" element={<NotFound />} />
        </Route>

    </Routes>;
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <UserProvider>
                    <DashboardProvider>
                        <TransactionProvider>
                            <PromotionProvider>
                                <EventProvider>
                                    <MyRoutes />
                                </EventProvider>
                            </PromotionProvider>
                        </TransactionProvider>
                    </DashboardProvider>
                </UserProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
