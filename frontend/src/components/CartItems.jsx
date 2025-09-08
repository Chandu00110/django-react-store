import React,{useState,useEffect} from 'react';
import api from '../api/axios';
import fetchAPI from '../api/fetchAPI';
import {Card,Carousel,Badge} from 'react-bootstrap';
import { PiKeyReturnLight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";


const CartItems = ({loading,setLoading,setIsCartEmpty,setTotalPrice}) => {

    const [cartItems,setCartItems] = useState([]);

    const fetchCart = async () => {
        try{
            const data = await fetchAPI(`cartItems/`)
            if(data){
                setCartItems(data.data.results);
            }
        }
        catch(error) {
            if(error.response?.status === 401 ){
                alert("Please log in to view you cart");
            } else {
                alert("Error loading Cart.");
            }
        }
        finally {
            setLoading(false);
        }
    };

     const hadndleRemove = async (itemId) => {
        if(!window.confirm("Remove this item from your cart?")) return;
        try{
            await api.delete(`cartItems/${itemId}/`);
            setCartItems(cartItems.filter(item => item.id !== itemId));
        } catch (err) {
            console.error("Error removing item:",err.response?.data || err.message);
            throw err;
        }
    };
    
    const totalPrice = cartItems.reduce(
            (total,item) => total + item.product_price * item.quantity,
            0
        );
    setTotalPrice(totalPrice);

    const handleQuantity = async (e) => {
        const cartItemId = e.target.id;
        const newQuantity = parseInt(e.target.value, 10);

        // Validate input
        if (!cartItemId || isNaN(newQuantity)) {
            console.error("Invalid cart item ID or quantity.");
            return;
        }

        try {
            const res = await api.patch(`cartItems/${cartItemId}/`, {
            quantity: newQuantity
            });
        } catch (error) {
            console.error("Failed to update quantity:", error.response?.data || error.message);
        }
        finally{
            await fetchCart();
        }
    };


     useEffect(() => {
        fetchCart();
        cartItems.length === 0 ? setIsCartEmpty(false) : setIsCartEmpty(true);
    },[]);


    if (loading) return <p>Loading cart...</p>;


  return (
    <>
        {cartItems.map(item => (
            <Card className='cart-card' key={item.id}>
                <div className="item-images">
                    <Carousel fade controls={false} indicators={false}>
                        {item.product_images.map((image) =>(
                            <Carousel.Item>
                                <Card.Img variant="top" className="" src={image.image_url} alt={item.name} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                <Card.Body>
                    <Card.Title>{item.product_name}{item.id}</Card.Title>
                    <Card.Text>QTY × 
                        <select name={item.product_name} id={item.id} defaultValue={item.quantity} onChange={(e) => handleQuantity(e)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select> 
                    </Card.Text>
                    <Card.Text>₹{item.subtotal}</Card.Text>
                    <span><PiKeyReturnLight className='return-icon'/><b>14 days</b> return available</span>
                    <Badge onClick={() => hadndleRemove(item.id)} bg="danger"><RxCross2 /></Badge>
                </Card.Body>
            </Card>
        ))}
    </>
  )
}

export default CartItems