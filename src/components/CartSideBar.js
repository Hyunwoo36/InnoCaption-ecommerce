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
        return cartItems.reduce((total, item) => {
            // check for no input from user
            const quantity = isNaN(item.quantity) ? 0 : item.quantity;
            return total + item.price * quantity;
        }, 0);
    };

    const handleOrderNow = () => {
        window.alert("Thanks for purchasing. This React project was done by Hyun Woo Choi, h2choi@ucsd.edu.");
        setCartItems([]);
    }

    return (
        <div className={`cart-sidebar ${showCart ? 'show' : ''}`}>
            <div className="flex-row2 padding1 borderwidth1">
                <h2>My Cart</h2>
                <Button onClick={() => setShowCart(false)}>Close</Button>
            </div>
            <div className="flex-row padding1">
                <div className="sidebarSubTitle">Product Name</div>
                <div className="sidebarSubTitle">Quantity</div>
            </div>
            {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                    <span>{item.title}</span>
                    <div className="flex-row">
                        <Form.Control
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            min="1"
                            style={{ width: '60px', display: 'inline', margin: '0 10px' }}
                        />
                        <Button variant="danger" onClick={() => deleteItem(item.id)}>Delete</Button>
                    </div>

                </div>
            ))}
            <div className='borderTop flex-row'>
                <div className='totalText'>Total: ${getTotalAmount()}</div>
                <Button variant="success" onClick={handleOrderNow}>Order Now!</Button>
            </div>


        </div>
    );
};

export default CartSidebar;