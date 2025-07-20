import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingAddress, savePaymentMethod } from '../redux/actions';
import { Form, Button, Col, Card } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [userInfo, navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h1 className="text-2xl font-bold mb-4">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type="radio"
                label="Stripe"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-4">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default CheckoutPage;