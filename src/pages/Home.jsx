import { useState, useEffect, useContext } from "react";
import Products from "../components/Products";
import { userContext } from "../App"

export default function Home() {
    const {user, setUser} = useContext(userContext)
    const [productData, setProductData] = useState([]);

    const apiKey = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetch(`${apiKey}/products`)
            .then((res) => res.json())
            .then((data) => setProductData(data.products));
    }, []);

    return (
        user.isAdmin ?
            <div className="home-container">
                <button>Add product</button>
                <div className="product-container">
                    <Products productData={productData} />
                </div>
            </div>
        :
            <div className="home-container">
                <div className="product-container">
                    <Products productData={productData} />
                </div>
            </div>
    )
}
