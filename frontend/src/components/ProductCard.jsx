import { Badge, Button,Card,Carousel } from "react-bootstrap";
import '../styles/ProductCard.css';
import { IoIosStar  } from "react-icons/io";

const ProductCard = ({ product }) => {

  const redirectToProductDetails = () => {
    window.location.href = `/products/${product.id}`;
  };

  return (
    <Card className="product-card m-2" onClick={redirectToProductDetails}>
      {product.product_image && (
        <div className="card-img">
            <Carousel fade indicators={false} controls={false}>
                {product.product_image.map((image) =>(
                    <Carousel.Item>
                        <Card.Img variant="top" className="" src={image.image_url} alt={product.name} />
                    </Carousel.Item>
                ))}
            </Carousel>
            <Badge className="product-badge">4.8 <IoIosStar  className="star-icon" /> | 5</Badge>
        </div>
      )}
      <Card.Body className="product-card-body">
        <Card.Title>{product.name.split(' ').slice(0, 2).join(' ')}</Card.Title>
        <Card.Text> {product.description.split(' ').slice(0, 3).join(' ')}... <br />₹{product.price} </Card.Text>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductCard