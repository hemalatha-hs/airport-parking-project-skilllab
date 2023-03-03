import React,{useState} from 'react'
const SearchForm = () =>{
    
    const [departureAirport,setDepartureAirport] = useState('');
    const [parkingCheckIn,setParkingCheckIn] = useState('');
    const [parkingCheckOut,setParkingCheckout] = useState('');

    const [errors, setErrors] = useState({
        departureAirport:false,
        parkingCheckIn:false,
        parkingCheckOut:false
    });

    const departureAirportHandler = (e) => {
        const {value} = e.target;
        setDepartureAirport(value);
        if(e.target.value) {
            setErrors((err)=> ({...err,departureAirport:null}))
        }
    }

    const parkingCheckInHandler = (e) => {
        const {value} = e.target;
        setParkingCheckIn(value);
        if(e.target.value) {
            setErrors((err)=> ({...err,parkingCheckIn:null}))
        }
    }

    const parkingCheckOutHandler = (e) => {
        const {value} = e.target;
        setParkingCheckout(value);
        if(e.target.value) {
            setErrors((err)=> ({...err,parkingCheckOut:null}))
        }
    }


    const submitHandler = (e) => {
        e.preventDefault();
        console.log(departureAirport);
        console.log(parkingCheckIn);
        console.log(parkingCheckOut);

        if(departureAirport && parkingCheckIn && parkingCheckOut) {
            alert('Form submitted successfully');
        }else{
            setErrors({
                departureAirport:!departureAirport,
                parkingCheckIn:!parkingCheckIn,
                parkingCheckOut:!parkingCheckOut
            });
        }
    }
    return(
    <form action="/results.html" method="post">
    <div className="options row m-0"><label className="col-12 col-xl-3 p-0 mr-xl-3 mb-2">
            <div className="heading mb-1">Departure Airport</div>
            <div className="placeholder placeholder-airport">
                <input type="text" placeholder="Departure Airport" className="placeholder placeholder-airport" onChange={departureAirportHandler} value={departureAirport} />
                {(errors && errors.departureAirport)?<h6 style={{backgroundColor: 'red'}}>Please enter departure airport</h6>:null}
            </div> <i
                className="fas fa-map-marker-alt input-icon"></i>
        </label>
        <div className="col p-0 row m-0 mb-2 dates"><label
                className="col-sm-6 p-0 pr-sm-3 date_input">
                <div className="heading mb-1">Parking Check-In</div>
                <div className="placeholder">
                    <input name="checkin" type="date" placeholder="Parking Check-Out" className="placeholder placeholder-airport" style={{width:'100%'}} onChange={parkingCheckInHandler}/>
                    {(errors && errors.parkingCheckIn)?<h6 class={{backgroundcolor: 'red'}}>Please enter checkin date</h6>:null}
                </div> 
            </label> <label className="col-sm-6 p-0 pl-sm-0 date_input">
                <div className="heading mb-1">Parking Check-Out</div>
                    <input name="Check-Out" type="date" placeholder="Parking Check-Out" className="placeholder placeholder-airport" style={{width:'100%'}} onChange={parkingCheckOutHandler}/>
                    {(errors && errors.parkingCheckOut)?<h6 style={{backgroundColor: 'red'}}>Please enter checkout date</h6>:null}
               
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