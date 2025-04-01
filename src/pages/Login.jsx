import { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2"
import {userContext} from "../App"

export default function Login() {

    const {user, setUser} = useContext(userContext)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    const apiKey = import.meta.env.VITE_API_BASE_URL;

    function loginUser(e) {
        e.preventDefault();

        fetch(`${apiKey}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (typeof data.access !== "undefined") {
                    localStorage.setItem("token", data.access);
                    userDetails(data.access);

                    Swal.fire({
                        title: "Login Successful",
                        icon: "success",
                    });
                } else if (data.error === "Email not found.") {
                    Swal.fire({
                        title: "Email not found.",
                        text: "Check the email you provided.",
                        icon: "error",
                    });
                } else {
                    Swal.fire({
                        title: "Authentication failed.",
                        text: "Check your login details and try again.",
                        icon: "error",
                    });
                }
            });

        setEmail("");
        setPassword("");
    }

    const userDetails = (token) => {
        fetch(`${apiKey}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUser({
                    id: data.user._id,
                    isAdmin: data.user.isAdmin
                })
            });
    };

    useEffect(() => {
        if (email !== "" && password !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password]);

    return (
        user.id !== null ?
            <Navigate to="/" />
        :
        <div className="form-container">
            <form onSubmit={(e) => loginUser(e)} className="form">
                <h1>Login</h1>

                <section className="input-section">
                    <label htmlFor="email-input">Email</label>
                    <input
                        id="email-input"
                        className="input-field"
                        type="email"
                        placeholder="Smith11@mail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </section>

                <section className="input-section">
                    <label htmlFor="password-input">Password</label>
                    <input
                        id="password-input"
                        className="input-field"
                        type="password"
                        placeholder="Starfish88"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </section>

                <button className={isActive ? "form-btn" : "form-btn disabled"} disabled={!isActive}>
                    Login
                </button>

                <p>
                    Don't have an account yet?{" "}
                    <Link to="/register">Sign up</Link>
                </p>
            </form>
        </div>
    );
}
