import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FavoriteItem } from '../types';

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<FavoriteItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    fetch(`${API_BASE_URL}/api/favorites/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setItem(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching details:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!item) return <div>Item not found.</div>;

  return (
    <div className="detail-view">
      <button onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>&larr; Back to List</button>
      <div className="detail-header">
        <div className="detail-image">
          {item.category === 'Game' && '🎮'}
          {item.category === 'Music' && '🎵'}
          {item.category === 'Character' && '👤'}
        </div>
        <div className="detail-info">
          <span className="card-category">{item.category}</span>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
