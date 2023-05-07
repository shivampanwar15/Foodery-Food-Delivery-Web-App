import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer'
export default function Navbar(props) {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const [loginView, setLoginView] = useState(false);
  const [signupView, setSignupView] = useState(false);



  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light " >
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-bold" to="/">
            <img src="glogo.png" style={{ height: "120px"}} alt=""/>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto ">
              <li className="nav-item">
                <Link className="btn btn-outline-dark mx-1"  aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-6 border rounded border-dark mx-2" aria-current="page" to="/myOrder">My Orders</Link>
                </li> : ""}



            </ul>

            {!(localStorage.getItem("authToken")) ?
              <div className='d-flex'>

                <div className="btn btn-outline-dark mx-1" onClick={() => { setLoginView(true) }}>Login</div>
                {loginView ? <Modal onClose={() => setLoginView(false)}>
                  <Login></Login>

                </Modal> : null}

                <div className="btn btn-outline-dark mx-1" onClick={() => { setSignupView(true) }}>Sign Up</div>
                {signupView ? <Modal onClose={() => setSignupView(false)}>
                  <Signup></Signup>

                </Modal> : null}

              </div>
              :
              <div>
                <div className='btn text-success mx-2' onClick={() => { setCartView(true) }} >
                  <ShoppingCartIcon />{" "}
                  <Badge className='ms-2' pill bg='danger'> {data.length} </Badge>
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}>
                  <Cart></Cart>

                </Modal> : null}
               
                <div className='btn btn-outline-danger mx-1' style={{ height: "48px"}} onClick={handleLogout} >
                <img className='rounded-circle' src="https://source.unsplash.com/random/800x800?boy" alt="" style={{ height: "35px", objectFit: "cover" }} /> Log Out
                </div>
               


              </div>
            }

          </div>
        </div>
      </nav>
    </div>
  )
} 
