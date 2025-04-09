import React from "react";
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
} from "@mui/material";
import { useUser } from "../contexts/UserContext";

function UserCard( {user}) {
    const { currentInterface } = useUser();

    return <>
        <Card variant="outlined" sx={{position: "relative", width: "250px", height: "250px"}}>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {user.name}
                </Typography>
                <Typography variant="body2">
                    {user.utorid}
                </Typography>
                <Typography variant="body2">
                    {user.id}
                </Typography>
            </CardContent>
            {currentInterface === "regular" || currentInterface === "cashier" ? <></> :
                <CardActions sx={{position: "absolute", bottom: "0"}}>
                    <Button size="small" variant="outlined">Edit</Button>
                    <Button size="small" variant="outlined">Delete</Button>
                </CardActions>
            }
        </Card>
    </>;
};

export default UserCard;