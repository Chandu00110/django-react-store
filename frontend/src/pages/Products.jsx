import React, { useEffect, useState } from "react";
import fetchAPI from "../api/fetchAPI";
import ProductCard from "../components/ProductCard";

const Products = () => {

    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await fetchAPI(`product/`);
            
            if (res.status === 200) {
            setProducts(res.data.results);
            } else {
            console.error("Error fetching categories:", res.status, res.statusText);
            }
        } catch (err) {
            console.error("Network or server error while fetching categories:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    },[]);

    if (loading){
        return <p>Loading....</p>
    }
    
  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0px" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;