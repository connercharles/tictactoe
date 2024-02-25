import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HallOfFame from './components/HallOfFame';
import Game from './components/Game';
import './App.css';

export const WinnersContext = createContext();

const App = () => {
  const [history, setHistory] = useState([]);

  return (
    <WinnersContext.Provider value={{history, setHistory}}>
      <Router>
        <div className="app">
          <nav className='navbar'>
            <Link to="/" className="logo">Tic Tac Toe</Link>
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/hall-of-fame">Hall of Fame</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" index element={<Game />} />
            <Route path="/hall-of-fame" element={<HallOfFame />} />
          </Routes>
        </div>
      </Router>
    </WinnersContext.Provider>
  );
};

export default App;
