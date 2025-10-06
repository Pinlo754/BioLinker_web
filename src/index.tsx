import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider } from 'react-router-dom';
import routers from './routers/router'; 
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
    <RouterProvider router={routers}/>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

