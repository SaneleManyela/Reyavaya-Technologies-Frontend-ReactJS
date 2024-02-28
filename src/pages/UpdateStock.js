import InventoryIcon from '@mui/icons-material/Inventory';
import { Avatar, Button, Card } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import Stocks from '../services/Stock';
import NavBarStock from './components/NavBarStock';
import Copyright from './components/Copyright';
import { useParams } from 'react-router-dom';
import SnackBar from './components/SnackBar';

const defaultTheme = createTheme();

export default function AddStock() {
    const[message, setMessage] = React.useState("");
    const[quantity, setQuantity] = React.useState(0);
    const {id} = useParams();

    React.useEffect(()=> {
        loadStock();
    }, []);

    const loadStock = () => {
        Stocks.getStockById(id).then(res => {
            setQuantity(res.data.qty);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let stock = {
            id: id,
            qty: data.get("quantity")
        };
        Stocks.updateStock(stock).then(res => {
            if(res.status === 200) {
                window.location.href="/stock"
            } else {
                setMessage("error");
            }
        });
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <NavBarStock />
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
                    <Typography component={"h1"} variant='h5'>
                        Update Stock
                    </Typography>
                    <Avatar sx={{ m: 1, bgcolor: '#3186d4'}}>
                        <InventoryIcon />
                    </Avatar>
                    {message === 'error' ? <SnackBar type={"error"} message={"Updating product stock failed"} open={true}/> 
                        : null}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="quantity"
                            label="quantity"
                            name="quantity"
                            autoFocus
                            value={quantity}
                            onChange={(e)=>setQuantity(e.target.value)}
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
    )
}