import React from 'react';
import { Image } from 'react-native';

import { Container, Title } from './styles';

import logoImg from '../../assets/logo.png';

// Components
import Button from '../../components/Button';
import Input from '../../components/Input';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Faça seu logon</Title>
      <Input name="email" icon="mail" placeholder="Email" />
      <Input name="password" icon="lock" placeholder="password" />
      <Button onPress={() => console.log('Clickou')}>Entrar</Button>
    </Container>
  );
};

export default SignIn;
