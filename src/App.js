import { Navbar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Create from './components/Create.js';
import Read from './components/Read.js';
import './App.css';

export default function App() {
  return (
    <div className='App'>
      <Navbar />
      <h1 className="header-content" >
        User Management System
      </h1>
      <Routes className="routes">
        <Route exact path="/" element={<Read />} />
        <Route exact path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}