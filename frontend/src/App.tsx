import React from 'react';

import CreateGlobalStyles from './styles/global';
// import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App: React.FC = () => (
  <>
    <CreateGlobalStyles />
    <SignUp />
  </>
);

export default App;
