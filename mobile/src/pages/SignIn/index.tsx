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
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordButton,
  CreateAccount,
  CreateAccountButton,
} from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logImg from '../../assets/logo.png';

const SigIn: React.FC = () => {
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
              <Title>Log on</Title>
            </View>

            <Input name="email" icon="mail" placeholder="E-mail" />

            <Input name="password" icon="lock" placeholder="Password" />

            <Button
              onPress={() => {
                console.log('deu');
              }}
            >
              Sign In
            </Button>

            <ForgotPassword
              onPress={() => {
                console.log('deu');
              }}
            >
              <ForgotPasswordButton>Forgot password?</ForgotPasswordButton>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccount onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" color="#FF9000" />
        <CreateAccountButton>Create Account</CreateAccountButton>
      </CreateAccount>
    </>
  );
};

export default SigIn;
