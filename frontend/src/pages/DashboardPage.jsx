import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { fetchProducts, createProduct, fetchCategories } from '../api/products'; // ⬅️ updated

function DashboardPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '', // New field
  });

  const [addingProduct, setAddingProduct] = useState(false);

  const isAdmin = localStorage.getItem('is_superuser') === 'true';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      loadProducts();
      if (isAdmin) {
        loadCategories();
      }
    }
  }, [navigate, isAdmin]);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setAddingProduct(true);
      const payload = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        category: parseInt(newProduct.category), // pass category ID
      };
      await createProduct(payload);
      setNewProduct({ name: '', description: '', price: '', category: '' });
      await loadProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setAddingProduct(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow p-10">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Dashboard</h1>
        <p className="text-gray-600 mb-10">
          Welcome to your dashboard. Here you can manage your orders, profile, and more!
        </p>

        {/* Admin Product Create Section */}
        {isAdmin && (
          <div className="bg-white shadow-md rounded-2xl p-6 mb-10">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold">Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Price (₹)</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block mb-1 font-semibold">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={addingProduct}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold"
              >
                {addingProduct ? 'Adding...' : 'Add Product'}
              </button>
            </form>
          </div>
        )}

        {/* Product List */}
        {loading ? (
          <div className="text-center text-lg text-gray-500">Loading products...</div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-green-700">Available Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length === 0 ? (
                <div className="text-gray-500 col-span-full text-center">No products available</div>
              ) : (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="p-5">
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-3">{product.description}</p>
                      <p className="text-green-600 font-bold text-lg mb-4">
                        ₹{product.price}
                      </p>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl">
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
