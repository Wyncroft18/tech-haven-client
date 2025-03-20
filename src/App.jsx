import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Products />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
