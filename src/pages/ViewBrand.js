import { Avatar, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import NavBar from './components/NavBar';
import Brand from '../services/Brand';
import React from 'react';
import { Add, Update } from '@mui/icons-material';
import Copyright from './components/Copyright';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function Brands() {
    const [brands, setBrands] = React.useState([]);

    React.useEffect(()=>{
        loadBrands();
    },[]);

    const loadBrands = () => {
        Brand.getAllBrands().then(res => {
            setBrands(res.data);
        });
    }

    return(
        <ThemeProvider theme={defaultTheme}>
            <NavBar />
            <Box sx={{direction: 'rtl', paddingTop:'5px', paddingRight: '20px'}}>
                <Avatar>
                    <Link to={`/brand`}>
                        <Add />
                    </Link>
                </Avatar>
            </Box>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>{'ID'}</TableCell>
                        <TableCell>{'Name'}</TableCell>
                        <TableCell>{'PhasedOut'}</TableCell>
                        <TableCell>{'Action'}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {brands && brands.map((brand) =>{
                        return(
                            <TableRow key={brand.id}>
                                <TableCell key={brand.id}>{brand.id}</TableCell>
                                <TableCell key={brand.name}>{brand.name}</TableCell>
                                <TableCell key={brand.phasedOut}>{brand.phasedOut}</TableCell>
                                <TableCell>
                                    <Link to={`/updateBrand/${brand.id}`}>
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
