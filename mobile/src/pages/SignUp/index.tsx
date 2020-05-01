import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { Container, Title, BackToSignIn, BackToSignInButton } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logImg from '../../assets/logo.png';

const SigUp: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logImg} />
            <View>
              <Title>Create your account</Title>
            </View>

            <Input name="name" icon="user" placeholder="Name" />

            <Input name="email" icon="mail" placeholder="E-mail" />

            <Input name="password" icon="lock" placeholder="Password" />

            <Button
              onPress={() => {
                console.log('Entrar');
              }}
            >
              Sign Up
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" color="#fff" />
        <BackToSignInButton>Back</BackToSignInButton>
      </BackToSignIn>
    </>
  );
};

export default SigUp;
