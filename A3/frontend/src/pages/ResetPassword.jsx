import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./form.css";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
    const { requestPasswordReset, resetPassword, error, clearError, setError } = useAuth();
    const [utorid, setUtorid] = useState("");
    const [resetToken, setResetToken] = useState(null);
    const [showResetForm, setShowResetForm] = useState(false);
    const [confirmUtorid, setConfirmUtorid] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmResetToken, setConfirmResetToken] = useState("");
    const navigate = useNavigate();

    // on mount, clear the error
    useEffect(() => {
        clearError();
    }, []);

    // step 1: request the reset token
    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await requestPasswordReset(utorid);
            // backend will give back a reset token
            setResetToken(token);
            // also set the confirm Utorid for the reset submit
            setConfirmUtorid(utorid);
        } catch (err) {
            console.error(err);
        }
    };

    // button to switch to the password reset form
    const handleProceed = () => {
        setShowResetForm(true);
    };

    // step 2: reset the password using the token
    const handleResetSubmit = async (e) => {
        e.preventDefault();
        if (utorid !== confirmUtorid) {
            setError("Utorid does not match originally requested utorid.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (resetToken !== confirmResetToken) {
            setError("Incorrect Reset Token.");
            return;
        }
        try {
            await resetPassword(utorid, newPassword, resetToken);
            // redirect user to the success page
            navigate('/success')
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <h2>Reset Password</h2>
            {/* Step 1: Request Reset Token */}
            {!resetToken && !showResetForm && (
                <form onSubmit={handleRequestSubmit}>
                    <label htmlFor="utorid">UTORid:</label>
                    <input
                        type="text"
                        id="utorid"
                        name="utorid"
                        placeholder="utorid"
                        value={utorid}
                        onChange={(e) => setUtorid(e.target.value)}
                        required
                    />
                    <div className="btn-container">
                        <button type="submit">Request Password Reset</button>
                    </div>
                    <p className="error">{error}</p>
                </form>
            )}

            {/* Step 1b: Display the reset token and proceed button */}
            {resetToken && !showResetForm && (
                <>
                    <div>
                        <p>
                            Your reset token is: <strong>{resetToken}</strong>
                        </p>
                    </div>
                    <div>
                        <p>
                            Please copy and paste the reset token in the next page.
                        </p>
                    </div>
                    <div className="btn-container">
                        <button onClick={handleProceed}>
                            Proceed to Reset Your Password
                        </button>
                    </div>
                </>
            )}

            {/* Step 2: Reset password form */}
            {showResetForm && (
                <form onSubmit={handleResetSubmit}>
                    <p className="details">Password must include at least 1:</p>
                    <p className="details"> Uppercase, Lowercase, Number, and Special Character</p>

                    <label htmlFor="confirmUtorid">Utorid:</label>
                    <input
                        type="text"
                        id="confirmUtorid"
                        name="confirmUtorid"
                        placeholder="Utorid"
                        value={confirmUtorid}
                        onChange={(e) => setConfirmUtorid(e.target.value)}
                        required
                    />
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="confirmResetToken">Verify Reset Token:</label>
                    <input
                        type="text"
                        id="confirmResetToken"
                        name="confirmResetToken"
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
            )}
        </>
    );
}

export default ResetPassword;