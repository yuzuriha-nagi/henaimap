import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Game',
    description: '',
    imageUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    fetch(`${API_BASE_URL}/api/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(() => {
      alert('Success!');
      navigate('/');
    })
    .catch(err => console.error('Error adding item:', err));
  };

  return (
    <div className="admin-form">
      <h2>Add a New Favorite</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select 
            value={formData.category} 
            onChange={e => setFormData({...formData, category: e.target.value as any})}
          >
            <option value="Game">Game</option>
            <option value="Music">Music</option>
            <option value="Character">Character</option>
          </select>
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input 
            type="text" 
            value={formData.imageUrl} 
            onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea 
            rows={4} 
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
            required 
          />
        </div>
        <button type="submit" className="submit-btn">Add to List</button>
      </form>
    </div>
  );
};

export default Admin;
