import { useState, useEffect, useContext } from "react";
import Products from "../components/Products";
import { userContext } from "../App"
import AddProduct from "../components/AddProduct";
import Modal from "react-modal"

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
                    <h1>This is the modal</h1>
                    <button onClick={closeModal}>Close</button>
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
