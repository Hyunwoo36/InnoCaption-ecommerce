import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Pagination } from 'react-bootstrap';

import '../App.css';

function ProductList({ setCartProducts, cartProducts }) {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // fake apis

    async function addToCart(product) {
        try {
            const res = await axios.post(`https://dummyjson.com/products/add`, { product });
            if (res.status === 200) {
                // update the cart
                setCartProducts(current => [...current, { ...product, quantity: 1 }]);
                console.log('Product Added to Cart: ');
            }
        } catch (e) {
            console.log("Error occured when add to cart:", e);
        }
    }

    useEffect(() => {
        const productsPerPage = 12; // 4 products per row, 3 rows
        const skip = (currentPage - 1) * productsPerPage;

        const fetchData = async () => {
            try {
                const res = await axios.get(`https://dummyjson.com/products?skip=${skip}&limit=${productsPerPage}`);
                setProducts(res.data.products);
                const totalProducts = res.data.total;
                setTotalPages(Math.ceil(totalProducts / productsPerPage));
            } catch (e) {
                console.log("error fetching data:", e);
            }
        };

        fetchData();
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container>
            <Row>
                {products.slice(0, 12).map(product => (
                    <Col sm={12} md={6} lg={4} xl={3} key={product.id}>
                        <Card className="mb-3 product-card">
                            <Card.Img variant="top" src={product.thumbnail} className='product-card-img' />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <div className='flex-row2'>
                                    <Card.Text className='bold'>${product.price}</Card.Text>
                                    {cartProducts.some(cartItem => cartItem.id === product.id) ? (
                                        <Button variant="success" disabled>Added ✓</Button>
                                    ) : (
                                        <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Pagination>
                        {[...Array(totalPages).keys()].map(number => (
                            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handlePageChange(number + 1)}>
                                {number + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductList;