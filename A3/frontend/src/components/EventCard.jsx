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

function EventCard( {event}) {
    const { currentInterface } = useUser();

    const navigate = useNavigate();



    return <>
        <Card variant="outlined" sx={{position: "relative", width: "300px", height: "350px"}}>
            <CardContent sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
                <Typography gutterBottom variant="h6" component="div">
                    Event {event.id}: {event.name}
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

export default EventCard;