import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider } from 'react-router-dom';
import routers from './routers/router'; 
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="282941844073-346c3opamiao66aglfr3212jjrkhv0q2.apps.googleusercontent.com">
    <RouterProvider router={routers}/>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

