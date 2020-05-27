import React, {useState, useEffect} from 'react';
import axios from 'axios'


const CountryFull = ({country}) => {
  const apiKey = process.env.REACT_APP_API_KEY
  const [weather, setWeather] =useState('')

  // having weather check here burns through limited api calls as it's checked every time countryFull is.
  // a solution would be to time limit the calls and/or store weather data

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`)
      .then((response) => {
        if (response.data.success) {
          setWeather(response.data);
        }
        // log error to console
        console.log('api error:', response.data.error);


      });
  });

  return (
    <div>
      <h2>{country.name}</h2>
      <div>
        <strong>Capital:</strong>{` ${country.capital}`}
      </div>
      <div>
        <strong>Pop:</strong> {country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </div>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img alt={`flag of ${country.name}`} src={country.flag} title={ `flag of ${country.name}`} height="150px" />

        <h2>{`Weather in ${country.capital}`}</h2>
        <Weather weather={weather} />


    </div>

  )
}

const Country = ({ country, handleShowCountryButton }) => (
  <div>
    <strong>{country.name}</strong> -
    {' '}
    <button type="button" value={country.name} onClick={() => handleShowCountryButton(country.name)}><strong>Show</strong></button>
  </div>
)

const Results = ({ filteredCountries, handleShowCountryButton }) => {
  if (filteredCountries.length > 10) {
    console.log('too many matches');
    return <div>Too many matches, specify search</div>;
  }

  if (filteredCountries.length > 1) {
    console.log('showing selection');
    return (
      filteredCountries.map((country) => (
        <Country
          key={country.name}
          country={country}
          handleShowCountryButton={handleShowCountryButton}
        />
      ))
    );
  }

  if (filteredCountries.length === 1) {
    console.log('showing full country info');
    return (<CountryFull country={filteredCountries[0]} />)
  }

  return <div>No matching results, specify search</div>;
};


const Filter = ({search, handleSearchChange}) => {
  return (
    <div>
      <form>
        find countries: <input value={search} onChange={handleSearchChange} />
      </form>
    </div>
  )
}

const Weather = ({weather, country}) => {
  if (weather !=='') {
    return (
      <div>
        <div>{`Temp: ${weather.current.temperature} ℃`}</div>
        <img alt="weather icon" src={weather.current.weather_icons[0]} />
        <div>{`Wind: ${weather.current.wind_speed} km/h ${weather.current.wind_dir}`}</div>
      </div>
    )
  }

  return <div>Weather data unavailable, error logged in console</div>
}



const App = () => {
const [countries, setCountries] = useState([])
const [search, setSearch] = useState('')
const [filteredCountries, setFilteredCountries] = useState(countries)

useEffect(() => {
  console.log();
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
}, [])

// console.log( countries.length, ' countries loaded')

const handleSearchChange = event => {
  setSearch(event.target.value)
  setFilteredCountries(
    countries.filter((country) => country.name.toLowerCase()
    .includes(event.target.value.toLocaleLowerCase())),
  )
}

const handleShowCountryButton = (name) => {
  setSearch(name)
  setFilteredCountries(countries.filter((country) => country.name === name))
}
  return (
    <div>

      <Filter
        handleSearchInput={search}
        handleSearchChange={handleSearchChange}
      />
      <br />
      <Results
        filteredCountries={filteredCountries}
        handleShowCountryButton={handleShowCountryButton}
      />
    </div>
  )
}

export default App;
