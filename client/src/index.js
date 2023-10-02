import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import Register from './view/Register/Register';
import LoginFirstPage from './view/Login/LoginFirstPage';
import Users from './admin/user/Users';
import Admin from './admin/Admin';
import EditUser from './admin/user/EditUser';
import Products from './admin/products/Product';
import Categories from './admin/categories/Categories';
import AddCategory from './admin/categories/AddCategory';
import EditCategory from './admin/categories/EditCategory';
import Category from './admin/categories/Category';
import EditSubCtaegory from './admin/categories/subcategories/EditSubCategory';
import Err404 from './error/Err404';
import SubCategory from './admin/categories/subcategories/SubCategory';
import AddProduct from './admin/categories/product/AddProduct';
import EditProduct from './admin/categories/product/EditProduct';
import Address from './view/Address/Address';
import Product from './view/products/Products';
import Cart from './view/cart/Cart';
import Account from './view/account/Account';
import AddAddress from './view/Address/AddAddress';
import EditAddress from './view/Address/EditAddress';
import Search from './view/search/Search';
import StepToBuy from './view/buy/StepToBuy';
import Orders from './view/orders/orders';
import AllOrders from './admin/orders/AllOrders';
import Security from './view/security/Security';

const root = ReactDOM.createRoot(document.getElementById('root'));
const { BrowserRouter, Routes, Route } = require("react-router-dom")

root.render(

<StrictMode>
<BrowserRouter>
<Routes>
  <Route path='/' element={<App/>} />
  <Route path='/register' element={<Register />} />
  <Route path='/loginFirstPage' element={<LoginFirstPage />} />
  <Route path='/admin' element={<Admin/>} />
  <Route path='/users' element={<Users/>} />
  <Route path='/users/edit' element={<EditUser/>} />
  <Route path='/categories' element={<Categories/>} />
  <Route path='categories/addcategory' element={<AddCategory/>} />
  <Route path='categories/editCategory' element={<EditCategory/>} />
  <Route path='categories/category/' element={<Category/>} />
  <Route path='categories/category/editSubCategory' element={<EditSubCtaegory/>} />
  <Route path='categories/subCategory' element={<SubCategory/>} />
  <Route path='categories/subCategory/addproduct' element={<AddProduct/>}/>
  <Route path='categories/subCategory/editProduct' element={<EditProduct/>}/>
  <Route path='allorders' element={<AllOrders/>}/>

  
  
  <Route path='/addAddress' element={<AddAddress/>}/>
  <Route path='account/address' element={<Address/>}/>
  <Route path='/account/address/editAddress' element={<EditAddress/>}/>
  <Route path='/product' element={<Product/>}/>
  <Route path='/cart' element={<Cart/>}/>
  <Route path='/search' element={<Search/>}/>
  <Route path='/account'element={<Account/>} />
  <Route path='/steptobuy' element={<StepToBuy/>}/>
  <Route path='/account/orders' element={<Orders/>}/>
  <Route path='/account/security' element={<Security/>}/>

  
  

  <Route path='*' element={<Err404/>}/>
</Routes>
</BrowserRouter>
</StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
