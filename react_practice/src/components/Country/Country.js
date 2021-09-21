import './Country.css';

const Country = (props) => {
    const {name, capital, flag, region, population} = props.country;
    return (
        <div className="country-container">
            <h2>{name}</h2>
            <h3>Capital of {name} is <span>{capital}</span></h3>
            <img src={flag} alt={name} />
            <h4>Population : {population}</h4>
            <h4>Region : {region}</h4>
        </div>
    )
}

export default Country;