import React from 'react';
import { Image } from 'react-native';
import { Container, Title } from './styles';

import logImg from '../../assets/logo.png';

const SigIn: React.FC = () => {
  return (
    <Container>
      <Image source={logImg} />
      <Title>Log on</Title>
    </Container>
  );
};

export default SigIn;
