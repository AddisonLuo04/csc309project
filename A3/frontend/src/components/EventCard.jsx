import React from "react";
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    Modal,
    Box
} from "@mui/material";
import { useUser } from "../contexts/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditEventDialog from "./EditEventDialog";
import { useEvent } from "../contexts/EventContext";
import RsvpEventDialog from "./RsvpEventDialog";
import DeleteEventDialog from "./DeleteEventDialog";
import UpdateEventDialog from "./UpdateEventDialog";
import ManageGuestDialog from "./ManageGuestDialog";
import ManageOrganizerDialog from "./ManageOrganizerDialog";

function EventCard({ event }) {
    const { currentInterface, user } = useUser();
    const { setUpdateMessage } = useEvent();
    const [rsvpDialogOpen, setRsvpDialogOpen] = useState(false);
    const [unrsvpDialogOpen, setUnRsvpDialogOpen] = useState(false);
    // edit + delete for managers
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    // update for event organizers
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

    // manage guests/organizers
    const [manageGuestOpen, setManageGuestOpen] = useState(false);
    const [manageOrganizerOpen, setManageOrganizerOpen] = useState(false);

    const navigate = useNavigate();

    const rolesOrder = {
        regular: 1,
        cashier: 2,
        manager: 3,
        superuser: 4,
    };

    // you can only edit if you have a strictly higher privilege than the 
    // target user, and you are in at least the manager interface
    const canEdit = rolesOrder[currentInterface] >= rolesOrder["manager"];

    // can only edit this event if the current user is an organizer for this event
    const isEventOrganizer = currentInterface === 'event organizer' &&
        user?.eventsAsOrganizer?.some((e) => e.id === event.id);

    const isGuest = user?.eventsAsGuest?.some((e) => e.id === event.id);

    return <>
        <Card variant="outlined" sx={{
            width: 400,
            height: 350,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 1
        }}>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    Event {event.id}: {event.name}
                </Typography>
                <Typography variant="body2">{event.description}</Typography>
                <Typography variant="body2">Location: {event.location}</Typography>
            </CardContent>
            <CardActions sx={{ flexWrap: "wrap", rowGap: 1, justifyContent: "center" }}>
                {isGuest && (
                    <Button size="small" variant="outlined" onClick={() => setUnRsvpDialogOpen(true)}>
                        Remove RSVP
                    </Button>
                )}
                {!isGuest && (
                    <Button size="small" variant="outlined" onClick={() => setRsvpDialogOpen(true)}>
                        RSVP
                    </Button>
                )}
                {canEdit && (<>
                    <Button size="small" variant="outlined" onClick={() => setEditDialogOpen(true)}>
                        Edit
                    </Button>
                    <Button size="small" variant="outlined" onClick={() => setDeleteDialogOpen(true)}>
                        Delete
                    </Button>
                    <Button size="small" variant="outlined" onClick={() => setManageOrganizerOpen(true)}>
                        Manage Organizers
                    </Button>
                    <Button size="small" variant="outlined" onClick={() => setManageGuestOpen(true)}>
                        Manage Guests
                    </Button>
                </>
                )}
                {isEventOrganizer && (<>
                    <Button size="small" variant="outlined" onClick={() => setUpdateDialogOpen(true)}>
                        Update Info
                    </Button>
                </>
                )}
            </CardActions>
        </Card>

        {unrsvpDialogOpen && (
            <RsvpEventDialog
                open={unrsvpDialogOpen}
                onClose={() => setUnRsvpDialogOpen(false)}
            />
        )}
        {rsvpDialogOpen && (
            <RsvpEventDialog
                open={rsvpDialogOpen}
                onClose={() => setRsvpDialogOpen(false)}
            />
        )}
        {editDialogOpen && (
            <EditEventDialog
                open={editDialogOpen}
                onClose={() => {
                    setUpdateMessage(null);
                    setEditDialogOpen(false);
                }}
            />
        )}
        {deleteDialogOpen && (
            <DeleteEventDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            />
        )}
        {updateDialogOpen && (
            <UpdateEventDialog
                open={updateDialogOpen}
                onClose={() => {
                    setUpdateMessage(null);
                    setUpdateDialogOpen(false);
                }}
            />
        )}
        {manageGuestOpen && (
            <ManageGuestDialog
                open={manageGuestOpen}
                onClose={() => setManageGuestOpen(false)}
            />
        )}
        {manageOrganizerOpen && (
            <ManageOrganizerDialog
                open={manageOrganizerOpen}
                onClose={() => setManageOrganizerOpen(false)}
            />
        )}
    </>;
};

export default EventCard;