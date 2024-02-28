import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Card } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Brand from '../services/Brand';
import Copyright from './components/Copyright';
import NavBar from './components/NavBar';
import SnackBar from './components/SnackBar';

const defaultTheme = createTheme();

export default function Brands() {
    const[message, setMessage] = React.useState("");
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let brand = {
            name: data.get("name"),
            phasedOut: "no"
        };
        console.log(brand);

        Brand.findBrandByName(brand).then(res => {
            if(res.status === 200 && res.data !== "") {
                setMessage("warning");
            } else {
                Brand.createBrand(brand).then(res => {
                    console.log(res.data);
                    if(res.status === 200) {
                        setMessage("success")
                    } else {
                        setMessage("error");
                    }
                })
            }
        })
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <NavBar />
            <Grid item xs={12} sm={8} justifyContent={"center"} component={Card} elevation={6} square>
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
                    Brand
                  </Typography>
                  <Avatar sx={{ m: 1, bgcolor: '#3186d4' }}>
                    <LocalMallIcon />
                  </Avatar>
                  {message === "warning" ? <SnackBar type={"warning"} message={"brand name exists"} open={true}/>
                    : message === "success" ? <SnackBar type={"success"} message={"Brand added"} open={true}/> 
                    : message === "error" ? <SnackBar type={"error"} message={"Brand not added"} open={true}/>
                    : null  
                  }
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
            </Grid>
        </ThemeProvider>
    );
}