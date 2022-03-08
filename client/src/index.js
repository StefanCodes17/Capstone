import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import HomePage from './pages/Home';

import './assets/main.css'
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'))