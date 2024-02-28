import { Avatar, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import NavBar from './components/NavBar';
import React from 'react';
import { Add, Update } from '@mui/icons-material';
import Suppliers from '../services/Suppliers';
import Copyright from './components/Copyright';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function ViewSupplier() {
    const [supplier, setSupplier] = React.useState([]);
      
    React.useEffect(()=>{
        loadSuppliers()
    },[]);

    const loadSuppliers = () => {
        Suppliers.getSupplier().then(res => {
            console.log(res.data)
            setSupplier(res.data);
        })
    }

    return(
        <ThemeProvider theme={defaultTheme}>
            <NavBar />
            <Box sx={{direction: 'rtl', paddingTop:'5px', paddingRight: '20px'}}>
                <Avatar>
                    <Link to={`/supplier`}>
                        <Add />
                    </Link>
                </Avatar>
            </Box>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>{'Id'}</TableCell>
                        <TableCell>{'Name'}</TableCell>
                        <TableCell>{'Address'}</TableCell>
                        <TableCell>{'Contact No'}</TableCell>
                        <TableCell>{'Email'}</TableCell>
                        <TableCell>{'Action'}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {supplier && supplier.map((supp) =>{
                        return(
                            <TableRow key={supp.id}>
                                <TableCell key={supp.id}>{supp.id}</TableCell>
                                <TableCell key={supp.name}>{supp.name}</TableCell>
                                <TableCell key={supp.address}>{supp.address}</TableCell>
                                <TableCell key={supp.contactNo}>{supp.contactNo}</TableCell>
                                <TableCell key={supp.email}>{supp.email}</TableCell>
                                <TableCell>
                                    <Link to={`/supplier/${supp.id}`}>
                                        <Update />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <Copyright sx={{ mt: 5 }} />
        </ThemeProvider>
    )
}