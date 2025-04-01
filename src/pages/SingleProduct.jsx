import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../App";

export default function SingleProduct() {
    const {user, setUser} = useContext(userContext)

    const [product, setProduct] = useState([])

    const params = useParams();

    const apiKey = import.meta.env.VITE_API_BASE_URL;

    const php = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
    });

    useEffect(() => {
        fetch(`${apiKey}/products/${params.productId}`)
            .then(res => res.json())
            .then(data => setProduct(data.product))
    }, [])

    return (
        <div className="single-product-container">
            <article className="single-product">
                <img src={product.imgUrl} alt={product.alt} />
                <div>
                    <h2>{product.name}</h2>
                    <h4>Description:</h4>
                    <p className="description">{product.description}</p>
                    <h3>{php.format(product.price)}</h3>
                    <button className={user.id === null ? "disabled" : ""}>Buy now</button>
                </div>
            </article>
        </div>
    );
}
