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
            <div className="home">
                <h1>Welcome!  </h1>
                <br />
                
                {
                    categories.map(category=>(
                        <Button 
                        key={category.id} 
                        variant="secondary"
                        onClick={()=>dispatch(filterCategoriesThunk(category.id))}
                        >
                        {category.name}
                        </Button>
                    ))
                }
                <Button
                onClick={()=>dispatch(getProductsThunk())}
                variant="light"
                >See all</Button>
                
                <Row xs={1} md={2} lg={3}>
                    {
                        products?.map(productsItem =>(
                        <Col key={productsItem.id}> 
                            <Card className="card">
                                <Card.Img 
                                variant="top" 
                                src={productsItem.productImgs?.[0]} 
                                />
                                <Card.Body className="body">
                                    <Card.Title>{productsItem.title}</Card.Title>
                                    <Button variant="warning" as={Link} to={`/products/${productsItem.id}`}>See detail</Button>
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