const NotFound = ({ type = "notfound" }) => {
    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            {type === "unauthorized" ? (
                <>
                    <h2>403 - Unauthorized</h2>
                    <p>You must be logged in to view this page.</p>
                </>
            ) : (
                <>
                    <h2>404 - Page Not Found</h2>
                    <p>The page you're looking for doesn't exist.</p>
                </>
            )}
        </div>
    );
};

export default NotFound;
