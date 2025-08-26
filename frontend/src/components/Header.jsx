import React,{useState,useEffect} from 'react';
import { Container, Nav, Navbar, Form, InputGroup, FormControl,Button,ListGroup } from 'react-bootstrap';
import { CgProfile } from "react-icons/cg";
import { IoBagCheckOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import '../styles/Header.css';
import fetchAPI from '../api/fetchAPI';
import api from '../api/axios';

const Header = ({products,setProducts}) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const checkLogin = () => {
        const token = localStorage.getItem('access');
        setIsLoggedIn(!!token);
    }

    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setIsLoggedIn(false);
    }

    const fetchSearchResults = async (e) => {

        if (searchTerm.trim() !== '' && searchTerm.length > 2) {
            const res = await api.get(`product/`,{
                params : {
                    search : searchTerm
                }
            });
            setProducts(res.data.results);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        fetchSearchResults();
    },[searchTerm]);

    useEffect(() => {
        checkLogin();
    },[]);

  return (
    <Navbar expand="lg" className='bg-body-tertiary shadow-sm py-2'>
        <Container fluid className='align-items-center'>
            <Navbar.Brand href='/' className='fw-bold text-danger fs-4'> 🛒 MyShop </Navbar.Brand>

            <Navbar.Toggle aria-controls='basic-navbar-nav' />

            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto'></Nav>

                <Form className="d-flex search-form me-3" onSubmit={(e) => e.preventDefault()}>
                    <InputGroup>
                        <FormControl type='text' placeholder='search' className='search-input' value={searchTerm} onChange={(e) => handleSearch(e)} />
                        <InputGroup.Text className='search-icon'> <CiSearch size={20} /> </InputGroup.Text>
                    </InputGroup>
                </Form>

                <div className="d-flex align-items-center gap-3">
                    <Nav.Link href='/cart/'> <IoBagCheckOutline size={30} className='header-icon' /> </Nav.Link>


                    <div className="profile-menu">
                        <CgProfile size={30} className='header-icon' />
                        <ListGroup className='profile-dropdown'>
                            {isLoggedIn ? (
                                <>
                                    <ListGroup.Item><Nav.Link href='/orders/'>Orders</Nav.Link></ListGroup.Item>
                                    <ListGroup.Item><Nav.Link onClick={handleLogout}>Logout</Nav.Link></ListGroup.Item>
                                </>
                            ):(
                                <>
                                    <ListGroup.Item>
                                        <Button href='/login'> Login </Button>
                                    </ListGroup.Item>
                                </>
                            )}
                        </ListGroup>
                    </div>
                </div>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header