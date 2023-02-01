
import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react'
import axios from "axios";
import { useDispatch, useSelector} from "react-redux";
import { setIsLoading } from "../store/slices/isLoading.slice";
import {Button, Col, Row, ListGroup} from 'react-bootstrap'
import { filterCategoriesThunk } from "../store/slices/products.slice";
import { createProductThunk } from "../store/slices/purchases.slice";

const ProductsDetail = () => {

 const {id} = useParams()
    const [detail, setDetail]= useState({})
    const dispatch = useDispatch()
   {  /*const productsRelated = useSelector((state)=> state.products)*/}
    const [rate, setRate] = useState (1)
    const navigate = useNavigate()

    useEffect(()=>{

        dispatch (setIsLoading(true))
        
        axios
            .get(`https://e-commerce-api.academlo.tech/api/v1/products/${id}/`)
            .then(resp=>{
            setDetail(resp.data.data.product)
            dispatch(filterCategoriesThunk(resp.data.data.products.category.id))})
            .catch(error=>console.error(error))
            .finally(()=>dispatch (setIsLoading(false)))
            
    }, [id])

    const addToPurchases = () =>{
      const token = localStorage.getItem("token")
      if(token){
        const products ={
          id : detail.id,
          quantity : rate
      }
      
      dispatch (createProductThunk(products))
    }else{
      navigate("/login")
    }
  }

    return(
        <div>
            <h1>{detail.title}</h1>
            <p>{detail.category}</p>
            <p><span>Price: </span>{detail.price}</p>
            <Button className="mb-3" onClick={addToPurchases}>Add to Cart</Button>
            <div>
              <Button onClick={()=> setRate(rate - 1)}>-</Button>
              {rate}
              <Button onClick={()=> setRate(rate + 1)}>+</Button>
            </div>
            
            <Row>
                <Col lg={9}>
                  <img src={detail.productImgs?.[0]} alt="" />
                  <img src={detail.productImgs?.[1]} alt="" />
                  <img src={detail.productImgs?.[2]} alt="" />
                  <p>{detail.description}</p>
                </Col>

              {/*<Col lg="3">
                <h3>Releated Products</h3>
                <ListGroup>
                  
                    
                    productsRelated?.map(productsItem => (
                      <ListGroup.Item key={productsItem.id}>
                        {productsItem.title}
                      </ListGroup.Item>
                    ))
                    
                  
                </ListGroup>
              </Col>*/}
            </Row>
           
        </div>
    );
}
export default ProductsDetail;