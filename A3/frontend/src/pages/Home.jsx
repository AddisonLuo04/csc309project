import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./main.css";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { Button, Modal, Card, CardContent, CardActions, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreatePurchaseModal from "../components/CreatePurchaseModal";
import ProcessRedemptionModal from "../components/ProcessRedemptionModal";
import { useDashboard } from "../contexts/DashboardContext";

function Home() {
    const { user } = useAuth();
    const { currentInterface } = useUser();
    const { setPurchaseMessage, setRedemptionMessage } = useDashboard();

    // Get recent transactions (max 3)
    const recentTransactions = user?.transactions?.slice(0, 3);

    const [openForm, setOpenForm] = useState(false);
    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => { setPurchaseMessage(null); setOpenForm(false); }

    const [openRedemption, setOpenRedemption] = useState(false);
    const handleOpenRedemption = () => setOpenRedemption(true);
    const handleCloseRedemption = () => { setRedemptionMessage(null); setOpenRedemption(false); }

    const navigate = useNavigate();

    return <>
        {/* Interface changes depending on user role*/}
        {user ?
            currentInterface === "regular" ? <>
                {/* Regular*/}
                <div style={{display: "block", textAlign: "center"}}>
                    <h2>Dashboard</h2>
                    <Card variant="outlined" sx={{my: "8px"}}>
                        <CardContent>
                            <strong>Points: </strong>{user.points}
                        </CardContent>
                    </Card>
                    <Card variant="outlined" sx={{my: "8px"}}>
                        <CardContent>
                            <strong>Recent Transactions</strong>
                            {recentTransactions && recentTransactions.length > 0 ? (
                            recentTransactions.map((transaction) => (
                            <div key={transaction.id} className="transaction">
                            <Accordion sx={{mt: "4px"}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <p style={{fontSize: "16px"}}><strong>Transaction {transaction.id}</strong></p>
                                </AccordionSummary>
                                <AccordionDetails>
                                <p style={{fontSize: "14px"}}><strong>Type:</strong> {transaction.type}</p>
                                <p style={{fontSize: "14px"}}><strong>Amount:</strong> {transaction.amount}</p>
                                </AccordionDetails>
                            </Accordion>
                            </div>
                        ))
                        ) : (
                            <p>No transactions available.</p>
                        )}
                        </CardContent>
                    </Card>
                    <Button variant="outlined" onClick={() => navigate("/transaction")}>Transactions Page</Button>
                </div>
                <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                    <Button variant="outlined">See Events</Button>
                    <Button variant="outlined">See Promotions</Button>
                </div>
            </>
            : currentInterface === "cashier" ? <>
                {/* Cashier*/}
                <h2>Dashboard</h2>
                <div>
                    <Button variant="outlined" onClick={handleOpenForm}>Create Purchase</Button>
                    <Modal open={openForm} onClose={handleCloseForm}>
                        <CreatePurchaseModal />
                    </Modal>
                </div>
                <div>
                    <Button variant="outlined" onClick={handleOpenRedemption}>Process Redemption</Button>
                    <Modal open={openRedemption} onClose={handleCloseRedemption}>
                        <ProcessRedemptionModal />
                    </Modal>
                </div>
                <div>
                    <Button variant="outlined" onClick={() => navigate('/register')}>Register a User</Button>
                </div>
                <div>
                    <Button variant="outlined" onClick={() => navigate("/transaction")}>Transactions Page</Button>
                </div>
            </>
            : <>
                {/* Manager/Superuser*/}
                <h2>Dashboard</h2>
                <div style={{display: "flex", gap: "8px"}}>
                    <Card variant="outlined" sx={{position: "relative", width: "250px", height: "250px"}}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Events
                            </Typography>
                            <Typography variant="body2">
                                Eventinfo
                            </Typography>
                        </CardContent>
                        <CardActions sx={{position: "absolute", bottom: "0"}}>
                            <Button size="small" variant="outlined">Manage Events</Button>
                        </CardActions>
                    </Card>
                    <Card variant="outlined" sx={{position: "relative", width: "250px", height: "250px"}}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Promotions
                            </Typography>
                            <Typography variant="body2">
                                Eventinfo here
                            </Typography>
                        </CardContent>
                        <CardActions sx={{position: "absolute", bottom: "0"}}>
                            <Button size="small" variant="outlined">Manage Promotions</Button>
                        </CardActions>
                    </Card>
                    <Card variant="outlined" sx={{position: "relative", width: "250px", height: "250px"}}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Users
                            </Typography>
                            <Typography variant="body2">
                                Eventinfo here
                            </Typography>
                        </CardContent>
                        <CardActions sx={{position: "absolute", bottom: "0"}}>
                            <Button size="small" variant="outlined">Manage Users</Button>
                        </CardActions>
                    </Card>
                </div>
            </>
        : (<> {/* Not logged in*/}
            <h1>Welcome to A3!</h1>
            <div className="row">
                <Link to="/login">Login</Link>
            </div>
        </>
        )}
    </>;
}

export default Home;