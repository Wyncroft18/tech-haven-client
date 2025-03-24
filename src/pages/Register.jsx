import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    function registerUser(e) {
        e.preventDefault();

        const apiKey = import.meta.env.VITE_API_BASE_URL;

        fetch(`${apiKey}/users`, {
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
                if (data.message === "User registered successfully.") {
                    Swal.fire({
                        title: "Registration Successful!",
                        icon: "success",
                    });
                } else {
                    Swal.fire({
                        title: "Email already used",
                        icon: "error",
                    });
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }

    useEffect(() => {
        if (
            email !== "" &&
            password !== "" &&
            confirmPassword !== "" &&
            password === confirmPassword
        ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password, confirmPassword]);

    return (
        <div className="form-container">
            <form onSubmit={(e) => registerUser(e)} className="form">
                <h1>Sign up</h1>

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

                <section className="input-section">
                    <label htmlFor="c-password-input">Confirm Password</label>
                    <input
                        id="c-password-input"
                        className="input-field"
                        type="password"
                        placeholder="Starfish88"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                </section>

                <button className="form-btn" disabled={!isActive}>
                    Submit
                </button>

                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}
