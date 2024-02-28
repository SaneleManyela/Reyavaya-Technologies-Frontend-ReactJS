import { CheckRounded, Delete, Update } from '@mui/icons-material';
import { Avatar, Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Copyright from './components/Copyright';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from './components/NavBar';

const defaultTheme = createTheme();

export default function ViewCart() {
    const[cart, setCart] = React.useState(JSON.parse(localStorage.getItem("cart")));
    
    const handleRemove = (e, id) => {
        e.preventDefault();
        console.log(id)
        let cartList = [];

        cart.map((items) => {
            if(items.product !== id) {
                cartList.push(items)
            }
        })
        console.log(cartList)
        setCart(cartList);
        localStorage.setItem("cart", JSON.stringify(cartList))
    }

    return(
        <ThemeProvider theme={defaultTheme}>
            <NavBar />
            <Box sx={{direction: 'rtl', paddingTop:'5px', paddingRight: '20px'}}>
            <Avatar sx={{ backgroundColor: "green"}} title='Checkout'>
                    <Link to={`/transact`}>
                        <CheckRounded />
                    </Link>
                </Avatar>
            </Box>
            {console.log(cart)}        
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>{'Product'}</TableCell>
                        <TableCell>{'Quantity'}</TableCell>
                        <TableCell>{'Total'}</TableCell>
                        <TableCell>{'Update'}</TableCell>
                        <TableCell>{'Remove'}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart && cart.map((item) =>{
                        return(
                            <TableRow key={item.product}>
                                <TableCell key={item.product}>{item.product}</TableCell>
                                <TableCell key={item.qty+"-"+item.product}>{item.qty}</TableCell>
                                <TableCell key={item.total}>{item.total}</TableCell>
                                <TableCell>
                                    <Link onClick={(e)=>handleRemove(e, item.product)} to={`/addtocart/${item.product}`}>
                                        <Update />
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Delete onClick={(e)=>handleRemove(e, item.product)}/>
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