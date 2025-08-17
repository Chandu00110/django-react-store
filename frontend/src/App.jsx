import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Header from "./components/Header";
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import Checkout from './pages/Checkout';

function App() {
  
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/register' element={<Register />} />
          <Route path="/verify/:uid/:token" element={<VerifyEmail />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
