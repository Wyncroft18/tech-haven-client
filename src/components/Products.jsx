import { Link } from "react-router-dom";

export default function Products({productData}) {

    const itemsElement = productData.map((item) => {
        const phPeso = new Intl.NumberFormat("en-US", {
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

    return itemsElement
}