import { useEffect, useState } from "react";
import api from "../api/axios.js";


export default function UserInfo({ onLogout }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.get("self/")
            .then((res) => setUser(res.data))
            .catch((err) => {
                console.error(err);
                onLogout();
            });
    }, [onLogout]);

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        onLogout();
    };

    return (
        <div style={{ textAlign: "center" }}>
            {user ? (
                <>
                    <h2>Welcome, {user.username}!!! </h2>
                    <p>Email: {user.email} </p>
                    <button onClick={handleLogout}></button>
                </>
            ) : (
                <p>Loading...</p>
            )
            }
        </div>
    );
}