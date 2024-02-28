import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Card } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Product from '../services/Product';
import Copyright from './components/Copyright';
import NavBar from './components/NavBar';
import Supplier from '../services/Suppliers';
import Brand from '../services/Brand';
import SnackBar from './components/SnackBar';

const defaultTheme = createTheme();

export default function Products() {
  const[message, setMessage] = React.useState("");
  const [suppliers, setSuppliers] = React.useState([]);
  const [brands, setBrands] = React.useState([]);

  React.useEffect(()=> {
    loadSupplier();
    loadBrands();
  },[]);

  const loadSupplier = () => {
    Supplier.getSupplier().then(res => {
      setSuppliers(res.data);
    });
  }

  const loadBrands = () => {
    Brand.getAllBrands().then(res => {
      setBrands(res.data);
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let product = {
      name: data.get("name"),
      brand: data.get("brand"),
      supplier: data.get("supplier"),
      purchasedPrice: data.get("purchasedPrice"),
      sellingPrice: data.get("sellingPrice")
    };
    console.log(product);
    
    Product.createProduct(product).then(res => {
      console.log(res.data);
      if(res.status === 200) {
        setMessage("success")
      } else {
        setMessage("error");
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
                Product
              </Typography>
              <Avatar sx={{ m: 1, bgcolor: '#3186d4' }}>
                <LocalMallIcon />
              </Avatar>
              {message === "error" ? <SnackBar type={"error"} message={"Product not added"} open={true}/> : 
              message === "success" ? <SnackBar type={"success"} message={"Product added"} open={true}/> : null}
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required={true}
                  fullWidth
                  id="name"
                  label="name"
                  name="name"
                  autoFocus
                />
                <FormControl fullWidth>
                  <InputLabel id="brand">brand</InputLabel>
                  <Select
                    id="brand"
                    label="brand"
                    name="brand"
                    >
                    {
                      brands.length > 0 ? (brands.map((brand) =>
                      <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>)) : null
                    }
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{mt: 1}}>
                  <InputLabel id="supplier">supplier</InputLabel>
                  <Select
                    id="supplier"
                    label="supplier"
                    name="supplier"
                    >
                    {
                      suppliers.length > 0 ? (suppliers.map((supp) =>
                      <MenuItem key={supp.id} value={supp.id}>{supp.name}</MenuItem>)) : null
                    }
                  </Select>
                </FormControl>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="purchasedPrice"
                  label="purchasedPrice"
                  name="purchasedPrice"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="sellingPrice"
                  label="sellingPrice"
                  name="sellingPrice"
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