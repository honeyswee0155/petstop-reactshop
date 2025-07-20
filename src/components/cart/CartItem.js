import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItem } from '../../../redux/actions/cartActions';
import { Button, Image, Col, Row, Form } from 'react-bootstrap';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(item.product));
  };

  const updateCartHandler = (qty) => {
    dispatch(updateCartItem(item.product, Number(qty)));
  };

  return (
    <Row className="align-items-center mb-4 border-bottom pb-3">
      <Col md={2}>
        <Image src={item.image} alt={item.name} fluid rounded />
      </Col>
      <Col md={3}>
        <Link to={`/product/${item.product}`} className="text-decoration-none">
          {item.name}
        </Link>
      </Col>
      <Col md={2}>${item.price}</Col>
      <Col md={2}>
        <Form.Control
          as="select"
          value={item.qty}
          onChange={(e) => updateCartHandler(e.target.value)}
          className="form-select-sm"
        >
          {[...Array(item.countInStock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </Form.Control>
      </Col>
      <Col md={2}>
        <Button
          variant="light"
          onClick={removeFromCartHandler}
          className="btn-sm"
        >
          <i className="fas fa-trash text-danger"></i>
        </Button>
      </Col>
    </Row>
  );
};

export default CartItem;