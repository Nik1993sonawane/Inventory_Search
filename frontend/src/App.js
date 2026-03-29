/* eslint-disable react-hooks/exhaustive-deps */
// ================= FRONTEND (React) =================
// File: App.js

import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ q: "", category: "", minPrice: "", maxPrice: "" });

  const fetchData = async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`http://localhost:5000/search?${query}`);
    const result = await res.json();
    setData(result);
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="container">
      <h1>Inventory Search</h1>

      <div className="filters">
        <input placeholder="Search product" onChange={e => setFilters({...filters, q: e.target.value})} />

        <select onChange={e => setFilters({...filters, category: e.target.value})}>
          <option value="">All Categories</option>
          <option>Electronics</option>
          <option>Furniture</option>
          <option>Fashion</option>
        </select>

        <input type="number" placeholder="Min Price" onChange={e => setFilters({...filters, minPrice: e.target.value})} />
        <input type="number" placeholder="Max Price" onChange={e => setFilters({...filters, maxPrice: e.target.value})} />

        <button onClick={fetchData}>Search</button>
      </div>

       {data.length === 0 ? (
        <p>No results found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.product_name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
              </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;