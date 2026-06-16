import { FavoriteItem } from '../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  item: FavoriteItem;
}

const FavoriteCard = ({ item }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="favorite-card" onClick={() => navigate(`/detail/${item.id}`)}>
      <div className="card-image">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <>
            {item.category === 'Game' && '🎮'}
            {item.category === 'Music' && '🎵'}
            {item.category === 'Character' && '👤'}
          </>
        )}
      </div>
      <div className="card-content">
        <span className="card-category">{item.category}</span>
        <h3 className="card-title">{item.title}</h3>
      </div>
    </div>
  );
};

export default FavoriteCard;
