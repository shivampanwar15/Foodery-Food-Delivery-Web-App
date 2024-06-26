import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
       
        let response = await fetch(`${process.env.REACT_APP_DOMAIN}/foodData`, {
            method: "POST",
           // mode:'no-cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        
        setFoodItem(response[0]);
        setFoodCat(response[1]);

    }
    useEffect(() => {
        loadData();
    }, [])

    return (
        <div>
            <div> <Navbar /></div>
            <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "center !important" }}>
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{ zIndex: "2" }}>

                        <div className="d-flex justify-content-ccenter">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                            <button className="btn btn-outline-success text-white" type="submit"> Search </button>
                        </div>

                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/300x300?biryani" className="d-block w-100" alt="..." style={{ filter: "brightness(60%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300x300?pizza" className="d-block w-100" alt="..." style={{ filter: "brightness(60%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300x300?rice" className="d-block w-100" alt="..." style={{ filter: "brightness(60%)" }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                <div />
            </div>

                <div className="container" style={{fontFamily : 'Gloria Hallelujah'}}>

                    {foodCat !== [] ? foodCat.map((data) => {
                        return (
                            <div className="row mb-3">
                                <div key={data._id} className="fs-3 m-3"> {data.CategoryName} </div>
                                <hr />
                                {
                                    foodItem !== [] ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))).map((filterItems) => {

                                        return (
                                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                <Card
                                                    foodItem = {filterItems}
                                                    options = {filterItems.options[0]}
                                                    
                                                ></Card>
                                            </div>
                                        )
                                    }):<div>Please wait 1-2 minutes to load backed. Free instances spin down after periods of inactivity</div>
                                }
                            </div>
                        )
                    }) : <div>Please wait for few seconds. Backend take some time to load </div>


                    }
                    

                </div>
                <div> <Footer /> </div>
            </div>
        </div>
    )
}
