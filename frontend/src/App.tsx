import React from 'react';
import './App.css';

import {Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./routes";

import {About, PageNotFound, Login, MapPage} from "./pages";

function App() {
  return (
    <Routes>
        <Route path="/" element={
            <ProtectedRoute>
                <MapPage />
            </ProtectedRoute>
        } />
        <Route path="/login/" element={ <Login /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="*" element={<PageNotFound/>} />
    </Routes>
  );
}

export default App;
