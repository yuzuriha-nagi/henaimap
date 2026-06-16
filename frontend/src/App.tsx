import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Admin from './pages/Admin';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>My Favorites</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/admin">Add New</a>
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/admin" element={<Admin />} />
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
