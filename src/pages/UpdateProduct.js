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
import React from 'react';
import Product from '../services/Product';
import Copyright from './components/Copyright';
import NavBar from './components/NavBar';
import Supplier from '../services/Suppliers';
import Brand from '../services/Brand';
import { useParams } from 'react-router-dom';
import SnackBar from './components/SnackBar';

const defaultTheme = createTheme();

export default function Products() {
  const[message, setMessage] = React.useState("");
  const [name, setName] = React.useState('');
  const [brands, setBrands] = React.useState([]);
  const [brand, setBrand] = React.useState(0);
  const [suppliers, setSuppliers] = React.useState([]);
  const [supplier, setSupplier] = React.useState(0);
  const [purchasedPrice, setPurchasedPrice] = React.useState(0);
  const [sellingPrice, setSellingPrice] = React.useState(0);
  const {id} = useParams();
  
  React.useEffect(()=> {
    loadBrand();
    loadSupplier();
    loadProduct();
  },[])

  const loadProduct = async () => {
    console.log(id)
    await Product.getById(id).then(res => {
      console.log(res.data)
      setName(res.data.name);
      setBrand(res.data.brand);
      setSupplier(res.data.supplier);
      setPurchasedPrice(res.data.purchasedPrice);
      setSellingPrice(res.data.sellingPrice);
    })
  }

  const loadBrand = () => {
    Brand.getAllBrands().then(res => {
      setBrands(res.data);
    })
  }

  const loadSupplier = () => {
    Supplier.getSupplier().then(res => {
      setSuppliers(res.data);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let product = {
      id: id,
      name: data.get("name"),
      brand: data.get("brand"),
      supplier: data.get("supplier"),
      purchasedPrice: data.get("purchasedPrice"),
      sellingPrice: data.get("sellingPrice"),
    };
    console.log(product);
    
    Product.updateProduct(product).then(res => {
      console.log(res.data);
      if(res.status === 200) {
          window.location.href="/main";
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
            {message === 'error' ? <SnackBar type={"error"} message={"Product not updated!"} open={true}/> 
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
              <FormControl fullWidth>
                <InputLabel id="brand">brand</InputLabel>
                <Select
                  label="brand"
                  id="brand"
                  name="brand"
                  value={brand}
                  onChange={(e)=>setBrand(e.target.value)}
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
                  label="supplier"
                  id="supplier"
                  name="supplier"
                  value={supplier}
                  onChange={(e)=>setSupplier(e.target.value)}
                >
                  {
                    suppliers.length > 0 ? (suppliers.map((supp) =>
                      <MenuItem key={supp.id} value={supp.id}>{supp.name}</MenuItem>
                    )) : null
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
                autoFocus
                value={purchasedPrice}
                onChange={(e)=>setPurchasedPrice(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="sellingPrice"
                label="sellingPrice"
                name="sellingPrice"
                autoFocus
                value={sellingPrice}
                onChange={(e)=>setSellingPrice(e.target.value)}
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