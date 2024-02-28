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
import { useParams } from 'react-router-dom';
import SnackBar from './components/SnackBar';

const defaultTheme = createTheme();

export default function UpdateSupplier() {
    const[message, setMessage] = React.useState("");
    const[name, setName] = React.useState("");
    const[address, setAddress] = React.useState("");
    const[contactNo, setContactNo] = React.useState("");
    const[email, setEmail] = React.useState("");
    const [emailVaid, setEmailValid] = React.useState('');
    const {id} = useParams();

    React.useEffect(()=> {
        loadSupplier();
    }, []);

    const loadSupplier = async () => {
        await Suppliers.getById(id).then(res => {
            setName(res.data.name);
            setAddress(res.data.address);
            setContactNo(res.data.contactNo);
            setEmail(res.data.email);
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let supplier = {
            id: id,
            name: data.get("name"),
            address: data.get("address"),
            contactNo: data.get("contactNo"),
            email: data.get("email")
        }

        Suppliers.updateSupplier(supplier).then(res => {
            if(res.status === 200) {
                window.location.href="/suppliers";
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
            {message === 'error' ? <SnackBar type={"error"} message={"Supplier not updated!"} open={true}/> 
                  : null}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="name"
                name="name"
                autoFocus
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="address"
                label="address"
                id="address"
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="contactNo"
                label="contactNo"
                name="contactNo"
                value={contactNo}
                onChange={(e)=>setContactNo(e.target.value)}
              />
              {emailVaid}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="email"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
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