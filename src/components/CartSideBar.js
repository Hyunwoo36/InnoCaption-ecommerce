import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';

const CartSidebar = ({ showCart, setShowCart, cartItems, setCartItems }) => {

    // fake apis

    async function updateQuantity(itemId, newQuantity) {
        try {
            const res = await axios.put(`https://dummyjson.com/carts/${itemId}`, {
                quantity: newQuantity
            });
            if (res.status === 200) {
                const updatedCartItems = cartItems.map(item => {
                    return item.id === itemId ? { ...item, quantity: newQuantity } : item;
                });
                setCartItems(updatedCartItems);
                console.log('quantity updated!');
            }
        } catch (e) {
            console.log('Error occurred when update item:', e);
        }
    };


    async function deleteItem(itemId) {
        try {
            const res = await axios.delete(`https://dummyjson.com/products/${itemId}`);
            if (res.status === 200) {
                const updatedCartItems = cartItems.filter(item => item.id !== itemId);
                setCartItems(updatedCartItems);
            }
        } catch (e) {
            console.log('Error occured when deleting item:', e);
        }
    };

    // function to get total amount of the cart products
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