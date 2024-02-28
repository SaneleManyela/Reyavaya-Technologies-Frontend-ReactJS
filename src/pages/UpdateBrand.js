import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Card } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import Brand from '../services/Brand';
import Copyright from './components/Copyright';
import NavBar from './components/NavBar';
import SnackBar from './components/SnackBar';
import { useParams } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Brands() {
    const[message, setMessage] = React.useState("");
    const [name, setName] = React.useState('');
    const [phasedOut, setPhasedOut] = React.useState('');
    const {id} = useParams();

    React.useEffect(()=> {
        loadBrand();
    },[])

    const loadBrand= async () => {
        await Brand.getById(id).then(res => {
            setName(res.data.name);
            setPhasedOut(res.data.phasedOut);
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let brand = {
            id: id,
            name: data.get("name"),
            phasedOut: data.get("phasedOut")
        };
        console.log(brand);

        Brand.findBrandByName(brand).then(res => {
            if(res.status === 200 && res.data.id !== brand.id) {
                setMessage("warning");
            } else {
                Brand.updateBrand(brand).then(res => {
                    console.log(res.data);
                    if(res.status === 200) {
                        window.location.href="/viewBrand"
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
                  {message === 'error' ? <SnackBar type={"error"} message={"Brand not updated!"} open={true}/> 
                    : message === 'warning' ? <SnackBar type={"warning"} message={"brand name exists"} open={true}/> : null }
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
                    <FormControl fullWidth>
                        <InputLabel id="phasedOut">PhasedOut?</InputLabel>
                        <Select
                            label="phasedOut?"
                            id="phasedOut"
                            name="phasedOut"
                            value={phasedOut}
                            onChange={(e)=>setPhasedOut(e.target.value)}
                        >
                            <MenuItem key={"no"} value={"no"}>{"no"}</MenuItem>
                            <MenuItem key={"yes"} value={"yes"}>{"yes"}</MenuItem>
                        </Select>
                    </FormControl>
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