// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ApplicationRoutes from './Routes/ApplicationRoutes';
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ApplicationRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
