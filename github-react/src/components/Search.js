 // eslint-disable-next-line 
import { useEffect, useState } from "react";
import Result from "./Result";

const Search = () => {
    const [inputchange, setinputchange] = useState('');
    const [repo,setRepo] = useState([]);
    const [countries, setCountries] = useState([]);

    const handleChange  =(e)=>{
        setinputchange(e.target.value);
        console.log(inputchange)
    }
    const handleClick = () => {
        fetch(`https://api.github.com/users/${inputchange}`)
        .then(res => res.json())
        .then(data => setRepo(data));
    }

    useEffect(() =>{
        
        handleClick()
    },[])

    useEffect(()=>{
        fetch(`https://raw.githubusercontent.com/ProgrammingHero1/rest-countries-data/main/coutries.JSON`)
        .then(res => res.json())
        .then(data => setCountries(data));
    }, [])
    
    return (
        <div>
            <h1>Github user api using reactjs</h1>
            <input type="text" placeholder="type username" value={inputchange} onChange={handleChange}/>
            <button onClick={() => handleClick()}>search</button>
            <Result repo={repo}></Result>
        </div>
    )
}

export default Search;
 // eslint-disable-next-line 