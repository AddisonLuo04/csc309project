import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { Button, Modal, Typography } from "@mui/material";
import { useEvent } from "../contexts/EventContext";
import CreateEventModal from "../components/CreateEventModal";


import { useState } from "react";
import PaginatedTable from "../components/PaginatedTable";

function Event () {
    const { currentInterface } = useUser();
    const { setCreateMessage, getEvents, error } = useEvent();

    const [openCreate, setOpenCreate] = useState(false);
    const handleOpenCreate = () => setOpenCreate(true);
    const handleCloseCreate = () => { 
        setCreateMessage(null); 
        setOpenCreate(false); 
        setInitialParams(prev => ({...prev, page: 1}));
    }

    const [initialParams, setInitialParams] = useState({ page: 1, limit: 10 });

    const columns = [
        { field: 'name', headerName: 'Name' },
        { field: 'location', headerName: 'Location' },
        { field: 'startTime', headerName: 'Start Time' },
        { field: 'endTime', headerName: 'End Time'},
        { field: 'capacity', headerName: 'Capacity', renderCell: (value) => value.capacity ? value.capacity : 'None'},
    ];

    const filtersConfig = [
        { field: 'name', label: 'Name', type: 'text' }, 
        { field: 'location', label: 'Location', type: 'text' }, 
        { field: 'started', label: 'Started', type: 'boolean' },
        { field: 'ended', label: 'Ended', type: 'boolean' },
        { field: 'showFull', label: 'Full', type: 'select', options: ['true', 'false'] },
    ];

    return <>
        {currentInterface === "regular" || currentInterface === "cashier" ? <>
            <PaginatedTable 
            fetchData={getEvents}
            columns={columns}
            filtersConfig={filtersConfig}
            initialParams={{published: true, page: 1, limit: 10}}
            />
            {error && <Typography variant="body2" sx={{color: "red"}}>{error}</Typography>}
        </>
        : <>
            <PaginatedTable 
                fetchData={getEvents}
                columns={columns}
                filtersConfig={filtersConfig}
                initialParams={initialParams}
                />
                {error && <Typography variant="body2" sx={{color: "red"}}>{error}</Typography>}
            <Button variant="outlined" onClick={handleOpenCreate}>Create Event</Button>
            <Modal open={openCreate} onClose={handleCloseCreate}>
                <CreateEventModal />
            </Modal>
        </>
        }
    </>;
};

export default Event;