import React from 'react';
import { Image } from 'react-native';
import { Container, Title } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';

import logImg from '../../assets/logo.png';

const SigIn: React.FC = () => {
  return (
    <Container>
      <Image source={logImg} />

      <Title>Log on</Title>

      <Input name="email" icon="mail" placeholder="E-mail" />

      <Input name="password" icon="lock" placeholder="password" />

      <Button
        onPress={() => {
          console.log('deu');
        }}
      >
        Entrar
      </Button>
    </Container>
  );
};

export default SigIn;
