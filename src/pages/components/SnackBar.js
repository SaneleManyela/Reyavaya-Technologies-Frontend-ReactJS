import { Alert, Snackbar, Stack } from "@mui/material";
import React from "react";

export default function Notification({type, message, open}) {
    const [isOpen, setOpen] = React.useState(open);
    return (
        <Stack spacing={2}>
            <Snackbar open={isOpen} autoHideDuration={6000} sx={{position: "inherit" }} onClose={()=>{setOpen(false)}}>
                <Alert severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}