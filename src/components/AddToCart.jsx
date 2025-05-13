import { useContext } from "react";
import { userContext } from "../App";
import Swal from "sweetalert2";

export default function AddToCart({ apiKey, productId, quantity }) {
    const { user, setUser } = useContext(userContext);

    async function clickHandler() {
        const result = await fetch(`${apiKey}/carts/add-to-cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                productId: productId,
                quantity: quantity,
            }),
        });

        const data = await result.json();

        console.log(data);

        if (data.message === "Product not found.") {
            Swal.fire({
                title: "Product not found.",
                icon: "error",
            });
        } else if (data.message === "Internal server error.") {
            Swal.fire({
                title: "Internal server error.",
                icon: "error",
            });
        } else {
            Swal.fire({
                title: "Success!",
                text: "You have successfully added the item to cart.",
                icon: "success",
            });
        }
    }

    return (
        <button
            onClick={() => clickHandler()}
            className={user.id === null ? "disabled" : ""}
            disabled={user.id === null}
        >
            Add to cart
        </button>
    );
}
