import { routePath } from './utilities/paths';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/barlow-condensed/latin-700.css';
import '@fontsource/barlow-condensed/latin-800.css';
import '@fontsource/bagel-fat-one/latin-400.css';
import './styles/tokens.css';
import './styles/global.css';
import './styles/sections.css';
import './styles/interactions.css';
import './styles/alebrije.css';
import './styles/hero.css';
import './styles/flavors.css';
import './styles/brand.css';
import './styles/visit.css';
import { App } from './App';

const root = document.getElementById('root')!;
const app = (
  <React.StrictMode>
    <App path={routePath(window.location.pathname)} />
  </React.StrictMode>
);
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
