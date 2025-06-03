import { useEffect, useState } from "react"

export default function Order() {
    // states
    const [orders, setOrders] = useState([])

    // api key
    const apiKey = import.meta.env.VITE_API_BASE_URL

    // converts number to peso format
    const php = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
    });

    // array of orders
    const orderElements = orders.map(order => {
        
        const productArr = order.productsOrdered.map(product => {
            return <li key={product.productId}>{product.name} : Quantity {product.quantity}</li>
        })

        return (
            <section key={order._id}>
                <h2>Order placed on: {order.orderedOn.slice(0, 10)}</h2>
                <h3>Product:</h3>
                <ul>
                    {productArr}
                </ul>
                <h4>Status: {order.status}</h4>
                <h3>Total: {php.format(order.totalPrice)}</h3>
            </section>
        )

    })

    // fetch user order or fetch all orders for admin*
    useEffect(() => {
        fetch(`${apiKey}/orders`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setOrders(data.userOrders)
        })
    }, [])

    return (
        orderElements.length > 0 ?
        <div className="orders-container">
            <h1>Orders</h1>
            {orderElements}
        </div>
        :
        <div className="orders-container">
            <h1>You have no orders</h1>
        </div>
    )
}