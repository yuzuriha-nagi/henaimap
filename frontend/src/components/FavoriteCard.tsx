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
        {item.category === 'Game' && '🎮'}
        {item.category === 'Music' && '🎵'}
        {item.category === 'Character' && '👤'}
      </div>
      <div className="card-content">
        <span className="card-category">{item.category}</span>
        <h3 className="card-title">{item.title}</h3>
        <p className="card-snippet">{item.description.substring(0, 60)}...</p>
      </div>
    </div>
  );
};

export default FavoriteCard;
