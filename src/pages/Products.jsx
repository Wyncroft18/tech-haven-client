import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Products() {
    const [productData, setProductData] = useState([]);

    const apiKey = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetch(`${apiKey}/products`)
            .then((res) => res.json())
            .then((data) => setProductData(data.products));
    }, []);

    const itemsElement = productData.map((item) => {
        let phPeso = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "PHP",
        });

        return (
            <Link key={item._id} to={`/${item._id}`}>
                <article>
                    <img
                        className="item-img"
                        src={item.imgUrl}
                        alt={item.alt}
                    />
                    <p className="item-name">{item.name}</p>
                    <p>{phPeso.format(item.price)}</p>
                </article>
            </Link>
        );
    });

    return <div className="product-container">{itemsElement}</div>;
}
