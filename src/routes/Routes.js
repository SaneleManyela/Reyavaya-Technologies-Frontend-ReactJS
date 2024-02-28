import React from 'react';
import Login from '../pages/Login'
import Main from '../pages/Main';
import SignUp from '../pages/SignUp';
import Products from '../pages/Products';
import UpdateProduct from '../pages/UpdateProduct';
import Brands from '../pages/AddBrand';
import UpdateBrand from '../pages/UpdateBrand';
import ViewBrand from '../pages/ViewBrand';
import ViewSupplier from '../pages/ViewSupplier';
import Supplier from '../pages/Supplier';
import UpdateSupplier from '../pages/UpdateSupplier';
import AddToCart from '../pages/AddToCart';
import Stock from '../pages/Stock';
import AddStock from '../pages/AddStock';
import UpdateStock from '../pages/UpdateStock';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewCart from '../pages/ViewCart';
import Transact from '../pages/Transact';

export default function AppRoutes() {

    return(
        <Router>
            <Routes>
                <Route exact path='/' element={<Login />} />
                <Route exact path='/signup' element={<SignUp />} />
                {localStorage.getItem("user") !== null ? (
                    <>
                        <Route exact path='/main' element={<Main />} />
                        <Route exact path='/product' element={<Products />} />
                        <Route exact path='/product/:id' element={<UpdateProduct />} />
                        <Route exact path='/brand' element={<Brands />} />
                        <Route exact path='/UpdateBrand/:id' element={<UpdateBrand />} />
                        <Route exact path='/viewBrand' element={<ViewBrand />} />
                        <Route exact path='/suppliers' element={<ViewSupplier />} />
                        <Route exact path='/supplier' element={<Supplier />} />
                        <Route exact path='/supplier/:id' element={<UpdateSupplier />} />
                        <Route exact path='/addtocart/:id' element={<AddToCart />} />
                        <Route exact path='/stock' element={<Stock />} />
                        <Route exact path='/addstock' element={<AddStock />} />
                        <Route exact path='/updatestock/:id' element={<UpdateStock />} />
                        <Route exact path='/viewcart' element={<ViewCart />} />
                        <Route exact path='/transact' element={<Transact />} />
                    </>
                ): null}
            </Routes> 
      </Router>
    )
}