import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { Button, Modal } from "@mui/material";
import { usePromotion } from "../contexts/PromotionContext";
import CreatePromotionModal from "../components/CreatePromotionModal";
import { useState } from "react";

function Promotion () {
    const { currentInterface } = useUser();
    const { createMessage, setCreateMessage } = usePromotion();

    const [openCreate, setOpenCreate] = useState(false);
    const handleOpenCreate = () => setOpenCreate(true);
    const handleCloseCreate = () => { setCreateMessage(null); setOpenCreate(false); }



    return <>
        {currentInterface === "regular" || currentInterface === "cashier" ? <>
            <div>cas/reg</div>
        </>
        : <>
            <Button variant="outlined" onClick={handleOpenCreate}>Create Promotion</Button>
            <Modal open={openCreate} onClose={handleCloseCreate}>
                <CreatePromotionModal />
            </Modal>
        </>
        }
    </>;
};

export default Promotion;