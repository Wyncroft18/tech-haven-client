import { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../App";

export default function Navbar() {
    const { user } = useContext(userContext);

    return (
        <nav>
            <Link className="nav-link" to="/">
                <h1>Tech Haven</h1>
            </Link>
            <ul>
                <Link className="nav-link" to="/">
                    Products
                </Link>
                {user.id !== null ? (
                    <>
                        <Link className="nav-link" to="/">
                            Cart
                        </Link>
                        <Link className="nav-link" to="/">
                            Orders
                        </Link>
                        <Link className="nav-link" to="/logout">
                            Logout
                        </Link>
                    </>
                ) : (
                    <>
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                        <Link className="nav-link" to="/register">
                            Sign up
                        </Link>
                    </>
                )}
            </ul>
        </nav>
    );
}
