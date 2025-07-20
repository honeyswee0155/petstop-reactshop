import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Row, 
  Col, 
  ListGroup, 
  Image, 
  Button, 
  Card 
} from 'react-bootstrap';

const CartPage = ({ cartItems, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/booking'); // Changed to your booking page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Row>
        <Col md={8}>
          <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <div className="message">
              Your cart is empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row>
                    <Col md={2}>
                      <Image 
                        src={item.image_url || 'https://via.placeholder.com/150'} 
                        alt={item.product_name} 
                        fluid 
                        rounded 
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.id}`}>{item.product_name}</Link>
                    </Col>
                    <Col md={2}>
                      ${Number(item.discounted_price || item.retail_price || 0).toFixed(2)}
                    </Col>
                    <Col md={2}>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity || 1}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        className="form-control"
                      />
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)})
                  items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => 
                    acc + (item.quantity || 1) * Number(item.discounted_price || item.retail_price || 0), 
                    0
                  )
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;