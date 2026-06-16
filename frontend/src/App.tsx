import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>My Favorites</Link></h1>
          <nav>
            <Link to="/">Home</Link>
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>&copy; 2026 My Favorite Things</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
