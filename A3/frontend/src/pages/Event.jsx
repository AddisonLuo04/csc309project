import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { Button, Modal } from "@mui/material";
import { useEvent } from "../contexts/EventContext";
import CreateEventModal from "../components/CreateEventModal";


import { useState } from "react";

function Event () {
    const { currentInterface } = useUser();
    const { setCreateMessage } = useEvent();

    const [openCreate, setOpenCreate] = useState(false);
    const handleOpenCreate = () => setOpenCreate(true);
    const handleCloseCreate = () => { setCreateMessage(null); setOpenCreate(false); }



    return <>
        {currentInterface === "regular" || currentInterface === "cashier" ? <>
            <div>cas/reg</div>
        </>
        : <>
            <Button variant="outlined" onClick={handleOpenCreate}>Create Event</Button>
            <Modal open={openCreate} onClose={handleCloseCreate}>
                <CreateEventModal />
            </Modal>
        </>
        }
    </>;
};

export default Event;