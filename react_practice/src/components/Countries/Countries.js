import './Countries.css'
import { useEffect, useState } from "react";
import Country from "../Country/Country";

const Countries = () => {
    const [countries, setCountries]  = useState([]);

    useEffect(() =>{
        fetch("https://restcountries.eu/rest/v2/all")
        .then(res => res.json())
        .then(data => setCountries(data));
    }, [])

    return (
        <div>
        <h1 className="title">Hello, from rest-countries api testing! <a href="https://restcountries.eu/rest/v2/all">api-link</a></h1>
        <div className="countries-container">
            {
                countries.map( country => <Country 
                    key={country.capital}
                    country={country}>
                    </Country>)
            }
        </div>
        </div>
    )
}

export default Countries;