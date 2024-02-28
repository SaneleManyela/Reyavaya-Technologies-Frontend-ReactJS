import { AddCircle } from "@mui/icons-material";
import { 
    Avatar,
    Box,
    Button,
    TextField,
    Typography
 } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material";
import Suppliers from "../services/Suppliers";
import NavBar from "./components/NavBar";
import React from 'react';
import Copyright from './components/Copyright';
import SnackBar from './components/SnackBar';

const defaultTheme = createTheme();

export default function Supplier() {
    const[message, setMessage] = React.useState("");
    const [emailVaid, setEmailValid] = React.useState('');
  
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let supplier = {
            name: data.get("name"),
            address: data.get("address"),
            contactNo: data.get("contactNo"),
            email: data.get("email")
        }

        Suppliers.createSupplier(supplier).then(res => {
            if(res.status === 200) {
                setMessage("success");
            } else {
                setMessage("error");
            }
        })
    }

    return (
      <ThemeProvider theme={defaultTheme}>
        <NavBar/>
        <Box
          sx={{
            width: "75%",
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Supplier
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: '#3186d4' }}>
            <AddCircle />
          </Avatar>
          {message === 'error' ? <SnackBar type={"error"} message={"Supplier not added!"} open={true}/> 
                        : (message === "success" ? <SnackBar type={"success"} message={"Supplier added!"} open={true}/> : null)}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="address"
              label="address"
              id="address"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="contactNo"
              label="contactNo"
              name="contactNo"
            />
            {emailVaid}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              onMouseOut={(e)=>{setEmailValid(e.target.value)}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleSubmit}
            >
              Save
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </ThemeProvider>
    )
 }