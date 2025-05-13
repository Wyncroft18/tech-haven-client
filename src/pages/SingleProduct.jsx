import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddToCart from "../components/AddToCart";

export default function SingleProduct() {
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const params = useParams();

    const apiKey = import.meta.env.VITE_API_BASE_URL;

    const php = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
    });

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
                    <AddToCart
                        apiKey={apiKey}
                        productId={params.productId}
                        quantity={quantity}
                    />
                </div>
            </article>
        </div>
    );
}
