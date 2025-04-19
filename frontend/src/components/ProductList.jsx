import { useEffect, useState } from 'react';
import api from "../api/axios.js";


export default function ProductList({ CategoryId }) {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        if (CategoryId) {
            api.get(`product/category/${CategoryId}`)
            .then(res => setProducts(res.data))
            .then(err => console.error("Error fetching products: ", err))
        }
    }, [CategoryId]);

    return (
        <div style={{margin: "20px"}}>
            <h3>Products</h3>
            {products.length === 0 ? (
                <p>No products found for this category</p>
            ) : (
                <ul>
                    {products.map(prod => {
                        <li key={prod.id}>
                            <strong>{prod.name}</strong><br/>
                            {prod.description}
                        </li>
                    })}
                </ul>
            ) }
        </div>
    );
}