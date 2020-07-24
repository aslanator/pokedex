import React from 'react';
import './App.scss';
import {Pokedex} from "./features/pokedex/Pokedex";
import {
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  return (
      <Router>
        <Pokedex />
      </Router>
  );
}

export default App;
