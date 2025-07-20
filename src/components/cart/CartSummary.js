import React from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CartSummary = ({ cartItems }) => {
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h3>
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
          </h3>
          $
          {cartItems
            .reduce((acc, item) => acc + item.qty * item.price, 0)
            .toFixed(2)}
        </ListGroup.Item>
        <ListGroup.Item>
          <Button
            type="button"
            className="w-100"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default CartSummary;