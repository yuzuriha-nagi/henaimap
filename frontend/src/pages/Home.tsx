import { useState, useEffect } from 'react';
import { FavoriteItem } from '../types';
import FavoriteCard from '../components/FavoriteCard';

const Home = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    fetch(`${API_BASE_URL}/api/favorites`)
      .then(res => res.json())
      .then(data => {
        setFavorites(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching favorites:', err);
        setLoading(false);
      });
  }, []);

  const filteredFavorites = filter === 'All' 
    ? favorites 
    : favorites.filter(f => f.category === filter);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="category-filter">
        {['All', 'Music', 'Game', 'Character'].map(cat => (
          <button 
            key={cat} 
            className={filter === cat ? 'active' : ''} 
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="favorites-grid">
        {filteredFavorites.map(item => (
          <FavoriteCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
