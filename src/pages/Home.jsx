import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsThunk, filterCategoriesThunk } from "../store/slices/products.slice";
import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";


const Home = () => {
    const dispatch = useDispatch()
    const products = useSelector(state=>state.products)
    const[categories, setCategories]= useState([])

    useEffect(()=>{
        dispatch(getProductsThunk())
        axios
        .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
        .then(resp=>setCategories(resp.data.data.categories))
        .catch(error=>console.error(error))
    }, [])

        return(
            <div>
                <h1>Welcome to Shop - Mery!  </h1>
                <h3>Home</h3>
                
                {
                    categories.map(category=>(
                        <Button 
                        key={category.id} 
                        variant="primary"
                        onClick={()=>dispatch(filterCategoriesThunk(category.id))}
                        >
                        {category.name}
                        </Button>
                    ))
                }
                <Button
                onClick={()=>dispatch(getProductsThunk())}
                variant="secondary"
                >See all</Button>
                
                <Row xs={1} md={2} lg={3}>
                    {
                        products?.map(productsItem =>(
                        <Col key={productsItem.id}> 
                            <Card>
                                <Card.Img 
                                variant="top" 
                                src={productsItem.productImgs?.[0]} 
                                />
                                <Card.Body>
                                    <Card.Title>{productsItem.title}</Card.Title>
                                    <Card.Text>{productsItem.description}</Card.Text>
                                    <Button variant="primary" as={Link} to={`/products/${productsItem.id}`}>See detail</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        ))
                    }
                </Row>
            </div>
        );
}
export default Home;