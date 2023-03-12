import React,{useState} from 'react';
import {useEffect} from 'react';
import moment from 'moment';
import AirportSuggestions from "./AirportSuggestions";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const SearchForm = () =>{
    
    const today = moment().format('YYYY-MM-DD').toString()
    const tomorrow = moment().add(1,'days').format('YYYY-MM-DD').toString()
    const [airports,setAirports] = useState([]);
    const [filteredAirports,setFilteredAirports] = useState('');
    const navigate = useNavigate();
    const [departureAirport,setDepartureAirport] = useState('');
    const [parkingCheckIn,setParkingCheckIn] = useState(today);
    const [parkingCheckOut,setParkingCheckout] = useState(tomorrow);

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

     useEffect(() => {
        getAirports()
     }, [])

     const [loading, setLoading] = useState(true);

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

    const parkingCheckInHandler = (e) => {
        const {value} = e.target;
        setParkingCheckIn(value);
        if(e.target.value) {
            setErrors((err)=> ({...err,parkingCheckIn:false}))
        }else{
            setErrors((err)=> ({...err,parkingCheckIn:true}))
        }
    }

    const parkingCheckOutHandler = (e) => {
        const {value} = e.target;
        setParkingCheckout(value);
        if (moment(parkingCheckIn) > moment(parkingCheckOut)) {
            setErrors((err) => ({ ...err, parkingCheckOut: true }))
            }
        if(e.target.value) {
            setErrors((err)=> ({...err,parkingCheckOut:false}))
        }else{
            setErrors((err) => ({ ...err,parkingCheckOut: true }))
        }
    }


    const submitHandler = (e) => {
        e.preventDefault();
        console.log(departureAirport);
        console.log(parkingCheckIn);
        console.log(parkingCheckOut);

        if (moment(parkingCheckIn) > moment(parkingCheckOut)) {
            alert("checkIn date cannot be greater than checkOut date")
            setErrors((err) => ({ ...err, parkingCheckOut: true }))
            }     

        else if(departureAirport && parkingCheckIn && parkingCheckOut) {
            navigate(`/results?departureAirport=${departureAirport}&checkin=${parkingCheckIn}&checkout=${parkingCheckOut}`);
            alert("Form subitted successfully")
            //window.location.href = `/results?departureAirport=${departureAirport}&checkin=${parkingCheckIn}&checkout=${parkingCheckOut}`
        }else{
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
        
        
    <form action="/results.html" method="post">
    <div className="options row m-0">
        <label className="col-12 col-xl-3 p-0 mr-xl-3 mb-2">
            <div className="heading mb-1">Departure Airport</div>
            <div className="placeholder placeholder-airport">
                <input type="text" placeholder="Departure Airport" className="placeholder placeholder-airport" onChange={departureAirportHandler} value={departureAirport} />
                
                <ul>
                {records.map((record,index)=>{
                    const isEven = index%2;
                    return (
                    <li key={index}style={{backgroundColor:isEven?'grey':'silver'}}>
                        {record.name}
                    </li>
                    )
                    }
                )} 
                </ul>
                {(errors && errors.departureAirport)?<h6 style={{backgroundColor: 'red'}}>Please enter departure airport</h6>:null}
                {loading ?<h1>Loading</h1>:null}

            </div> <i
                className="fas fa-map-marker-alt input-icon"></i>



        </label>
        <div className="col p-0 row m-0 mb-2 dates"><label
                className="col-sm-6 p-0 pr-sm-3 date_input">
                <div className="heading mb-1">Parking Check-In</div>
                <div className="placeholder">
                    <input name="checkin" type="date" placeholder="Parking Check-Out" value ={parkingCheckIn} className="placeholder placeholder-airport" style={{width:'100%'}} onChange={parkingCheckInHandler}/>
                    {(errors && errors.parkingCheckIn)?<h6 class={{backgroundcolor: 'red'}}>CheckIn date is invalid</h6>:null}
                </div> 
            </label> <label className="col-sm-6 p-0 pl-sm-0 date_input">
                <div className="heading mb-1">Parking Check-Out</div>
                    <input name="Check-Out" type="date" placeholder="Parking Check-Out" value ={parkingCheckOut}className="placeholder placeholder-airport" style={{width:'100%'}} onChange={parkingCheckOutHandler}/>
                    {(errors && errors.parkingCheckOut)?<h6 style={{backgroundColor: 'red'}}>CheckOut date is invalid</h6>:null}
               
            </label></div>
        <div className="col-12 col-xl-2 p-0 pl-xl-3 my-3 my-xl-0">
            <div className="d-none d-xl-block heading mb-1 invisible">Submit</div>
            <button type="submit"className="btn btn-secondary btn-big btn-block p-2" onClick={submitHandler}><span>SEARCH</span></button>
        </div>
    </div>
</form>
    );
}
export default SearchForm;