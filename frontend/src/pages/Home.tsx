import { useState } from 'react';
import { FavoriteItem } from '../types';
import FavoriteCard from '../components/FavoriteCard';
import { favoritesData } from '../data';

const Home = () => {
  const [favorites] = useState<FavoriteItem[]>(favoritesData);
  const [filter, setFilter] = useState<string>('All');

  const filteredFavorites = filter === 'All' 
    ? favorites 
    : favorites.filter(f => f.category === filter);

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
