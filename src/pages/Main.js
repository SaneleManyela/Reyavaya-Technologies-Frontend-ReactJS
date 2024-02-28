import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import NavBar from './components/NavBar';
import Product from '../services/Product';
import React from 'react';
import { Update } from '@mui/icons-material';
import Copyright from './components/Copyright';
import Brand from '../services/Brand';
import Suppliers from '../services/Suppliers';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function Main() {
    const [product, setProduct] = React.useState([]);
    
    React.useEffect(()=>{
        loadProducts();
    },[]);

    const loadProducts = () => {
        Product.getAllProducts().then(res => {
            setProduct(res.data);
        });
    }

    const brand = (id) => {
        Brand.getById(id).then(res => {
            return res.data.name;
        })
    }

    const supplier = (id) => {
        Suppliers.getById(id).then(res => {
            console.log(res.data.name);
            return res.data.name;
        });
    }

    return(
        <ThemeProvider theme={defaultTheme}>
            {console.log(JSON.parse(localStorage.getItem("user")))}
            <NavBar />
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>{'ID'}</TableCell>
                        <TableCell>{'Name'}</TableCell>
                        <TableCell>{'Brand'}</TableCell>
                        <TableCell>{'Supplier'}</TableCell>
                        <TableCell>{'Purchased Price'}</TableCell>
                        <TableCell>{'Selling Price'}</TableCell>
                        <TableCell>{'Action'}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {product && product.map((prod) =>{
                        return(
                            <TableRow key={prod.id}>
                                <TableCell key={prod.id}>{prod.id}</TableCell>
                                <TableCell key={prod.name}>{prod.name}</TableCell>
                                <TableCell key={prod.brand}>{prod.brand}</TableCell>
                                <TableCell key={prod.supplier}>{(prod.supplier)}</TableCell>
                                <TableCell key={prod.purchasedPrice}>{prod.purchasedPrice}</TableCell>
                                <TableCell key={prod.sellingPrice}>{prod.sellingPrice}</TableCell>
                                <TableCell>
                                    <Link to={`/addtocart/${prod.id}`}>
                                        <AddShoppingCartIcon />
                                    </Link>
                                    <Link to={`/product/${prod.id}`}>
                                        <Update />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <Copyright xs={{ mt: 5 }}/>
        </ThemeProvider>
    )
}