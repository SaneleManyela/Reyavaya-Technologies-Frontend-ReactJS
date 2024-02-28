import { 
    Button, 
    TextField,
    Box,
    Typography,
    Grid,
    TableRow,
    TableCell
 } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import NavBar from './components/NavBar';
import React from 'react';
import Copyright from './components/Copyright';
import Avatar from '@mui/material/Avatar';
import Transaction from '../services/Transact';
import Product from '../services/Product';
import { useParams } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Transact() {
    const[message, setMessage] = React.useState("");
    const {id} = useParams();
    const[product, setProduct] = React.useState("");
    const[supplier, setSupplier] = React.useState(0);
    const[sellingPrice, setSellingPrice] = React.useState(0);
    const[soldQty, setSoldQty] = React.useState(1);
    const[employee] = React.useState(JSON.parse(localStorage.getItem("user")));

    React.useEffect(()=> {
      loadProduct();
    },[])

    const loadProduct = async () => {
      console.log(id)
      await Product.getById(id).then(res => {
        console.log(res.data)
        setProduct(res.data.name);
        setSupplier(res.data.supplier);
        setSellingPrice(res.data.sellingPrice);
      })
    }

    const checkout = (e) => {
        e.preventDefault();
        /**
         * iterate through the cart and get all details
         * Use product id to get product details for sale
         * 
         */
        let sale = {
          product: id,
          supplier: supplier,
          sold_Qty: soldQty,
          sellingPrice: sellingPrice,
          saleTotal: (sellingPrice*soldQty),
          saleDate: (new Date().getDate() + '-' + new Date().getMonth() + "-" + new Date().getFullYear())
        }
        console.log(sale);
        Transaction.createSale(sale).then(res=> {
          console.log(employee);
          let transaction = {
            employee: employee.id,
            sale: res.data.id,
            transactionDate: Date()
          }
          console.log(transaction);
          Transaction.createTransaction(transaction).then(res=>{
            setMessage("Transaction Complete");
          })
        })
    }
}