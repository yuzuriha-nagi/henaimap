import { useParams, useNavigate } from 'react-router-dom';
import { favoritesData } from '../data';

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const item = favoritesData.find(f => f.id === id);

  if (!item) return (
    <div className="detail-view">
      <button onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>&larr; Back to List</button>
      <div>Item not found.</div>
    </div>
  );

  return (
    <div className="detail-view">
      <button onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>&larr; Back to List</button>
      <div className="detail-header">
        <div className="detail-image">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.title} style={{ width: '100%', borderRadius: '8px' }} />
          ) : (
            <>
              {item.category === 'Game' && '🎮'}
              {item.category === 'Music' && '🎵'}
              {item.category === 'Character' && '👤'}
            </>
          )}
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
