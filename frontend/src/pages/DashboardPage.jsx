import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import {
  fetchProducts,
  createProduct,
  fetchCategories,
  updateProduct,
  deleteProduct
} from '../api/products';
import { fetchCurrentUser } from '../api/users';
import { addToCart } from '../api/cart';

function DashboardPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [updatingProductId, setUpdatingProductId] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);

  const isAdmin = localStorage.getItem('is_superuser') === 'true';

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/login');
    } else {
      loadUser();
      loadProducts();
      if (isAdmin) {
        loadCategories();
      }
    }
  }, [navigate, isAdmin]);

  const loadUser = async () => {
    try {
      const userData = await fetchCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
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
        category: parseInt(newProduct.category),
      };
      await createProduct(payload);
      setNewProduct({ name: '', description: '', price: '', category: '' });
      await loadProducts();
      toast.success('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Something went wrong. Please try again!');
    } finally {
      setAddingProduct(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct({
      ...product,
      category: product.category?.id || product.category,
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      setUpdatingProductId(editingProduct.id);
      const payload = {
        ...editingProduct,
        price: parseFloat(editingProduct.price),
        category: parseInt(editingProduct.category),
      };
      await updateProduct(editingProduct.id, payload);
      setEditingProduct(null);
      await loadProducts();
      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Something went wrong. Please try again!');
    } finally {
      setUpdatingProductId(null);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setDeletingProductId(id);
        await deleteProduct(id);
        await loadProducts();
        toast.success('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Something went wrong. Please try again!');
      } finally {
        setDeletingProductId(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex-grow p-10">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Dashboard</h1>

        {user && (
          <div className="mb-6 bg-white rounded-xl p-4 shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-700 mb-1">Welcome, {user.username}!</h2>
            <p className="text-gray-500">Email: {user.email}</p>
            <p className="text-gray-500">Role: {user.is_superuser ? 'Admin' : 'Customer'}</p>
          </div>
        )}

        <p className="text-gray-600 mb-10">
          Welcome to your dashboard. Here you can manage your orders, profile, and more!
        </p>

        {isAdmin && (
          <div className="bg-white shadow-md rounded-2xl p-6 mb-10">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                placeholder="Name"
                className="w-full p-2 border rounded-lg"
                required
              />
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                placeholder="Description"
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                placeholder="Price (₹)"
                className="w-full p-2 border rounded-lg"
                required
              />
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

        {categories.length > 0 && (
          <div className="mb-6">
            <label className="font-semibold text-gray-700 mr-2">Filter by Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="All">All</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {loading ? (
          <Spinner />
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-green-700">Available Products</h2>
            {Object.entries(
              products
                .filter((product) =>
                  selectedCategory === 'All' ? true : product.category?.name === selectedCategory
                )
                .reduce((acc, product) => {
                  const category = product.category?.name || 'Uncategorized';
                  acc[category] = acc[category] || [];
                  acc[category].push(product);
                  return acc;
                }, {})
            ).map(([categoryName, items]) => (
              <div key={categoryName} className="mb-10">
                <h3 className="text-xl font-bold text-blue-700 mb-4">{categoryName}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="p-5">
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-3">{product.description}</p>
                        <p className="text-green-600 font-bold text-lg mb-4">₹{product.price}</p>
                        {isAdmin ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded-lg"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg"
                              disabled={deletingProductId === product.id}
                            >
                              {deletingProductId === product.id ? 'Deleting...' : 'Delete'}
                            </button>
                          </div>
                        ) : (
                          <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl"
                            onClick={async () => {
                              try {
                                await addToCart(product.id);
                                toast.success('Added to cart!');
                                navigate('/cart');
                              } catch (err) {
                                toast.error('Failed to add to cart');
                              }
                            }}
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {editingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
              <h2 className="text-xl font-bold mb-4">Edit Product</h2>
              <form onSubmit={handleUpdateProduct} className="space-y-4">
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <textarea
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, price: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <select
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, category: e.target.value })
                  }
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
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-3 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updatingProductId === editingProduct.id}
                    className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-lg"
                  >
                    {updatingProductId === editingProduct.id ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
