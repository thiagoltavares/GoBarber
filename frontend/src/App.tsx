import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import CreateGlobalStyles from './styles/global';

import Routes from './routes';

import AppProvider from './hooks/index';

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>

    <CreateGlobalStyles />
  </Router>
);

export default App;
