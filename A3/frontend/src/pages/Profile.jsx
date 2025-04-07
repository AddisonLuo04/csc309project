import React, { useState } from "react";
import ProfileCard from "../components/ProfileCard";
import EditProfileDialog from "../components/EditProfileDialog";
import { useUser } from "../contexts/UserContext";

function Profile() {
    const { user, setError, avatarSrc } = useUser();
    const [editOpen, setEditOpen] = useState(false);

    return (<>
        <h2>Profile</h2>
        <div style={{ padding: "2px" }}>
            <ProfileCard user={user} onEdit={() => setEditOpen(true)} avatarSrc={avatarSrc} />
            {editOpen && (
                <EditProfileDialog open={editOpen} onClose={() => {
                    setError(null);
                    setEditOpen(false);
                }} avatarSrc={avatarSrc} />
            )}
        </div>
    </>
    );
}

export default Profile;
