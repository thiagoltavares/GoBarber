import React from 'react';

import CreateGlobalStyles from './styles/global';
import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';

import AuthContext from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{ name: 'Thiago' }}>
      <SignIn />
    </AuthContext.Provider>
    <CreateGlobalStyles />
  </>
);

export default App;
