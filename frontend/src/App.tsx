import React from 'react';

import CreateGlobalStyles from './styles/global';
import SignIn from './pages/SignIn';
import ToastContainer from './components/ToastContainer';
// import SignUp from './pages/SignUp';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <ToastContainer />

    <CreateGlobalStyles />
  </>
);

export default App;
