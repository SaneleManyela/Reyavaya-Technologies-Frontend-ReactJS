import {
  Button,
  TextField,
  Box,
  Typography,
  Grid, TableRow,
  TableCell,
  Table,
  TableBody
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import NavBar from './components/NavBar';
import React from 'react';
import Copyright from './components/Copyright';
import Avatar from '@mui/material/Avatar';
import Product from '../services/Product';
import { useParams } from 'react-router-dom';
import SnackBar from './components/SnackBar';

const defaultTheme = createTheme();

export default function AddToCart() {
    const[message, setMessage] = React.useState("");
    const {id} = useParams();
    const[product, setProduct] = React.useState("");
    const[sellingPrice, setSellingPrice] = React.useState(0);
    
    React.useEffect(()=> {
      loadProduct();
    })

    const loadProduct = async () => {
      await Product.getById(id).then(res => {
        setProduct(res.data.name);
        setSellingPrice(res.data.sellingPrice);
      })
    }

    const addToCart = (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const item = ({
        product: id,
        qty: data.get("saleQty"),
        total: (sellingPrice*data.get("saleQty"))
      });

      let cart = [];

      if(localStorage.getItem("cart") !== null) {
        cart = JSON.parse(localStorage.getItem("cart"));
        let i = 1;
        cart.map((items)=>{
          if(items.product === item.product) {
            items.qty = (parseInt(items.qty) + parseInt(item.qty));
            items.total = (items.total + item.total);
            
          } 
          
          if(i > cart.length - 1) {
            cart.push(item);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
          i++;
        })
        
      } else {
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      setMessage("success");
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
            Add To Cart
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: '#3186d4' }}>
            <AddShoppingCartIcon />
          </Avatar>
          {message === 'success' ? <SnackBar type={"success"} message={"Item(s) added to cart"} open={true}/> : null}
          <Box component="form" noValidate onSubmit={addToCart} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              disabled={true}
              fullWidth
              id="name"
              label="name"
              name="name"
              value={product}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="saleQty"
              label="saleQty"
              name="saleQty"
              autoFocus
            />
            <Grid item sx={{marginLeft: 8}} justifyContent={"center"} elevation={6}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={(e) => addToCart}
                      >
                        Add To Cart
                      </Button>
                    </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={() => window.location.href="/viewcart"}
                    >
                      Checkout
                    </Button>
                  </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </ThemeProvider>
    )
}