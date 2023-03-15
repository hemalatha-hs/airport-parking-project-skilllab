import React from 'react';

const AirportSuggestions = ({ airports=[],selectAirport}) => {
    if(airports.length===0) {
        return null;
    }
    return(
        <div>
            <ul>
                {airports.map((airport) => (
                    <li key={airport.id} className="suggestion-list" style={{
                        padding: '10px',
                        borderBotttom:'1px solid',
                        cursor:"pointer"
                    }}
                    onClick={ () => selectAirport(airport.name)}
                    >
                        {airport.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default AirportSuggestions;