import { useState } from "react";
import api from "../api/axios.js";


export default function LoginForm({onLogin}) {
    const [form, setForm] = useState({username:"", password:""})
    const [error, setError] = useState("");

    const handleChange = (e) => setForm({
        ...form, [e.target.name]: e.target.value
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError();

        try {
            const res = await api.post("token/", form);
            const {access, refresh} = res.data;

            localStorage.setItem("access", access);
            localStorage.setItem("refresh", refresh);

            onLogin();

        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <h2>Login</h2>
            {error && <div className="signup-form">{error}</div>}
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
            />
            <button type="submit">Login</button>
        </form>
    )
}