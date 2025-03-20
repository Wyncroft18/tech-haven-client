import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav>
            <Link className="nav-link" to="/">
                <h1>Tech Haven</h1>
            </Link>
            <ul>
                <Link className="nav-link" to="/">Products</Link>
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/register">Sign up</Link>
            </ul>
        </nav>
    )
}