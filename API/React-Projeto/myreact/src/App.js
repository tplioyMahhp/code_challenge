import React, { } from 'react';
import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import ListHab from "./pages/listhab";
import CriaHab from './pages/criarhabito';
import EditarHab from './pages/editarhab';

function App() {
  return (
    <div className="vh-100 gradient-custom">
    <div className="container">
      <h1 className="page-header text-center">Hábitos do dia a dia</h1>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListHab />} />
          <Route path="/addnovohabito" element={<CriaHab />} />
          <Route path="habito/:id/editar" element={<EditarHab />} />
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;