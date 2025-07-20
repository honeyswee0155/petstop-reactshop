import React from "react";
import { Link } from "react-router-dom";

export default function Page() {
  return (
    <div className="container">
      <p className="message">Your purchase was successful</p>
      <Link to="/" className="button">
        Back to products
      </Link>
    </div>
  );
}
