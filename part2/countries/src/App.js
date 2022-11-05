import axios from "axios";
import { useEffect, useState } from "react";

const  API_key = process.env.REACT_APP_API_KEY


const Counrty = ({country}) => {

  console.log( Object.values (country.languages) )
  console.log( country.latlng )
  const [weather, setWeather] = useState( {weather: [{icon : null}], main: {temp: null} , wind: { speed: null }} );
  console.log( weather )

  
  useEffect( () =>{
    axios.get( `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${API_key}`  )
    .then( (response) => {
      setWeather( response.data )
    } )
  } , [] );

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>  capital {country.capital } </p>
      <p>  area {country.area } </p>

      <h2>languages</h2>
        <ul>
          { Object.values (country.languages).map( 
             language => <li> {language} </li>
          )  }
        </ul>
      <h2>flag</h2>
        <img src={country.flags.png} />
      
        <h2> Weather in { country.capital[0] } </h2>
        <p>temperature {weather.main.temp}  Celcius</p>
        <img src={ `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`  } ></img>
        <p>wind { weather.wind.speed} </p>
     
      
    </>
  );

}

function App() {

  const [countries, setCountries] = useState( [] );
  const [filterString, setFilterString] = useState( "" );
  const [selectedContury, setSelectedContury] = useState( {} );

  useEffect( () =>{
    axios.get( "https://restcountries.com/v3.1/all" )
    .then( response => {
      setCountries( response.data )
    } )
  }  , [] )

  const shownCountries = countries.filter( 
                        ({name}) => name.common.toLowerCase().search(  filterString.toLowerCase() ) !== -1  ) 

  return (
    <div className="App">

      <div>
          find countries <input  
                      value={filterString}
                      onChange={(event) => { setFilterString(event.target.value) } }
                />
      </div>

      <div>
        { shownCountries.length === 0?
            <p>no such country</p> :
            shownCountries.length === 1?
                <Counrty country={shownCountries[0]} /> :
                shownCountries.length <= 10 ?
                    shownCountries.map(country => 
                      <div> 
                        { country.name.common} 
                        <button onClick={ () => { setFilterString(country.name.common)} } > show </button>
                      </div>   ):
                    "Too many matches, specify another filter"
           }
      </div>

    </div>
  );
}

export default App;
