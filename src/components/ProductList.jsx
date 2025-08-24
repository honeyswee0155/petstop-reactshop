import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './ProductList.css';

export default function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 6;

  // Debug mounting
  useEffect(() => {
    console.log("ProductList component mounted");
    return () => console.log("ProductList unmounted");
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get total count first
        const { count } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });

        setTotalProducts(count || 0);

        // Then fetch paginated results
        const { data, error: queryError } = await supabase
          .from('products')
          .select('*')
          .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

        if (queryError) throw queryError;
        setProducts(data || []);
        console.log('Fetched products:', data); // Debug fetched data
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
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

  if (loading && page === 1) {
    return (
      <div className="product-list-container">
        <div className="loading-message">Loading products...</div>
        <div className="product-grid">
          {[...Array(itemsPerPage)].map((_, i) => (
            <div key={i} className="product-card loading">
              <div className="product-image-container"></div>
              <div className="product-info">
                <div className="text-line"></div>
                <div className="text-line short"></div>
                <div className="text-line short"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!loading && products.length === 0) {
    return <div className="empty-message">No products found</div>;
  }

  return (
    <div className="product-list-container">
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img
                src={product.image_url || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={product.product_name}
                className="product-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.product_name}</h3>
              <p className="product-meta">Brand: {product.brand || 'N/A'}</p>
              <p className="product-meta">Category: {product.category || 'Uncategorized'}</p>
              <p className="product-price">
                ${(product.discounted_price || product.retail_price || 0).toFixed(2)}
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

      {totalProducts > itemsPerPage && (
        <div className="pagination">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>Page {page} of {Math.ceil(totalProducts / itemsPerPage)}</span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page >= Math.ceil(totalProducts / itemsPerPage)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}