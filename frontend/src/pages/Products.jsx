import React, { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

const Products = () => {

    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        api.get("product/")
        .then((res) => {
            setProducts(res.data.results);
            setLoading(false);
        })
        .catch((err) => {
            console.log("Error fetching the products:",err);
            setLoading(false);
        });
    },[]);

    if (loading){
        return <p>Loading....</p>
    }
    
  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;