import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Modal, Button, Box} from "@mui/material";
import { useState } from "react";
import CreateRedemptionModal from "../components/CreateRedemptionModal";
import CreateTransferModal from "../components/CreateTransferModal";
import { useTransaction } from "../contexts/TransactionContext";

function Transaction() {
    const { user } = useAuth();
    const { currentInterface } = useUser();
    const { setTransferMessage, setRedemptionMessage } = useTransaction();

    const [searchParams, setSearchParams] = useSearchParams();

    const [openTransfer, setOpenTransfer] = useState(false);
    const handleOpenTransfer = () => setOpenTransfer(true);
    const handleCloseTransfer = () => { setTransferMessage(null); setOpenTransfer(false); }

    const [openRedemption, setOpenRedemption] = useState(false);
    const handleOpenRedemption = () => setOpenRedemption(true);
    const handleCloseRedemption = () => { setRedemptionMessage(null); setOpenRedemption(false); }
    

    return <>
        {currentInterface === "regular" || currentInterface === "cashier" ? <>
            <Button variant="outlined" onClick={handleOpenTransfer}>Make a Transfer</Button>
            <Modal open={openTransfer} onClose={handleCloseTransfer}>
                <CreateTransferModal />
            </Modal>
            <Button variant="outlined" onClick={handleOpenRedemption}>Make a Redemption</Button>
            <Modal open={openRedemption} onClose={handleCloseRedemption}>
                <CreateRedemptionModal />
            </Modal>
        </>
        : <>

            <div>man/sup</div>
        </>
        }
    </>;
}

export default Transaction;