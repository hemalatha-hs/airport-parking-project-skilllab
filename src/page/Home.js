import React,{useState} from 'react';
import {useEffect} from 'react';
import moment from 'moment';
import AirportSuggestions from "../component/AirportSuggestions";
import axios from 'axios';
//import {useNavigate} from 'react-router-dom';

const SearchForm = () =>{
    
    //const navigate = useNavigate();
    const today = moment().format('YYYY-MM-DD').toString()
    const tomorrow = moment().add(1,'days').format('YYYY-MM-DD').toString()
    const [departureAirport,setDepartureAirport] = useState('');
    const [parkingCheckIn,setParkingCheckIn] = useState(today);
    const [parkingCheckOut,setParkingCheckout] = useState(tomorrow);
    const [airports,setAirports] = useState([]);
    const [filteredAirports,setFilteredAirports] = useState('');

    //function to get airport data from the server
    const getAirports = async () => {
        try {
            const {data,status} = await axios.get('https://43.205.1.85:9009/v1/airports');
            if(status === 200 && data) {
                setAirports(data?.results ?? [])
            }else {
                setAirports([])
            }setLoading(false)
        }catch (error) {
            setLoading(false)
            console.log(error.message)
        }
     }

     //function to fetch airport data on component mount
     useEffect(() => {
        getAirports()
     }, [])

     const [loading, setLoading] = useState(true);

     //function to handle the airport selection from the dropdown
     const selectAirport = (value) => {
        setDepartureAirport(value)
        setFilteredAirports([])
     }

     useEffect(() => {
        selectAirport()
     }, [])
    
    const [errors, setErrors] = useState({
        departureAirport:false,
        parkingCheckIn:false,
        parkingCheckOut:false
    });

    //function to handle changes in the departure airport
    const departureAirportHandler = (e) => {
        const {value} = e.target;
        setDepartureAirport(value);
        if(value.length<10){
            setDepartureAirport(value);
        }
        if(e.target.value) {
            setErrors((err)=> ({...err,departureAirport:false}))
        }else{
            setErrors((err)=> ({...err,departureAirport:true}))
        }
        const filteredAirportsData = airports.filter((airport) => 
            airport.name.toLowerCase().includes(e.target.value.toLowerCase()));
            setFilteredAirports(filteredAirportsData?? [])
            console.log(filteredAirports)
    }

    //function to handle changes in the checkin date
    const parkingCheckInHandler = (e) => {
        const {value} = e.target;
        setParkingCheckIn(value);
        //if checkin date is entered, then remove errors
        if(e.target.value) {
            setErrors((err)=> ({...err,parkingCheckIn:false}))
        }else{
            setErrors((err)=> ({...err,parkingCheckIn:true}))
        }
    }

    //function to handle changes in the checkout date 
    const parkingCheckOutHandler = (e) => {
        const {value} = e.target;
        setParkingCheckout(value);
        //check whether parking checkin is greater than checkout date
        if (moment(parkingCheckIn) > moment(parkingCheckOut)) {
            setErrors((err) => ({ ...err, parkingCheckOut: true }))
            }
        //if checkout out date is selected, remove errors
        if(e.target.value) {
            setErrors((err)=> ({...err,parkingCheckOut:false}))
        }else{
            setErrors((err) => ({ ...err,parkingCheckOut: true }))
        }
    }

    //function to handle submission form
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(departureAirport);
        console.log(parkingCheckIn);
        console.log(parkingCheckOut);

        //check whether check in date is greater than check out date
        if (moment(parkingCheckIn) > moment(parkingCheckOut)) {
            alert("checkIn date cannot be greater than checkOut date")
            setErrors((err) => ({ ...err, parkingCheckOut: true }))
            }     

        //if departure airport,parking checkin and checkout dates are entered, navigate to results page
        else if(departureAirport && parkingCheckIn && parkingCheckOut) {
           // navigate(`/results?departureAirport=${departureAirport}&checkin=${parkingCheckIn}&checkout=${parkingCheckOut}`);
            alert("Form subitted successfully")
            window.location.href = `/results?departureAirport=${departureAirport}&checkin=${parkingCheckIn}&checkout=${parkingCheckOut}`
        }
        //If any fields are missing, then show errors
        else{
            setErrors({
                departureAirport:!departureAirport,
                parkingCheckIn:!parkingCheckIn,
                parkingCheckOut:!parkingCheckOut
            });
        }
    }

    const [records, setRecords] = useState([]);

    const fetchData = async () => {
        setLoading(true)
        const {data} = await axios.get('http://43.205.1.85:9009/v1/airports')
        setLoading(false)
        setRecords(data.results);
    };
    useEffect(()=> {
        fetchData()
     },[]);

    return(
        <section id="hero"
        style={{backgroundImage: 'url("assets/generic_landing.jpg")', minHeight: '500px'}}>
        <div className="hero-backdrop"></div>
        <div className="container position-relative">
            <div className="hero-heading mb-4">
                <h1>SAVE BIG ON AIRPORT PARKING</h1>
                <h2>We have the best deals for airport parking lots!</h2>
            </div>
            <div className="searchbox landing">
                <div className="row tabs">
                    <div className="tab">
                        <div className="heading">Most Convenient</div>
                        <div className="button">
                            <div className="icon"><i className="fas fa-car"></i></div>
                            Airport Parking Only
                        </div>
                    </div>
                    <div className="tab">
                        <div className="heading">Best Value</div>
                        <div className="button">
                            <div className="icon"><i className="fas fa-bed"></i> + <i
                                    className="fas fa-car"></i></div>
                            Hotel &amp; Parking Package
                        </div>
                    </div> 
                </div>
                {loading && <h3>loading..</h3>}
                <form action="/results.html" method="post">
                    <div className="options row m-0"><label className="col-12 col-xl-3 p-0 mr-xl-3 mb-2">
                        <div className="heading mb-1">Departure Airport</div>
                        <div className="placeholder placeholder-airport">
                        <input type="text" placeholder="Departure Airport" 
                        onChange={departureAirportHandler} 
                        value={departureAirport} className="placeholder placeholder-airport"/>
                
            </div> <i
                className="fas fa-map-marker-alt input-icon"></i>

            {loading ?<h3>Loading</h3>:null}
            {(errors && errors.departureAirport)?<h6 style={{backgroundColor: 'red'}}>Invalid Departure Airport</h6>:null}
            <AirportSuggestions airports={filteredAirports} selecrAirport={selectAirport} />
        </label>
        <div className="col p-0 row m-0 mb-2 dates"><label
                className="col-sm-6 p-0 pr-sm-3 date_input">
                <div className="heading mb-1">Parking Check-In</div>
                <div className="placeholder">
                    <input name="checkin" type="date" placeholder="Parking Check-Out" value ={parkingCheckIn} className="placeholder placeholder-airport" style={{width:'100%'}} onChange={parkingCheckInHandler}/>
                    {(errors && errors.parkingCheckIn)?<h6 class={{backgroundcolor: 'red'}}>Invalid checkin Date</h6>:null}
                </div> 
            </label> <label className="col-sm-6 p-0 pl-sm-0 date_input">
                <div className="heading mb-1">Parking Check-Out</div>
                    <input name="Check-Out" type="date" placeholder="Parking Check-Out" value ={parkingCheckOut}className="placeholder placeholder-airport" style={{width:'100%'}} onChange={parkingCheckOutHandler}/>
                    {(errors && errors.parkingCheckOut)?<h6 style={{backgroundColor: 'red'}}>Invalid checkout Date</h6>:null}
               
            </label></div>
        <div className="col-12 col-xl-2 p-0 pl-xl-3 my-3 my-xl-0">
            <div className="d-none d-xl-block heading mb-1 invisible">Submit</div>
            <button type="submit"className="btn btn-secondary btn-big btn-block p-2" onClick={submitHandler}><span>SEARCH</span></button>
            </div>
        </div>
        </form>
    </div>
    </div>
</section>
);
}

