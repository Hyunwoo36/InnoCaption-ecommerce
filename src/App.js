import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './App.css';
import ProductList from './components/ProductList';
import landingPageImg from './assets/innocaption_landing_page.png';
import Header from './components/Header';
import CartSidebar from './components/CartSideBar';

function App() {

  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const [cartProducts, setCartProducts] = useState([]);

  return (
    <Container>
      <Header
        showProductList={showProductList}
        setShowProductList={setShowProductList}
        showCart={showCart}
        setShowCart={setShowCart}
      />
      <CartSidebar
        showCart={showCart}
        setShowCart={setShowCart}
        cartItems={cartProducts}
        setCartItems={setCartProducts}
      />

      {!showProductList ? (
        <div className='landing-image-container'>
          <img src={landingPageImg} alt="landing" className="landing-image" />
        </div>
      ) : (
        <ProductList
          setCartProducts={setCartProducts}
          cartProducts={cartProducts}
        />
      )}

    </Container>
  );
}
export default App;