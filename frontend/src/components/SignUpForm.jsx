import {useState} from "react";
import api from "../api/axios.js";
import "../style/SignUpForm.css"

export default function SignUpForm({onSignup}){
    const [form, setForm] = useState({
        username:"",
        email:"",
        password:"",
    });


    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await api.post("users/", form);
            setSuccess("User registered successfully!!!");
            setForm({username:"", email:"", password:""});
            // if (onSignup) onSignup();
        } catch (err) {
            console.log(err);
            if (err.response?.data) {
                setError(JSON.stringify(err.response.data));
            } else {
                setError("Something went wrong. Try again.");
            }
        }
    };

    return (
        <div className="signup-wrapper">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Sign Up</h2>
                {error && <div className="signup-error">{error}</div>}
                {success && <div className="signup-success">{success}</div>}

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
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
                <button type="submit">Register</button>
            </form>
        </div>
    )

}