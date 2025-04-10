import "./App.css";
import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout"
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart"
import Order from "./pages/Order"

const userContext = createContext()

export default function App() {

    const apiKey = import.meta.env.VITE_API_BASE_URL;

    const [user, setUser] = useState({
        id: null,
        isAdmin: null
    })

    const unsetUser = () => {
        localStorage.clear()
    }

    useEffect(() => {
        fetch(`${apiKey}/users/details`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data.user !== "undefined") {
                setUser({
                    id: data.user.id,
                    isAdmin: data.user.isAdmin
                })
            } else {
                setUser({
                    id: null,
                    isAdmin: null
                })
            }
        })
    }, [])

    return (
        <>
            <userContext.Provider value={{user, setUser, unsetUser}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="logout" element={<Logout />} />
                            <Route path=":productId" element={<SingleProduct />} />
                            <Route path="cart" element={<Cart />} />
                            <Route path="orders" element={<Order />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </userContext.Provider>
        </>
    );
}

export {userContext};
