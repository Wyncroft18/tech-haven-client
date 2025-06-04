import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../App";
import AddToCart from "../components/AddToCart";

export default function SingleProduct() {
    // user context
    const { user, setUser } = useContext(userContext);

    // states
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);

    // gets the product id from url
    const params = useParams();

    // api key
    const apiKey = import.meta.env.VITE_API_BASE_URL;

    // converts number to peso format
    const php = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
    });

    // effects
    useEffect(() => {
        fetch(`${apiKey}/products/${params.productId}`)
            .then((res) => res.json())
            .then((data) => setProduct(data.product));
    }, []);

    return (
        <div className="single-product-container">
            <article className="single-product">
                <img src={product.imgUrl} alt={product.alt} />
                <div>
                    <h2>{product.name}</h2>
                    <h4>Description:</h4>
                    <p className="description">{product.description}</p>
                    <section>
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            onChange={(e) => setQuantity(e.target.value)}
                            type="number"
                            id="quantity"
                            min="1"
                            max="5"
                            value={quantity}
                        />
                    </section>
                    <h3>{php.format(product.price)}</h3>
                    {!user.isAdmin && (
                        <AddToCart
                            apiKey={apiKey}
                            productId={params.productId}
                            quantity={quantity}
                        />
                    )}
                </div>
            </article>
        </div>
    );
}
