import './App.css';
import { HashRouter, Routes, Route, Form } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductsDetail from './pages/ProductsDetail'
import Purchases from './pages/Purchases';
import NavBar from './components/Navbar';
import Container from 'react-bootstrap/Container';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';
import ProtectedRoutes from './components/ProtectedRoutes';
import "bootswatch/dist/slate/bootstrap.min.css";

function App() {
  
  const isLoading = useSelector(state=>state.isLoading)

  return (
    <HashRouter>
       <NavBar/>
       {isLoading &&<Loader/>}
       
      <Container className='my-5'>
        <Routes>

          <Route
            path='/'
            element={<Home/>}
          />
          <Route
            path='/products/:id'
            element={<ProductsDetail/>}
          />
          <Route
            path='/login'
            element={<Login/>}
          />
          <Route element={<ProtectedRoutes/>}>   
            <Route
              path='/purchases'
              element={<Purchases/>}
            />
          </Route>
        </Routes>
      </Container>
    </HashRouter>
    
  )
}

export default App
