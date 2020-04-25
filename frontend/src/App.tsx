import React from 'react';

import CreateGlobalStyles from './styles/global';

import SignIn from './pages/sigin';

const App: React.FC = () => (
  <>
    <CreateGlobalStyles />
    <SignIn />
  </>
);

export default App;
