import FirstPage from "../pages/FirstPage";
import ProductList from "../pages/ProductList";
import Search from "../pages/Search";
import ManageUserAccount from "../pages/ManageUserAccount";
import ProfileInfo from "../pages/ProfileInfo";
import Profile from "../pages/Profile";
import AdressBook from "../pages/AdressBook";
import UpdateAdress from "../pages/UpdateAdress";
import NewAdress from "../pages/NewAdress";
import MyOrders from "../pages/MyOrders";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Success from "../pages/Success";
import Login from "../pages/Login";
import Register from "../pages/Register";

const components = {
    firstPage: {
        url: "/",
        component: FirstPage
    },
    login: {
        url: "/login",
        component: Login
    },
    register: {
        url: "/register",
        component: Register
    },
    manageUserAccount: {
        url: "/account",
        component: ManageUserAccount
    },
    cart: {
        url: "/cart",
        component: Cart
    },
    success: {
        url: "/success",
        component: Success
    },
    product: {
        url: "/product/:id",
        component: Product
    },
};

export default {
    guest: {
        allowedRoutes: [
            components.login,
            components.register,
        ],
        redirectRoutes: "/login"
    },
    user: {
        allowedRoutes: [
            components.firstPage,
            components.manageUserAccount,
            components.cart,
            components.product,
            components.success,
        ],
        redirectRoutes: "/"
    },
}