import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer'
import { FaMapMarkerAlt } from "react-icons/fa";
export default function Navbar(props) {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const [loginView, setLoginView] = useState(false);
  const [signupView, setSignupView] = useState(false);
  const [address, setAddress]  = useState("Loading...");


  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  }
  

  const Fetch_Location = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
  console.log(latitude,longitude)
        // Replace 'YOUR_API_KEY' with your actual Google Maps API key
        //const apiKey = 'YOUR_API_KEY';
        const apiUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`;
  
        // Make the API request
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            if(data){
                setAddress(data.display_name)
              
            }
            else{
              address = "Unable to Locate"
              console.log(address)
            }
              
          })
          .catch((error) => {
            console.error('Error fetching address:', error);
          });
      },
      (error) => {
        console.error('Error fetching location:', error.message);
      }
    );
  };

  useEffect(() => {
    Fetch_Location();
}, [])

  


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
                <Link className="btn btn-outline-dark py-2 px-2 mx-2"  aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="btn btn-outline-dark py-2 px-2 mx-2" aria-current="page" to="/myOrder">My Orders</Link>
                </li> : ""}



                <span className='py-2 mx-5'><FaMapMarkerAlt/> {address}</span>

            </ul>

            {!(localStorage.getItem("authToken")) ?
              <div className='d-flex'>

                <div className="btn btn-outline-dark mx-1" onClick={() => { setLoginView(true) }}>Login</div>
                {loginView ? <Modal onClose={() => setLoginView(false)}>
                  <Login>
                  
                  </Login>

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
