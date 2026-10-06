import { routePath } from './utilities/paths';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/barlow-condensed/latin-700.css';
import '@fontsource/barlow-condensed/latin-800.css';
import './styles/tokens.css';
import './styles/global.css';
import './styles/sections.css';
import './styles/interactions.css';
import { App } from './App';

const root = document.getElementById('root')!;
const app = (
  <React.StrictMode>
    <App path={routePath(window.location.pathname)} />
  </React.StrictMode>
);
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
