import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { Container,Row,Col,Button,Image,Badge } from 'react-bootstrap';
import { IoIosStar  } from "react-icons/io";
import '../styles/ProductDetails.css';

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
            <Col sm={8}>
            {product.product_image && (
                <div className="product-images">
                    {product.product_image.map((image) =>(
                        <Image src={image.image}/>
                    ))}
                </div>
            )}
            </Col>
            <Col>
                <h1>{product.name}</h1>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='m-0'>{product.description}</p>
                    <Button className='rating-button'>4.8 <IoIosStar  className="star-icon" /> | 5</Button>
                </div>
                <hr />
                {product.product_attribute && product.product_attribute.map((attr) => (
                    <p>
                        <strong>{attr.attribute_name}:</strong> {attr.attribute_value}
                    </p>
                    // <Badge bg="info" className='me-2 mb-2'>{attr.attribute_name}: {attr.attribute_value}</Badge>
                ))}
                <h4>₹{product.price}</h4>
                <Button className='mt-2' onClick={handleAddToCart}>Add to Cart</Button>
            </Col>
        </Row>
    </Container>
  )
}

export default ProductDetails