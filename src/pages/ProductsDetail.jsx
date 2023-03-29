
import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import { useDispatch, useSelector} from "react-redux";
import {Button, Col, Row, ListGroup} from 'react-bootstrap';
import { getProductsThunk } from "../store/slices/products.slice";
import { createProductThunk } from "../store/slices/cart.slice";
import Carousel from 'react-bootstrap/Carousel';


const ProductsDetail = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const [rate, setRate] = useState (1)
    const navigate = useNavigate()
    
    useEffect(()=>{

      dispatch(getProductsThunk())
      
    }, [id])

    const allProducts = useSelector((state)=>state.products)
    const detail = allProducts.find((products)=>products.id === Number(id))
    const productsRelated = allProducts.filter(
      (products) => products.category.name === detail.category.name
    )

    console.log(detail)
    const addToPurchases = () =>{
      const token = localStorage.getItem("token")
      if(token){
        const products ={
          productId : detail?.id,
          quantity : rate
      }
      
      dispatch (createProductThunk(products))
    }else{
      navigate("/login")
    }
  }

    return(
      <div>
        <h1>{detail?.title}</h1>
        <p>{detail?.category.name}</p>
        <div className="left-top">  
          <Button className="mb-3" onClick={addToPurchases}>Add to Cart</Button>
          <div>
            <Button className="btn-add" onClick={()=> setRate(rate - 1)} disabled = { rate <= 0}>-</Button>
            { rate } 
            <Button className="btn-add" onClick={()=> setRate(rate + 1)}>+</Button>
          </div>
        </div>
      
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 img-carrusel"
              src={detail?.productImgs?.[0]} 
              alt="First slide" 
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 img-carrusel"
              src={detail?.productImgs?.[1]} 
              alt="Second slide" 
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 img-carrusel"
              src={detail?.productImgs?.[2]} 
              alt="Third slide" 
            />
          </Carousel.Item>
        </Carousel>
              
        <p className="description">{detail?.description}</p>
        <p className="price">Price: U$S {detail?.price}</p>
        <Row>
          <Col lg="3">
            <h3>Releated Products</h3>
            <ListGroup>                    
                {productsRelated?.map(productsItem => (
                  <ListGroup.Item key={productsItem?.id}>
                    {productsItem?.title}
                  </ListGroup.Item>
                )) }
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
}
export default ProductsDetail;