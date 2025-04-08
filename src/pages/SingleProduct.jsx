import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../App";
import Swal from "sweetalert2";

export default function SingleProduct() {
    const { user, setUser } = useContext(userContext);

    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const params = useParams();

    const apiKey = import.meta.env.VITE_API_BASE_URL;

    const php = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
    });

    async function clickHandler() {

        const result = await fetch(`${apiKey}/carts/add-to-cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                productId: params.productId,
                quantity: quantity,
            }),
        });

        const data = result.json();

        if (data) {
            Swal.fire({
                title: "Success!",
                text: "You have successfully added the item to cart.",
                icon: "success",
            });
        } else {
            Swal.fire({
                title: "Error!",
                text: "Please try again.",
                icon: "error",
            });
        }
    }

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
                    <button
                        onClick={() => clickHandler()}
                        className={user.id === null ? "disabled" : ""}
                        disabled={user.id === null}
                    >
                        Add to cart
                    </button>
                </div>
            </article>
        </div>
    );
}
