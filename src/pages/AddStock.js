import InventoryIcon from '@mui/icons-material/Inventory';
import { Avatar, Button, Card, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Stocks from '../services/Stock';
import Product from '../services/Product';
import NavBarStock from './components/NavBarStock';
import Copyright from './components/Copyright';
import SnackBar from './components/SnackBar';

const defaultTheme = createTheme();

export default function AddStock() {
    const[message, setMessage] = React.useState("");
    const[products, setProducts] = React.useState([]);
        
    React.useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        Product.getAllProducts().then(res => {
            setProducts(res.data);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let stock = {
            product: data.get("product"),
            qty: data.get("quantity")
        };

        console.log(stock);

        Stocks.createStock(stock).then(res => {
            if(res.status === 200) {
                setMessage("success");
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
                        Create New Stock
                    </Typography>
                    <Avatar sx={{ m: 1, bgcolor: '#3186d4'}}>
                        <InventoryIcon />
                    </Avatar>
                    {message === 'error' ? <SnackBar type={"error"} message={"Adding product stock failed"} open={true}/> 
                        : (message === "success" ? <SnackBar type={"success"} message={"Product stock added successful"} open={true}/> : null)}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <FormControl fullWidth>
                            <InputLabel id="product">products</InputLabel>
                            <Select
                                id="product"
                                name='product'
                                label="product"
                            >
                                {
                                    products.length > 0 ? (products.map((prod) =>
                                        <MenuItem key={prod.id} value={prod.id}>{prod.name}</MenuItem>
                                    )) : null
                                }
                            </Select>
                        </FormControl>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="quantity"
                            name="quantity"
                            label="quantity"
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
    )
}