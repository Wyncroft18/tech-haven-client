import "./App.css";
import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout"
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart"

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
                    id: data.user._id,
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
                        <Route element={<Layout />}>
                            <Route path="/" element={<Products />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/:productId" element={<SingleProduct />} />
                            <Route path="/cart" element={<Cart />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </userContext.Provider>
        </>
    );
}

export {userContext};
