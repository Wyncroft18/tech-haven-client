import { useState, useEffect, useContext } from "react";
import Products from "../components/Products";
import { userContext } from "../App"
import AddProduct from "../components/AddProduct";
import Modal from "react-modal"
import Swal from "sweetalert2";

Modal.setAppElement("#root")

export default function Home() {
    const {user, setUser} = useContext(userContext)
    const [productData, setProductData] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false)

    const apiKey = import.meta.env.VITE_API_BASE_URL;

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

    async function addData(formData) {
        const name = formData.get("product-name")
        const description = formData.get("product-description")
        const price = formData.get("product-price")
        const imgUrl = formData.get("product-img")
        const alt = formData.get("product-img-alt")

        const response = await fetch(`${apiKey}/products`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                name,
                description,
                price,
                imgUrl,
                alt
            })
        })
        const data = await response.json()
        
        if (data.error === "Error in adding product.") {
            Swal.fire({
                title: "Error in adding product.",
                icon: "error"
            })
        } else {
            Swal.fire({
                title: "Success!",
                icon: "success"
            })
        }

    }

    useEffect(() => {
        fetch(`${apiKey}/products`)
            .then((res) => res.json())
            .then((data) => setProductData(data.products));
    }, []);

    return (
        user.isAdmin ?
            <div id="home-container" className="home-container">
                <AddProduct id="add-product-btn" onClick={openModal} />
                <Modal
                    className="Modal"
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    overlayClassName="Overlay"
                >
                    {/* work here */}
                    <h1>Product Details</h1>
                    <form className="product-details" action={addData}>
                        <label htmlFor="product-name">Product Name</label>
                        <input type="text" id="product-name" name="product-name"/>
                        <label htmlFor="product-description">Description</label>
                        <textarea name="product-description" id="product-description" rows={4} cols={40}></textarea>
                        <label htmlFor="product-price">Price</label>
                        <input type="number" id="product-price" name="product-price" />
                        <label htmlFor="product-img">Image Url</label>
                        <input type="text" id="product-img" name="product-img"/>
                        <label htmlFor="product-img-alt">Image Alt Text</label>
                        <input type="text" id="product-img-alt" name="product-img-alt"/>
                        <button>Add Product</button>
                    </form>
                    <button onClick={closeModal}>Close</button>
                    {/* end */}
                </Modal>
                <div className="product-container">
                    <Products productData={productData} />
                </div>
            </div>
        :
            <div className="home-container">
                <div className="product-container">
                    <Products productData={productData} />
                </div>
            </div>
    )
}
