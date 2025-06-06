import React from 'react';
import ReactDOM from 'react-dom/client';
import './shared/styles/index.css';
import {RouterProvider} from "react-router-dom";
import {router} from "./app/index";
import {SpeechVoicesProvider} from "./app/contexts/SpeechVoicesContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SpeechVoicesProvider>
        <RouterProvider router={router}/>
    </SpeechVoicesProvider>
);

