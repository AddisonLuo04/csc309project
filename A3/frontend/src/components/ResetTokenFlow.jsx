import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ResetTokenFlow = ({ utoridFromParent, resetTokenFromParent }) => {
    // move the reset token flow to a componenet for reuse from reset password
    // and register
    const { resetPassword, error, setError } = useAuth();
    const navigate = useNavigate();

    const [confirmUtorid, setConfirmUtorid] = useState(utoridFromParent || "");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmResetToken, setConfirmResetToken] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (confirmUtorid !== utoridFromParent) {
            setError("Utorid does not match originally requested utorid.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (confirmResetToken !== resetTokenFromParent) {
            setError("Incorrect reset token.");
            return;
        }

        try {
            await resetPassword(confirmUtorid, newPassword, resetTokenFromParent);
            navigate("/success");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <p className="details">Password must include at least one:</p>
            <p className="details">Uppercase, Lowercase, Number, and Special Character</p>

            <label htmlFor="confirmUtorid">Utorid:</label>
            <input
                type="text"
                id="confirmUtorid"
                placeholder="UTORid"
                value={confirmUtorid}
                onChange={(e) => setConfirmUtorid(e.target.value)}
                required
            />

            <label htmlFor="newPassword">New Password:</label>
            <input
                type="password"
                id="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />

            <label htmlFor="confirmResetToken">Verify Reset Token:</label>
            <input
                type="text"
                id="confirmResetToken"
                placeholder="Reset Token"
                value={confirmResetToken}
                onChange={(e) => setConfirmResetToken(e.target.value)}
                required
            />

            <div className="btn-container">
                <button type="submit">Reset Password</button>
            </div>
            <p className="error">{error}</p>
        </form>
    );
};

export default ResetTokenFlow;
