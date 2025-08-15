import { Button,Card,Carousel } from "react-bootstrap";
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <Card >
      {product.product_image && (
        <div className="card-img">
            <Carousel fade>
                {product.product_image.map((image) =>(
                    <Carousel.Item>
                        <Card.Img variant="top" className="" src={image.image} alt={product.name} />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
      )}
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>₹{product.price}</Card.Text>
        <Button href={`/products/${product.id}`} variant="primary">View Details</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard