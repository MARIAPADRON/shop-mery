import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlertError from '../components/AlertError';


const Login = () => {
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const navigate = useNavigate()
    const [alert, setAlert]=useState(false)


    const handleSubmit=(e)=>{
        e.preventDefault()
        const data ={
            email,
            password 
        }
       axios
       .post("https://shop-back-lqyj.onrender.com/users/login", data)
       .then(resp=>{
        localStorage.setItem("token", resp.data.token)
        navigate("/")
        })
       .catch(error=>{
        console.error(error)
        setAlert(true)
       })
    }

    return(
        <div className='login'>  
            <Card style={{maxWidth:500, margin: "3rem auto", padding: "2rem"}}> 
                <Form onSubmit={(e)=>handleSubmit(e)}>
                    <h1>Login</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button className ="btn btn-outline-warning" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card>
            <AlertError
                isVisible={alert}
                dismiss={()=>setAlert(false)}
            />  
        </div>
    );
}
export default Login;