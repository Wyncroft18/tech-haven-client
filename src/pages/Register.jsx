import {Link} from "react-router-dom"

export default function Register() {
    return (
        <div className="form-container">
            <form className="form">
                <h1>Sign up</h1>

                <section className="input-section">
                    <label htmlFor="email-input">Email</label>
                    <input id="email-input" className="input-field" type="email" placeholder="Smith11@mail.com"/>
                </section>

                <section className="input-section">
                    <label htmlFor="password-input">Password</label>
                    <input id="password-input" className="input-field" type="password" placeholder="Starfish88"/>
                </section>

                <section className="input-section">
                    <label htmlFor="c-password-input">Confirm Password</label>
                    <input id="c-password-input" className="input-field" type="password" placeholder="Starfish88"/>
                </section>

                <button className="form-btn">Sign up</button>

                <p>Already have an account? <Link to="/login">Login</Link></p>

            </form>
        </div>
    );
}
