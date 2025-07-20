import React from 'react';
import { Container } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container className="my-4">
      <div className="w-100" style={{ maxWidth: '500px' }}>
        {children}
      </div>
    </Container>
  );
};

export default FormContainer;