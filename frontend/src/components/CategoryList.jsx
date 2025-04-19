import { useEffect, useState } from "react";
import api from "../api/axios.js";


export default function CategoryList({ onSelectCategory }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.get("category/")
            .then(res => setCategories(res.data))
            .catch(err => console.error("error fetching categories: ", err))
    }, []);

    return (
        <div style={{ margin: "20px" }}>
            <h3>Select Category</h3>
            {categories.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    style={{ margin: "5px" }}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
}