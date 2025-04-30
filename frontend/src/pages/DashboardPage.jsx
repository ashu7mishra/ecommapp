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

function DashboardPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      loadProducts();
      if (isAdmin) loadCategories();
    }
  }, [navigate, isAdmin]);

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
    setEditingProduct(product);
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
          <Spinner />
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
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl">
                          Buy Now
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
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
                  placeholder="Product Name"
                  required
                />
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Description"
                  required
                />
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Price"
                  required
                />
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
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
