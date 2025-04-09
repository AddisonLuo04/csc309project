import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
} from "@mui/material";
import { useUser } from "../contexts/UserContext";
import EditUserDialog from "./EditUserDialog";

function UserCard() {
    const { currentInterface, singleUser } = useUser();
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const rolesOrder = {
        regular: 1,
        cashier: 2,
        manager: 3,
        superuser: 4,
    };

    // you can only edit if you have a strictly higher privilege than the 
    // target user, and you are in at least the manager interface
    const canEdit = (rolesOrder[currentInterface] > rolesOrder[singleUser.role]) &&
        (rolesOrder[currentInterface] >= rolesOrder["manager"]);

    return <>
        <Card variant="outlined" sx={{ position: "relative", width: "250px", height: "250px" }}>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    UTORID: {singleUser.utorid}
                </Typography>
                <Typography variant="body2">
                    Name: {singleUser.name}
                </Typography>
                <Typography variant="body2">
                    Email: {singleUser.email}
                </Typography>
            </CardContent>
            {canEdit && (
                <CardActions sx={{ position: "absolute", bottom: "0" }}>
                    <Button size="small" variant="outlined" onClick={() => setEditDialogOpen(true)}>
                        Edit
                    </Button>
                </CardActions>
            )}
        </Card>
        {editDialogOpen && (
            <EditUserDialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
            />
        )}
    </>;
};

export default UserCard;