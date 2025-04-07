import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    Typography,
} from "@mui/material";
import { useUser } from "../contexts/UserContext";

const EditProfileDialog = ({ open, onClose }) => {
    const { user, updateProfile, error, setError } = useUser();
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
    });

    // populate form fields with current user data when available
    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || "",
                email: user.email || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setProfileData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // create a new object where empty strings are converted to undefined
        const cleanedData = Object.fromEntries(
            Object.entries(profileData).map(([key, value]) => [key, value === "" ? undefined : value])
        );

        try {
            await updateProfile(cleanedData);
            onClose(); // Close the dialog on success
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}
            fullWidth
            maxWidth="sm">
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={profileData.name}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={profileData.email}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                    <DialogActions sx={{ px: 0, mt: 2, justifyContent: 'center' }}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfileDialog;
