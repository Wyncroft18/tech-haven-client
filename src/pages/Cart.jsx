import { useState, useEffect, useContext } from "react";
import { userContext } from "../App";
import Swal from "sweetalert2";

export default function Cart() {
    // user context
    const { user, setUser } = useContext(userContext);

    // states
    const [cart, setCart] = useState([]);

    // api key
    const apiKey = import.meta.env.VITE_API_BASE_URL;

    // converts number to peso format
    const phPeso = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
    });

    // cart array
    const cartItemsElement = (cart.cartItems || []).map((item) => {
        return (
            <div key={item._id} className="cart-item">
                <h2>{item.name}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: {phPeso.format(item.subtotal)}</p>
            </div>
        );
    });

    async function checkout() {
        const result = await fetch(`${apiKey}/orders/add-to-checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await result.json();

        if (data) {
            Swal.fire({
                title: "Success!",
                text: "You have successfully placed your order.",
                icon: "success",
            });
        } else {
            Swal.fire({
                title: "Error!",
                text: "Something went wrong placing your order.",
                icon: "error",
            });
        }
    }

    // effects
    useEffect(() => {
        fetch(`${apiKey}/carts`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCart(data);
            });
    }, []);

    return (
        !user.isAdmin &&
        (cartItemsElement.length > 0 ? (
            <div className="cart-container">
                <h1>Your cart</h1>
                <section id="cart-items">{cartItemsElement}</section>
                <section id="checkout">
                    <h3>Total Price: {phPeso.format(cart.totalPrice)}</h3>
                    <button onClick={() => checkout()}>Checkout</button>
                </section>
            </div>
        ) : (
            <div className="cart-container">
                <h1>You cart is empty</h1>
            </div>
        ))
    );
}
