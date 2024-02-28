import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import Stocks from '../services/Stock';
import Product from '../services/Product';
import NavBarStock from './components/NavBarStock';
import Copyright from './components/Copyright';
import { Update } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function Stock() {
    const[stock, setStock] = React.useState([])
    
    React.useEffect(()=> {
        loadStock();
    }, []);

    const loadStock = () => {
        Stocks.getAllStock().then(res => {
            setStock(res.data);
        })
    };

    const productName = (id) => {
        Product.getById(id).then(res => {
            console.log(res.data.name);
            return res.data.name;
        });
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <NavBarStock />
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>{'Product'}</TableCell>
                        <TableCell>{'Quantity'}</TableCell>
                        <TableCell>{'Restock'}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stock && stock.map((entry) => {
                        return(
                            <TableRow key={entry.id}>
                                <TableCell key={entry.product}>
                                    {(entry.product)}
                                </TableCell>
                                <TableCell>
                                    {entry.qty}
                                </TableCell>
                                <TableCell>
                                    <Link to={`/updatestock/${entry.id}`}>
                                        <Update />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <Copyright />
        </ThemeProvider>
    )
}