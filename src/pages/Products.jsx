import { useState, useEffect } from "react";

export default function Products() {
    const [productData, setProductData] = useState([]);

    const apiKey = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetch(`${apiKey}/products/`)
            .then((res) => res.json())
            .then((data) => setProductData(data.products));
    }, []);

    const itemsElement = productData.map((item) => {
        let phPeso = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "PHP",
        });

        return (
            <article key={item._id}>
                <h1>{item.name}</h1>
                <p>{item.description}</p>
                <p>{phPeso.format(item.price)}</p>
            </article>
        );
    });

    return <div className="product-container">{itemsElement}</div>;
}
