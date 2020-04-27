import React from 'react';

import { ToastMessage } from '../../hooks/toast';
import { Container } from './styles';

import Toast from './toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map((message) => (
        <Toast message={message} key={message.id} />
      ))}
    </Container>
  );
};

export default ToastContainer;
