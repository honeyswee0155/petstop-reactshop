import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Rating from '../Rating';

const ProductCard = ({ product, onAddToCart }) => {
  // Handle cases where the product might not have all fields
  const primaryImage = product.image_urls?.length > 0 ? product.image_urls[0] : product.image || '';
  const ratingValue = product.rating || 0;
  const reviewCount = product.review_count || product.numReviews || 0;
  const inStock = product.stock > 0;

  return (
    <Card className="my-3 p-3 rounded h-100">
      <Link to={`/product/${product.id}`}>
        <Card.Img 
          src={primaryImage} 
          variant="top" 
          alt={product.name}
          onError={(e) => {
            e.target.src = '/images/default-product.png'; // fallback image
          }}
        />
      </Link>

      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product.id}`} className="text-decoration-none">
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
          {product.weight && (
            <Card.Text as="div" className="text-muted small">
              {product.weight}
            </Card.Text>
          )}
          {product.breed_size && (
            <Card.Text as="div" className="text-muted small">
              {product.breed_size}
            </Card.Text>
          )}
        </Link>

        <Card.Text as="div" className="my-2">
          <Rating
            value={ratingValue}
            text={`${reviewCount} ${reviewCount === 1 ? 'review' : 'reviews'}`}
          />
        </Card.Text>

        <Card.Text as="div" className="mt-auto">
          {product.original_price && (
            <span className="text-muted text-decoration-line-through me-2">
              ${product.original_price.toFixed(2)}
            </span>
          )}
          <span className="fw-bold">${product.price.toFixed(2)}</span>
        </Card.Text>

        <Button
          onClick={() => onAddToCart(product)}
          className="btn-block mt-2"
          disabled={!inStock}
          variant={inStock ? "primary" : "secondary"}
        >
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;