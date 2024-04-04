import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './App.css';
import ProductList from './components/ProductList';
import landingPageImg from './assets/innocaption_landing_page.png';
import Header from './components/Header';
import CartSidebar from './components/CartSideBar';

function App() {

  const [showProducts, setShowProducts] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const [cartItems, setCartItems] = useState([
    { id: 1, title: 'Product 1', quantity: 2, price: 10.99 }
  ]);

  const updateQuantity = (itemId, quantity) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: quantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const deleteItem = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <Container>
      <Header
        showProducts={showProducts}
        setShowProducts={setShowProducts}
        showCart={showCart}
        setShowCart={setShowCart}
      />
      <CartSidebar
        showCart={showCart}
        setShowCart={setShowCart}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        deleteItem={deleteItem}
      />

      {!showProducts ? (
        <div className='landing-image-container'>
          <img src={landingPageImg} alt="landing" className="landing-image" />
        </div>
      ) : (
        <ProductList />
      )}

    </Container>
  );
}
export default App;