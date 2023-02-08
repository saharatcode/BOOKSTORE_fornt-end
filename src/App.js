import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ManageUserAccount from "./pages/ManageUserAccount.jsx";
import Profile from "./pages/Profile"
import AdressBook from "./pages/AdressBook";
import NewAdress from "./pages/NewAdress";
import ChangePassword from "./pages/ChangePassword";
import Footer from "./components/Foot";
import Cart from "./pages/Cart"
import Success from "./pages/Success";
import CategoryProduct from "./pages/CategoryProduct";
import UpdateAdress from "./pages/UpdateAdress";
import { useSelector } from "react-redux";
import FirstPage from "./pages/FirstPage";
import Navigation from "./components/Navigation";
import ProfileInfo from "./pages/ProfileInfo";
import Search from "./pages/Search";
import MyOrders from "./pages/MyOrders";
import Checkout from "./pages/Checkout";
import MyWishlist from "./pages/MyWishlist";

function App() {

  const user = useSelector((state) => state.user.currentUser)
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        {/* Guest Routes */}
        <Route path="/" element={<FirstPage />}>
          <Route path="" element={<ProductList />} />
          <Route path="products" element={<ProductList />} />
          <Route path="catalog" element={<Search />} />
        </Route>

        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />

        {/* User Routes */}
        <Route path="/account" element={user ? <ManageUserAccount /> : <Navigate to="/login" replace={true}/>}>
          <Route path="" element={user ? <ProfileInfo /> : <Navigate to="/login" replace={true}/>} />
          <Route path="profile" element={user ? <Profile /> : <Navigate to="/login" replace={true}/>} />
          <Route path="adress-edit/:id" element={user ? <UpdateAdress /> : <Navigate to="/login" replace={true}/>} />
          <Route path="adress-new" element={user ? <NewAdress /> : <Navigate to="/login" replace={true}/>} />
          <Route path="adress" element={user ? <AdressBook /> : <Navigate to="/login" replace={true}/>} />
          <Route path="orders" element={user ? <MyOrders /> : <Navigate to="/login" replace={true}/>} />
          <Route path="change-password" element={user ? <ChangePassword /> : <Navigate to="/login" replace={true}/>} />
        </Route>

        <Route path='/login' element={user ?  <Navigate to="/" replace={true} /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" replace={true}/> : <Register />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
