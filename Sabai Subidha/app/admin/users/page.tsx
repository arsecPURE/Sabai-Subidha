'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminGuard from '../../../components/AdminGuard';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'admin' | 'user';
  permissions?: string[];
  isFounder?: boolean;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'user' as 'admin' | 'user'
  });
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const availablePermissions = [
    { id: 'manage_orders', label: 'Manage Orders', description: 'View and update order status' },
    { id: 'manage_products', label: 'Manage Products', description: 'Add, edit, and delete products' },
    { id: 'manage_users', label: 'Manage Users', description: 'Create and manage user accounts' },
    { id: 'view_analytics', label: 'View Analytics', description: 'Access sales and performance reports' },
    { id: 'manage_settings', label: 'Manage Settings', description: 'Modify system configuration' },
    { id: 'export_data', label: 'Export Data', description: 'Export customer and order data' }
  ];

  useEffect(() => {
    loadUsers();
    loadCurrentUser();
  }, []);

  const loadUsers = () => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(allUsers);
  };

  const loadCurrentUser = () => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.role === 'admin' && formData.password.length < 8) {
      setError('Admin passwords must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if email already exists
      const existingUser = allUsers.find((u: User) => u.email.toLowerCase() === formData.email.toLowerCase());
      if (existingUser) {
        setError('An account with this email already exists');
        setIsLoading(false);
        return;
      }

      const newUser: User = {
        id: Date.now().toString(),
        fullName: formData.fullName,
        email: formData.email.toLowerCase(),
        password: formData.password,
        role: formData.role,
        permissions: formData.role === 'admin' ? selectedPermissions : [],
        isActive: true,
        createdAt: new Date().toISOString()
      };

      allUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(allUsers));

      // Log the action
      const adminLogs = JSON.parse(localStorage.getItem('adminAccessLogs') || '[]');
      adminLogs.push({
        adminId: currentUser?.id,
        adminEmail: currentUser?.email,
        action: `user_created_${formData.role}`,
        targetUserId: newUser.id,
        targetUserEmail: newUser.email,
        timestamp: new Date().toISOString(),
        ip: 'localhost'
      });
      localStorage.setItem('adminAccessLogs', JSON.stringify(adminLogs));

      setSuccess(`${formData.role === 'admin' ? 'Admin' : 'User'} account created successfully`);
      setShowAddModal(false);
      setFormData({ fullName: '', email: '', password: '', role: 'user' });
      setSelectedPermissions([]);
      loadUsers();
    } catch (err) {
      setError('Failed to create user account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePermissions = () => {
    if (!selectedUser) return;

    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = allUsers.map((u: User) => 
      u.id === selectedUser.id ? { ...u, permissions: selectedPermissions } : u
    );
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Log the action
    const adminLogs = JSON.parse(localStorage.getItem('adminAccessLogs') || '[]');
    adminLogs.push({
      adminId: currentUser?.id,
      adminEmail: currentUser?.email,
      action: 'permissions_updated',
      targetUserId: selectedUser.id,
      targetUserEmail: selectedUser.email,
      timestamp: new Date().toISOString(),
      ip: 'localhost'
    });
    localStorage.setItem('adminAccessLogs', JSON.stringify(adminLogs));

    setSuccess('Permissions updated successfully');
    setShowPermissionsModal(false);
    setSelectedUser(null);
    loadUsers();
  };

  const toggleUserStatus = (user: User) => {
    if (user.id === currentUser?.id) {
      setError('You cannot deactivate your own account');
      return;
    }

    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = allUsers.map((u: User) => 
      u.id === user.id ? { ...u, isActive: !u.isActive } : u
    );
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    setSuccess(`User ${user.isActive ? 'deactivated' : 'activated'} successfully`);
    loadUsers();
  };

  const deleteUser = (user: User) => {
    if (user.id === currentUser?.id) {
      setError('You cannot delete your own account');
      return;
    }

    if (user.isFounder) {
      setError('Cannot delete the founder admin account');
      return;
    }

    if (confirm(`Are you sure you want to delete ${user.fullName}? This action cannot be undone.`)) {
      const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = allUsers.filter((u: User) => u.id !== user.id);
      
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      setSuccess('User deleted successfully');
      loadUsers();
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="font-[\'Pacifico\'] text-2xl text-blue-600">Sabai Subhida</div>
                  <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">Admin</span>
                </Link>
              </div>
              <Link href="/admin" className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                Back to Dashboard
              </Link>
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
              <Link href="/admin/products" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
                <i className="ri-product-hunt-line w-5 h-5 flex items-center justify-center"></i>
                <span>Products</span>
              </Link>
              <Link href="/admin/customers" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
                <i className="ri-user-line w-5 h-5 flex items-center justify-center"></i>
                <span>Customers</span>
              </Link>
              <Link href="/admin/users" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium">
                <i className="ri-admin-line w-5 h-5 flex items-center justify-center"></i>
                <span>User Management</span>
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
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                  <p className="text-gray-600 mt-1">Manage admin and user accounts</p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors whitespace-nowrap"
                >
                  <i className="ri-user-add-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Add User
                </button>
              </div>
            </div>

            {/* Success/Error Messages */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
                <i className="ri-check-circle-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                {success}
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                <i className="ri-error-warning-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                {error}
              </div>
            )}

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                              <i className="ri-user-line w-5 h-5 flex items-center justify-center text-gray-600"></i>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 flex items-center">
                                {user.fullName}
                                {user.isFounder && (
                                  <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Founder</span>
                                )}
                                {user.id === currentUser?.id && (
                                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">You</span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.role === 'admin' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role === 'admin' ? 'Administrator' : 'User'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            {user.role === 'admin' && (
                              <button
                                onClick={() => {
                                  setSelectedUser(user);
                                  setSelectedPermissions(user.permissions || []);
                                  setShowPermissionsModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded text-xs whitespace-nowrap"
                              >
                                <i className="ri-key-line w-3 h-3 flex items-center justify-center inline mr-1"></i>
                                Permissions
                              </button>
                            )}
                            
                            {user.id !== currentUser?.id && (
                              <>
                                <button
                                  onClick={() => toggleUserStatus(user)}
                                  className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
                                    user.isActive 
                                      ? 'text-red-600 hover:text-red-800' 
                                      : 'text-green-600 hover:text-green-800'
                                  }`}
                                >
                                  {user.isActive ? 'Deactivate' : 'Activate'}
                                </button>
                                
                                {!user.isFounder && (
                                  <button
                                    onClick={() => deleteUser(user)}
                                    className="text-red-600 hover:text-red-800 px-2 py-1 rounded text-xs whitespace-nowrap"
                                  >
                                    Delete
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Add New User</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
                </button>
              </div>

              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value as 'admin' | 'user'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  >
                    <option value="user">User</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                {formData.role === 'admin' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {availablePermissions.map((permission) => (
                        <label key={permission.id} className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedPermissions.includes(permission.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPermissions([...selectedPermissions, permission.id]);
                              } else {
                                setSelectedPermissions(selectedPermissions.filter(p => p !== permission.id));
                              }
                            }}
                            className="mt-1"
                          />
                          <div>
                            <div className="font-medium text-sm">{permission.label}</div>
                            <div className="text-xs text-gray-500">{permission.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    {isLoading ? 'Creating...' : 'Create User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Permissions Modal */}
        {showPermissionsModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Manage Permissions - {selectedUser.fullName}
                </h2>
                <button
                  onClick={() => setShowPermissionsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
                </button>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {availablePermissions.map((permission) => (
                  <label key={permission.id} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(permission.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPermissions([...selectedPermissions, permission.id]);
                        } else {
                          setSelectedPermissions(selectedPermissions.filter(p => p !== permission.id));
                        }
                      }}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium text-sm">{permission.label}</div>
                      <div className="text-xs text-gray-500">{permission.description}</div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex justify-end space-x-3 pt-4 mt-6 border-t">
                <button
                  onClick={() => setShowPermissionsModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePermissions}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors whitespace-nowrap"
                >
                  Update Permissions
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminGuard>
  );
}