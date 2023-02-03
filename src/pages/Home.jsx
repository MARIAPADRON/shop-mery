import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsThunk, filterCategoriesThunk } from "../store/slices/products.slice";
import { Row, Col, Button, Card, InputGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { filterByTermThunk } from "../store/slices/products.slice";


const Home = () => {
    const dispatch = useDispatch()
    const products = useSelector(state=>state.products)
    const[categories, setCategories]= useState([])
    const [searchByName, setSearchByName] = useState("")

    useEffect(()=>{
        dispatch(getProductsThunk())
        axios
        .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
        .then(resp=>setCategories(resp.data.data.categories))
        .catch(error=>console.error(error))
    }, [])

    const filterByTerm =()=>{
        dispatch(filterByTermThunk(searchByName))
    }
    
        return(
            <div className="home">
                <h1>Welcome!  </h1>
               
                    <InputGroup className="mb-3 input-search">
                        <InputGroup.Text 
                        id="basic-addon1"
                        as={Button}
                        onClick={filterByTerm}
                        ><i className="fa-solid fa-magnifying-glass" ></i></InputGroup.Text>
                        <Form.Control
                        placeholder="Search Products"
                        aria-label="Search Products"
                        aria-describedby="basic-addon1"
                        value={searchByName}
                        onChange={(e)=>setSearchByName(e.target.value)}
                        />
                    </InputGroup>
                
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
                                <div className="img-wrapper">  
                                <Card.Img className="img1"
                                variant="top" 
                                src={productsItem.productImgs?.[1]} 
                                />
                                <Card.Img className="img2"
                                variant="top" 
                                src={productsItem.productImgs?.[0]} 
                                />
                                </div>
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