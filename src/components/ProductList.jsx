// src/components/ProductList.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.product_name} added to cart!`);
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card bg-white border-light p-2">
            <div className="product-image-container">
              <img
                src={product.image_url || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={product.product_name || 'Product'}
                className="product-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                }}
              />
            </div>
            <div className="product-info text-dark">
              <h3>{product.product_name || 'Product Name'}</h3>
              <p>Brand: {product.brand || 'Not specified'}</p>
              <p>Category: {product.category || 'Uncategorized'}</p>
              <p className="product-price text-primary">
                Price: ${Number(product.discounted_price || product.retail_price || 0).toFixed(2)}
              </p>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button 
          onClick={() => setPage(p => Math.max(p - 1, 1))} 
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button 
          onClick={() => setPage(p => p + 1)} 
          disabled={products.length < itemsPerPage}
        >
          Next
        </button>
      </div>
    </>
  );
}