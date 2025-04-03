import { useState, useEffect } from "react";

export default function Cart() {
    const [cart, setCart] = useState([]);

    const apiKey = import.meta.env.VITE_API_BASE_URL;

    const phPeso = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
    });

    const cartItemsElement = (cart.cartItems || []).map((item) => {
        return (
            <div key={item._id} className="cart-item">
                <h2>{item.name}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: {phPeso.format(item.subtotal)}</p>
            </div>
        );
    });

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
        cartItemsElement.length > 0 
        ?
        <div className="cart-container">
            <h1>Your cart</h1>
            <section>{cartItemsElement}</section>
            <h3>Total Price: {phPeso.format(cart.totalPrice)}</h3>
        </div>
        :
        <div className="cart-container">
            <h1>You cart is empty</h1>
        </div>
    );
}
