import { useState } from "react";
import { useDashboard } from "../contexts/DashboardContext";
import {
    Box,
    TextField,
} from "@mui/material";

const ProcessRedemptionModal = () => {
    const { redemptionError, setRedemptionError, processRedemption } = useDashboard();
    const [redemptionId, setRedemptionId] = useState("");

    const handleRedemptionChange = (e) => {
        setRedemptionError(null);
        setRedemptionId(e.target.value); 
    };

    const handleRedemptionSubmit = (e) => {
        e.preventDefault();
        try {
            processRedemption(redemptionId);
        } catch(err) {
            setRedemptionError(err);
        }
    };

    return (
        <Box sx = {{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 450,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            }}>
            <form id="redemptionForm" onSubmit={handleRedemptionSubmit}>
                <label htmlFor="redemptionId">Redemption ID: </label>
                <TextField 
                    type="number"
                    id="redemptionId"
                    name="redemptionId"
                    variant="outlined"
                    value={redemptionId}
                    onChange={handleRedemptionChange}
                    required
                />
                <div className="btn-container">
                    <input type="submit" />
                </div>
            </form>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: "10px"}}>
                {redemptionError && <p style={{ color: 'red'}}>{redemptionError}</p>}
            </div>
        </Box>
    );
};

export default ProcessRedemptionModal;