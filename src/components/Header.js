import React from 'react';
import { Button } from 'react-bootstrap';
import logo from '../assets/icon/innocaption-logo-blue.png';
import CartIcon from '../assets/icon/cart.png';

function Header({ showProductList, setShowProductList, showCart, setShowCart }) {
    return (
        <div className="header">
            <div className="logo">
                <img src={logo} alt='Logo' style={{ maxWidth: '20rem', height: 'auto' }} />
            </div>
            <div style={{ display: 'flex' }}>
                {showProductList ?
                    <img
                        src={CartIcon}
                        alt="cartImg"
                        className='cartImg'
                        onClick={() => setShowCart(!showCart)} />
                    : <></>
                }

                <Button
                    className="toggle-view-btn"
                    variant="primary"
                    onClick={() => setShowProductList(!showProductList)}>
                    {showProductList ? "Go Back" : "Shop Now"}
                </Button>
            </div>

        </div>
    );
}

export default Header;