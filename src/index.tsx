import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider } from 'react-router-dom';
import routers from './routers/router'; 
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="335718107254-f6o3qq8aj4qg6i1lrakdlmjd134pitcl.apps.googleusercontent.com">
    <RouterProvider router={routers}/>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

