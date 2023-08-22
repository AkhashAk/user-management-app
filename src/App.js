import { Navbar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Create from './components/Create.js';
import Read from './components/Read.js';
import './App.css';
import { Header } from 'semantic-ui-react';

export default function App() {
  return (
    <div className='App'>
      <Navbar />
      <Header textAlign='center' size='huge'>
        CRUD Operation
      </Header>
      <Routes className="routes">
        <Route exact path="/" element={<Read />} />
        <Route exact path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}