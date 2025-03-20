import {Link} from "react-router-dom"

export default function Login() {
    return (
        <div className="form-container">
            <form className="form">
                <h1>Login</h1>

                <section className="input-section">
                    <label htmlFor="email-input">Email</label>
                    <input id="email-input" className="input-field" type="email" placeholder="Smith11@mail.com"/>
                </section>

                <section className="input-section">
                    <label htmlFor="password-input">Password</label>
                    <input id="password-input" className="input-field" type="password" placeholder="Starfish88"/>
                </section>

                <button className="form-btn">Login</button>

                <p>Don't have an account yet? <Link to="/register">Sign up</Link></p>

            </form>
        </div>
    );
}
