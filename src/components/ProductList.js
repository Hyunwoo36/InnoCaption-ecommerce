import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Pagination } from 'react-bootstrap';

import '../App.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

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
                                <div className='flex-row'>
                                    <Card.Text className='bold'>${product.price}</Card.Text>
                                    <Button variant="primary">Add to Cart</Button>
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