const Homepage =(props)=>{

    return(
        <div id="app" className="generic">
        <div>
            <div className="content">
               
                    <section id="home_page">
                        <div className="years-of-service">
                            <div className="container">
                                For 20 years, we’ve helped travelers on their way. With free cancellations & a customer
                                service team in the US, we are committed to serving you.
                            </div>
                        </div>
                        <SearchForm />
                        <section id="benefits">
                            <div className="container">
                                <h5>What Can You Save with AirportParkingReservations.com?</h5>

                                <ul className="row">
                                    <li className="col-12 col-lg-4 p-3">
                                        <img src="/assets/check.png" alt="Tick" width="50" height="50" />
                                        <div>
                                            <h6>Save Money</h6>
                                            <p>Save up to 70% off on our site compared to the cost of on-airport
                                                parking.</p>
                                        </div>
                                    </li>
                                    <li className="col-12 col-lg-4 p-3">
                                        <img src="/assets/check.png" alt="Tick" width="50" height="50" />
                                        <div>
                                            <h6>Save Time</h6>
                                            <p>
                                                It's easy to compare parking at all major airports.<br />
                                                Booking a reservation is quick & simple!
                                            </p>
                                        </div>
                                    </li>
                                    <li className="col-12 col-lg-4 p-3">
                                        <img src="/assets/check.png" alt="Tick" width="50" height="50" />
                                        <div>
                                            <h6>Save Stress</h6>
                                            <p>
                                                Guarantee your parking spot by booking in advance. Can't make it?
                                                Cancellations are free.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </section>

                    </section>
                
            </div>


            
        </div>
    </div>
    )
}

export default Homepage;