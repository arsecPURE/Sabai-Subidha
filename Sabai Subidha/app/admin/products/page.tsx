'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    brand: '',
    stock: '',
    image: ''
  });

  const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Sports', 'Books', 'Beauty'];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    // Sample products for admin management
    const sampleProducts = [
      {
        id: 1,
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Premium flagship smartphone with S Pen, advanced camera system, and powerful performance',
        price: 149999,
        originalPrice: 159999,
        category: 'Electronics',
        brand: 'Samsung',
        stock: 25,
        status: 'active',
        image: 'https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S24%20Ultra%20smartphone%20in%20titanium%20black%2C%20premium%20mobile%20phone%20with%20S%20Pen%2C%20professional%20product%20photography%20on%20clean%20white%20background&width=200&height=200&seq=prod7&orientation=squarish',
        createdAt: '2024-01-15T10:30:00.000Z'
      },
      {
        id: 2,
        name: 'iPhone 15 Pro Max',
        description: 'Latest Apple iPhone with titanium design, pro camera system, and A17 Pro chip',
        price: 189999,
        originalPrice: 199999,
        category: 'Electronics',
        brand: 'Apple',
        stock: 15,
        status: 'active',
        image: 'https://readdy.ai/api/search-image?query=iPhone%2015%20Pro%20Max%20in%20natural%20titanium%20color%2C%20premium%20Apple%20smartphone%2C%20professional%20product%20photography%20on%20clean%20white%20background%2C%20luxury%20mobile%20device&width=200&height=200&seq=prod8&orientation=squarish',
        createdAt: '2024-01-10T14:20:00.000Z'
      },
      {
        id: 3,
        name: 'Traditional Dhaka Topi',
        description: 'Authentic Nepali traditional cap made with colorful Dhaka fabric, cultural heritage headwear',
        price: 899,
        originalPrice: 1199,
        category: 'Fashion',
        brand: 'Local',
        stock: 50,
        status: 'active',
        image: 'https://readdy.ai/api/search-image?query=Traditional%20Nepali%20Dhaka%20topi%20hat%20in%20colorful%20patterns%2C%20cultural%20headwear%2C%20authentic%20Nepalese%20traditional%20cap%20on%20clean%20white%20background%2C%20heritage%20clothing&width=200&height=200&seq=prod9&orientation=squarish',
        createdAt: '2024-01-05T09:15:00.000Z'
      },
      {
        id: 4,
        name: 'Dell XPS 13 Laptop',
        description: 'Ultra-portable laptop with InfinityEdge display, powerful performance for work and creativity',
        price: 119999,
        originalPrice: 129999,
        category: 'Electronics',
        brand: 'Dell',
        stock: 8,
        status: 'low_stock',
        image: 'https://readdy.ai/api/search-image?query=Dell%20XPS%2013%20laptop%20computer%20in%20silver%20color%2C%20ultrabook%20design%2C%20professional%20product%20photography%20on%20clean%20white%20background%2C%20premium%20notebook%20computer&width=200&height=200&seq=prod10&orientation=squarish',
        createdAt: '2024-01-02T11:45:00.000Z'
      }
    ];

    setProducts(sampleProducts);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const getStockStatus = (stock: number) => {
    if (stock <= 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (stock <= 10) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    const product = {
      id: Date.now(),
      ...newProduct,
      price: parseFloat(newProduct.price),
      originalPrice: parseFloat(newProduct.originalPrice) || parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      status: 'active',
      createdAt: new Date().toISOString(),
      image: `https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28newProduct.name%20%20%20%20product%20professional%20photography%20on%20clean%20white%20background%29%7D&width=200&height=200&seq=prod${Date.now()}&orientation=squarish`
    };

    setProducts([product, ...products]);
    setShowAddModal(false);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      category: '',
      brand: '',
      stock: '',
      image: ''
    });
    
    alert('Product added successfully!');
  };

  const handleDeleteProduct = (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
      alert('Product deleted successfully!');
    }
  };

  const toggleProductStatus = (productId: number) => {
    setProducts(products.map(p => 
      p.id === productId 
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
        : p
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="font-['Pacifico'] text-2xl text-blue-600">Sabai Subhida</div>
                <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">Admin</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-800">
                <i className="ri-notification-line w-6 h-6 flex items-center justify-center"></i>
              </button>
              <Link href="/" className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                Back to Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4 space-y-2">
            <Link href="/admin" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <i className="ri-dashboard-line w-5 h-5 flex items-center justify-center"></i>
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/orders" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <i className="ri-shopping-bag-line w-5 h-5 flex items-center justify-center"></i>
              <span>Orders</span>
            </Link>
            <Link href="/admin/products" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium">
              <i className="ri-product-hunt-line w-5 h-5 flex items-center justify-center"></i>
              <span>Products</span>
            </Link>
            <Link href="/admin/customers" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <i className="ri-user-line w-5 h-5 flex items-center justify-center"></i>
              <span>Customers</span>
            </Link>
            <Link href="/admin/analytics" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <i className="ri-bar-chart-line w-5 h-5 flex items-center justify-center"></i>
              <span>Analytics</span>
            </Link>
            <Link href="/admin/settings" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <i className="ri-settings-line w-5 h-5 flex items-center justify-center"></i>
              <span>Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
                <p className="text-gray-600">Manage your product inventory</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
              >
                <i className="ri-add-line w-5 h-5 flex items-center justify-center inline mr-2"></i>
                Add Product
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-product-hunt-line w-6 h-6 flex items-center justify-center text-blue-600"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{products.length}</div>
                  <div className="text-sm text-gray-600">Total Products</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-check-line w-6 h-6 flex items-center justify-center text-green-600"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {products.filter(p => p.status === 'active').length}
                  </div>
                  <div className="text-sm text-gray-600">Active Products</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-alert-line w-6 h-6 flex items-center justify-center text-yellow-600"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {products.filter(p => p.stock <= 10).length}
                  </div>
                  <div className="text-sm text-gray-600">Low Stock</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-close-line w-6 h-6 flex items-center justify-center text-red-600"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {products.filter(p => p.stock === 0).length}
                  </div>
                  <div className="text-sm text-gray-600">Out of Stock</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
                <input
                  type="text"
                  placeholder="Search by name or brand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                  }}
                  className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Product</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Category</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Price</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Stock</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                    <th className="text-right py-4 px-6 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-600">{product.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{product.category}</td>
                      <td className="py-4 px-6">
                        <div className="text-gray-900 font-medium">{formatPrice(product.price)}</div>
                        {product.originalPrice > product.price && (
                          <div className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{product.stock}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockStatus(product.stock).color}`}>
                            {getStockStatus(product.stock).label}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => toggleProductStatus(product.id)}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            product.status === 'active'
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          } transition-colors`}
                        >
                          {product.status === 'active' ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center space-x-2 justify-end">
                          <button className="text-blue-600 hover:text-blue-700 p-1">
                            <i className="ri-edit-line w-4 h-4 flex items-center justify-center"></i>
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <i className="ri-product-hunt-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4 text-6xl"></i>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Add New Product</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                    <input
                      type="text"
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      required
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    required
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Enter product description"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (Rs.) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (Rs.)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={newProduct.originalPrice}
                      onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <input
                    type="text"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter brand name"
                  />
                </div>

                <div className="flex space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}