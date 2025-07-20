import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductDetails, addToCart } from '../redux/actions';
import { Row, Col, Image, ListGroup, Card, Button, Form, Badge } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    dispatch(addToCart(product, qty));
    navigate('/cart');
  };

  // Calculate discount percentage if original_price exists
  const discountPercentage = product?.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button onClick={() => navigate(-1)} className="mb-4" variant="light">
        Go Back
      </Button>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : product ? (
        <>
          <Row className="mb-4">
            <Col md={6}>
              <div className="product-gallery">
                <Image 
                  src={product.image_urls?.[0] || product.image} 
                  alt={product.name} 
                  fluid 
                  className="main-image mb-3"
                />
                <div className="thumbnail-container d-flex">
                  {product.image_urls?.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      thumbnail
                      className="me-2"
                      style={{ width: '80px', cursor: 'pointer' }}
                    />
                  ))}
                </div>
              </div>
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item className="border-0 pb-1">
                  <h1 className="product-title">{product.name}</h1>
                  {product.brand && (
                    <p className="text-muted">Brand: {product.brand}</p>
                  )}
                </ListGroup.Item>

                <ListGroup.Item className="border-0 py-2">
                  <div className="d-flex align-items-center">
                    <Rating
                      value={product.rating || 0}
                      text={`${product.review_count || product.numReviews || 0} reviews`}
                    />
                    {product.life_stage && (
                      <Badge bg="info" className="ms-3">
                        {product.life_stage}
                      </Badge>
                    )}
                    {product.breed_size && (
                      <Badge bg="secondary" className="ms-2">
                        {product.breed_size}
                      </Badge>
                    )}
                  </div>
                </ListGroup.Item>

                <ListGroup.Item className="border-0 py-2">
                  <div className="price-container">
                    {product.original_price && (
                      <>
                        <span className="text-muted text-decoration-line-through me-2">
                          ${product.original_price.toFixed(2)}
                        </span>
                        {discountPercentage > 0 && (
                          <Badge bg="danger" className="me-2">
                            {discountPercentage}% OFF
                          </Badge>
                        )}
                      </>
                    )}
                    <h3 className="d-inline">${product.price.toFixed(2)}</h3>
                  </div>
                  <div className="mt-1">
                    <span className="text-muted">{product.weight}</span>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item className="border-0 py-2">
                  <h5>Description</h5>
                  <p>{product.description}</p>
                </ListGroup.Item>

                {product.features?.length > 0 && (
                  <ListGroup.Item className="border-0 py-2">
                    <h5>Key Features</h5>
                    <ul>
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              {product.ingredients?.length > 0 && (
                <Card className="mb-4">
                  <Card.Header as="h5">Ingredients</Card.Header>
                  <Card.Body>
                    <ul>
                      {product.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              )}
            </Col>
            <Col md={6}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price.toFixed(2)}</strong>
                        {product.original_price && (
                          <small className="text-muted text-decoration-line-through ms-2">
                            ${product.original_price.toFixed(2)}
                          </small>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.stock > 0 ? (
                          <span className="text-success">In Stock</span>
                        ) : (
                          <span className="text-danger">Out of Stock</span>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.stock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(Math.min(product.stock, 10)).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="w-100"
                      variant="primary"
                      disabled={product.stock <= 0}
                    >
                      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <Message variant="info">Product not found</Message>
      )}
    </div>
  );
};

export default ProductDetail;