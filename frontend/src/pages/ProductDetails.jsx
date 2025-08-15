import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { Container,Row,Col,Button,Image } from 'react-bootstrap';
import '../styles/ProductDetails.css'

const ProductDetails = () => {
    const { id } = useParams();
    const [product,setProduct] = useState(null);

    useEffect(() => {
        api.get(`product/${id}/`)
        .then((res) => {
            setProduct(res.data);
        })
        .catch((err) => console.error("Error fetching product: ",err));
    },[id]);

    const handleAddToCart = () => {
        api.post("cartItems/",{
            product : product.id,
            quantity : 1
        })
        .then(() => alert("Product added to cart!"))
        .catch((err) => {
            console.error(err);
            alert("Failed to add to cart.Are you logged in?");
        });
    };

    if (!product) return <h2> Loading..........</h2>
return (
    <Container className='mt-4'>
        <Row>
            <Col sm={6}>
            {product.product_image && (
                <div className="product-images">
                    {product.product_image.map((image) =>(
                        <Image src={image.image} rounded/>
                    ))}
                </div>
            )}
            </Col>
            <Col>
                <h1>{product.name}</h1>
                <h4>₹{product.price}</h4>
                <p>Description: <br/>{product.description}</p>
                <Button onClick={handleAddToCart}>Add to Cart</Button>
            </Col>
        </Row>
    </Container>
  )
}

export default ProductDetails