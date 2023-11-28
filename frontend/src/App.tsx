import React from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import {Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./routes";

import {About, PageNotFound, Login, MapPage} from "./pages";
import {store} from "./store/store";
import {Provider} from "react-redux";
import {Log} from "./logger";

function App() {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <MapPage/>
                    </ProtectedRoute>
                }/>
                <Route path="/login/" element={<Login/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/log" element={
                    <ProtectedRoute>
                        <Log />
                    </ProtectedRoute>
                } />
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </Provider>
    );
}

export default App;
