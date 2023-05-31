import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TabsContainer from "./components/tabs/TabsContainer";
import LoginPage from "./components/login/LoginPage";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <BrowserRouter>
    //     <Routes>
    //         <Route path="/ft-web" element={<TabsContainer/>} />
    //         <Route path="/login" element={<LoginPage/>} />
    //     </Routes>
    //     <App />
    // </BrowserRouter>
    <App />
);


