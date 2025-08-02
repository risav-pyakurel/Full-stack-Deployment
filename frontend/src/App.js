import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [stats, setStats] = useState({});

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/users`);
      setUsers(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/stats`);
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/api/users`, newUser);
      setNewUser({ name: '', email: '', role: '' });
      setSuccess('User created successfully!');
      fetchUsers();
      fetchStats();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to create user');
      console.error('Error creating user:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setLoading(true);
        await axios.delete(`${API_BASE_URL}/api/users/${id}`);
        setSuccess('User deleted successfully!');
        fetchUsers();
        fetchStats();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete user');
        console.error('Error deleting user:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>🚀 DevOps Traineeship Assignment</h1>
          <p>Full Stack 3-Tier Application with Docker & CI/CD</p>
        </header>

        {/* Stats Dashboard */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-number">{stats.totalUsers || 0}</p>
          </div>
          <div className="stat-card">
            <h3>System Status</h3>
            <p className="stat-status">🟢 Online</p>
          </div>
          <div className="stat-card">
            <h3>API Version</h3>
            <p className="stat-version">v1.0.0</p>
          </div>
        </div>

        {/* Create User Form */}
        <div className="card">
          <h2>Create New User</h2>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
              >
                <option value="">Select a role</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Creating...' : 'Create User'}
            </button>
          </form>
        </div>

        {/* Users List */}
        <div className="card">
          <h2>Users List</h2>
          {loading ? (
            <div className="loading">Loading users...</div>
          ) : users.length === 0 ? (
            <p>No users found. Create your first user above!</p>
          ) : (
            <div className="users-grid">
              {users.map((user) => (
                <div key={user._id} className="user-card">
                  <h3>{user.name}</h3>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> <span className="role-badge">{user.role}</span></p>
                  <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                  <button 
                    onClick={() => handleDelete(user._id)} 
                    className="btn btn-danger"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>Technologies: React • Node.js • MongoDB • Docker • CI/CD • Monitoring</p>
        </footer>
      </div>
    </div>
  );
}

export default App; 