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

    return <>
        <Card variant="outlined" sx={{ position: "relative", width: "250px", height: "250px" }}>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {singleUser.name}
                </Typography>
                <Typography variant="body2">
                    UTORid: {singleUser.utorid}
                </Typography>
                <Typography variant="body2">
                    {singleUser.id}
                </Typography>
            </CardContent>
            {currentInterface === "regular" || currentInterface === "cashier" ? <></> :
                <CardActions sx={{ position: "absolute", bottom: "0" }}>
                    <Button size="small" variant="outlined" onClick={() => setEditDialogOpen(true)}>Edit</Button>
                    <Button size="small" variant="outlined">Delete</Button>
                </CardActions>
            }
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