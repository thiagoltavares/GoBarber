import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <>
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <form>
          <h1>Fala seu logon</h1>

          <input type="email" placeholder="E-mail" />

          <input type="password" placeholder="password" />

          <button type="submit">Entrar</button>

          <a href="forgot">Recover Password</a>
        </form>

        <a href="#">
          <FiLogIn />
          Create Account
        </a>
      </Content>
      <Background />
    </Container>
  </>
);

export default SignIn;
