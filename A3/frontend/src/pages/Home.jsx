import { useState } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import { useAuth } from "../contexts/AuthContext";

function Home() {
    const { user } = useAuth();
    const [error, setError] = useState('');
    
    // recent transactions (max 3)
    const recentTransactions = user?.transactions?.slice(0, 3);

    // adding transactions
    const [transactionType, setTransactionType] = useState("");
    const [purchaseData, setPurchaseData] = useState({
        username: "",
        type: "purchase",
        spent: "",
        promotionIds: "",
        remark: ""
    });

    const [transferData, setTransferData] = useState({
        username: "",
        type: "transfer",
        amount: "",
        remark: ""
    });
    const [redemptionData, setRedemptionData] = useState({
        username: "",
        type: "transfer",
        amount: "",
        remark: ""
    });

    const convertPromotionsToArray = (input) => {
        const promotions = input.split(' ');
        const promotionsArray = [];
        for (let promotion of promotions) {
            if (promotion !== "") {
                const parsedPromotion = parseFloat(promotion);
                if (isNaN(parsedPromotion)) {
                    return null;
                }
                promotionsArray.push(parsedPromotion);
            }
        }
        return promotionsArray;
    };

    const handleFormChange = (e) => {
        setError("");
        if (transactionType === "purchase") {
            setPurchaseData({
                ...purchaseData,
                [e.target.name]: e.target.value,
            });
        } else if (transactionType === "transfer") {
            setTransferData({
                ...transferData,
                [e.target.name]: e.target.value,
            });
        } else {
            setPurchaseData({
                ...purchaseData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (transactionType === "purchase") {
            const parsedSpent = parseFloat(purchaseData.spent);
            const data = {
                username: purchaseData.username,
                type: purchaseData.type,
                spent: parsedSpent,
                promotionIds: [],
                remark: purchaseData.remark
            };
            if (purchaseData.promotionIds !== "") {
                const promotionArray = convertPromotionsToArray(purchaseData.promotionIds);
                if (promotionArray === null) {
                    setError("Invalid Promotion ID");
                    return;
                }
                data.promotionIds = promotionArray;
            }
            // TODO: api call
        } else if (transactionType === "transfer") {
            const parsedAmount = parseInt(transferData.amount);
            const data = {
                username: transferData.username,
                type: transferData.type,
                amount: parsedAmount,
                remark: transferData.remark
            };
            // TODO: api call
            
        } else {
            const parsedAmount = parseInt(redemptionData.amount);
            const data = {
                username: redemptionData.username,
                type: redemptionData.type,
                amount: parsedAmount,
                remark: redemptionData.remark
            };
        }
        console.log(data);
    };

    // processing redemption ID
    const [redemptionId, setRedemptionId] = useState("");

    const handleRedemptionSubmit = (e) => {
        e.preventDefault();
        const parsedId = parseInt(redemptionId);
        console.log(parsedId);
        // TODO: api call

    };

    return <>
        {/* Interface changes depending on user role*/}
        {user ? 
            user.role === "regular" ? <>
            {/* Regular*/}
                <div>
                <h2>Dashboard</h2>
                <p><strong>Points: </strong>{user.points}</p> <br></br>
                <p><strong>Recent Transactions </strong></p>
                {recentTransactions && recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="transaction">
                        <br></br>
                        <p><strong>Transaction {transaction.id}:</strong></p>
                        <p><strong>Type:</strong> {transaction.type}</p>
                        <p><strong>Amount:</strong> ${transaction.amount}</p>
                    </div>
                ))
                ) : (
                    <p>No transactions available.</p>
                )}
                </div>
                <button>Show All Transactions</button>
            </> 
            : user.role === "cashier" ? <>
            {/* Cashier*/}
            <h2>Dashboard</h2>
                <p>Create Transaction</p>
                <div>
                    <label htmlFor="type">Type: </label>
                    <select id="type" name="type" onChange={(e) => setTransactionType(e.target.value)}>
                        <option value="">Select a type</option>
                        <option value="purchase">Purchase</option>
                        <option value="transfer">Transfer</option>
                        <option value="redemption">Redemption</option>
                    </select>
                </div>
                {transactionType === "" ? <></>
                : transactionType === "purchase" ? 
                <form id="transactionForm">
                    <label htmlFor="utorid">UTORid:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder='UTORid'
                        value={purchaseData.username}
                        onChange={handleFormChange}
                        required
                    />
                    <label htmlFor="spent">Spent:</label>
                    <input 
                        type="number"
                        id="spent"
                        name="spent"
                        value={purchaseData.spent}
                        onChange={handleFormChange}
                        min="0.01"
                        step="any"
                        required
                    />
                    <label htmlFor="promotionIds">Enter promotion IDs 
                        <br></br>(space-separated):</label>
                    <input
                        type="text"
                        id="promotionIds"
                        name="promotionIds"
                        value={purchaseData.promotionIds}
                        onChange={handleFormChange}
                    />
                    {/* <label htmlFor="promotions">Promotions: </label>
                    <p>{purchaseData.promotionIds}</p> */}

                    <label htmlFor="remark">Remark:</label>
                    <input
                        type="text"
                        id="remark"
                        name="remark"
                        value={purchaseData.remark}
                        onChange={handleFormChange}
                    />
                    <div className="btn-container">
                        <button type="submit" onClick={handleFormSubmit}>Submit</button>
                    </div>
                </form>

                : transactionType === "transfer" ?
                <form id="transactionForm">
                    <label htmlFor="utorid">UTORid:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder='UTORid'
                        value={transferData.username}
                        onChange={handleFormChange}
                        required
                    />
                    <label htmlFor="amount">Amount:</label>
                    <input 
                        type="number"
                        id="amount"
                        name="amount"
                        value={transferData.amount}
                        onChange={handleFormChange}
                        min="1"
                        required
                    />
                    <label htmlFor="remark">Remark:</label>
                    <input
                        type="text"
                        id="remark"
                        name="remark"
                        value={transferData.remark}
                        onChange={handleFormChange}
                    />
                    <div className="btn-container">
                        <button type="submit" onClick={handleFormSubmit}>Submit</button>
                    </div>
                </form>
                : <form id="transactionForm">
                    <label htmlFor="utorid">UTORid:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder='UTORid'
                        value={redemptionData.username}
                        onChange={handleFormChange}
                        required
                    />
                    <label htmlFor="amount">Amount:</label>
                    <input 
                        type="number"
                        id="amount"
                        name="amount"
                        value={redemptionData.amount}
                        onChange={handleFormChange}
                        min="1"
                        required
                    />
                    <label htmlFor="remark">Remark:</label>
                    <input
                        type="text"
                        id="remark"
                        name="remark"
                        value={redemptionData.remark}
                        onChange={handleFormChange}
                    />
                    <div className="btn-container">
                        <button type="submit" onClick={handleFormSubmit}>Submit</button>
                    </div>
                </form>
                }
                <div>
                    <p>Process Redemption</p>
                    <form>
                        <label htmlFor="redemptionId">Redemption ID: </label>
                        <input 
                            type="number"
                            id="redemptionId"
                            name="redemptionId"
                            value={redemptionId}
                            onChange={(e) => setRedemptionId(e.target.value)}
                        />
                        <div className="btn-container">
                        <button type="submit" onClick={handleRedemptionSubmit}>Submit</button>
                    </div>
                    </form>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </>
            : <>
            {/* Manager/Superuser*/}
                <h2>Dashboard</h2>
                <p>Manage Events</p>
                <p>Manage Promotions</p>
                <p>Manage Users</p>
            </>
        : ( <> {/* Not logged in*/}
            <h1>Welcome to A3!</h1>
            <div className="row">
                <Link to="/login">Login</Link>
            </div>
        </>
        )}
    </>;
}

export default Home;