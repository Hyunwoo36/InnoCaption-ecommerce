import React from 'react';
import { Button, Form } from 'react-bootstrap';

const CartSidebar = ({ showCart, setShowCart, cartItems, updateQuantity, deleteItem }) => {
    const getTotalAmount = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className={`cart-sidebar ${showCart ? 'show' : ''}`}>
            <h2>My Cart Items</h2>
            {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                    <span>{item.title}</span>
                    <Form.Control
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        min="1"
                        style={{ width: '60px', display: 'inline', margin: '0 10px' }}
                    />
                    <Button variant="danger" onClick={() => deleteItem(item.id)}>Delete</Button>
                </div>
            ))}
            <div>Total: ${getTotalAmount()}</div>
            <Button onClick={() => setShowCart(false)}>Close</Button>
        </div>
    );
};

export default CartSidebar;