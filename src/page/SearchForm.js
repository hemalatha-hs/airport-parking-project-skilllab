import React, { useState } from "react";
const SearchForm = () => {
    const [departureAirport,setDepartureAirport] = useState('Delhi');
    const [parkingCheckIn,setParkingCheckIn] = useState('');
    const [parkingCheckOut,setParkingCheckout] = useState('');

    const departureAirportHandler = (e) => {
        const {value} = e.target;
        if(value.length < 6){
            setDepartureAirport(value);
        }
    }

    const parkingCheckInHandler = (e) => {
        const {value} = e.target;
        setParkingCheckIn(value);
    }

    const parkingCheckOutHandler = (e) => {
        const {value} = e.target;
        setParkingCheckout(value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(departureAirport);
        console.log(parkingCheckIn);
        console.log(parkingCheckOut);
    }

    return (
        <form action="/results.html" method="post" autoComplete="off" noValidate="">
<div className="options row m-0"><label className="col-12 col-xl-3 p-0 mr-xl-3 mb-2">
        <div className="heading mb-1">Departure Airport</div>
        <div className="placeholder placeholder-airport">
            <input type="text" placeholder="Departure Airport" className="placeholder placeholder-airport" onChange={departureAirportHandler} value={departureAirport}/>
        </div><i
            className="fas fa-map-marker-alt input-icon"></i>
    </label>
    <div className="col p-0 row m-0 mb-2 dates"><label
            className="col-sm-6 p-0 pr-sm-3 date_input">
            <div className="heading mb-1">Parking Check-In</div>
            <div className="placeholder">
                <input name="checkin" type="date" placeholder="Parking Check-Out" className="placeholder placeholder-airport"  onChange={parkingCheckInHandler} style={{width:'100%'}}/>
            </div> 
        </label>
         <label className="col-sm-6 p-0 pl-sm-0 date_input">
            <div className="heading mb-1">Parking Check-Out</div>
                <input name="Check-Out" type="date" placeholder="Parking Check-Out" className="placeholder placeholder-airport"  onChange={parkingCheckOutHandler} style={{width:"100%"}}/>
           
        </label></div>
    <div className="col-12 col-xl-2 p-0 pl-xl-3 my-3 my-xl-0">
        <div className="d-none d-xl-block heading mb-1 invisible">Submit</div>
        <button type="submit" onClick={submitHandler} className="btn btn-secondary btn-big btn-block p-2"><span>SEARCH</span></button>
    </div>
</div>
</form>
    );
}
export default SearchForm;
