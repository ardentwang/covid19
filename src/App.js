//Coronavirus Statistics
//Date: April 3rd 2021

import React, { useEffect, useState } from "react"; 
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import InfoBox from "./InfoBox";

function App() {
  //creates const countries and setCountries to an effect hook that is blank
  //countries retrives the list of countries listed in the external API
  //setCountries sets countrries to a new or current value (it is only applied once to retrive country names)
  const [countries, setCountries] = useState([]);
  //creates const country and setCountry to an effect hook that is "Worldwide"
  //Worldwide becomes the default value of country and setCountry
  //country lists the name of a country
  //setCountry country to a new or current country
  const [country, setCountry] = useState("Worldwide");
  //creates const countryInfo and setCountryInfo to an effect hook that is blank
  //countryInfo holds data of the coronavirus statistics of a country
  //setCountryInfo sets countryInfo to a new or current set of data of a country
  const [countryInfo, setCountryInfo] = useState({});
  
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // fetch accesses the COVID-19 API dataset of Worldwide data
    fetch("https://disease.sh/v3/covid-19/all")
      //fetching a JSON file across the network using a Response object and is implemented into setCountryInfo
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
  
  useEffect(() => {
    //constructs constant getCountriesData that is asynced to ignore shape of data and type of request
    const getCountriesData = async() => {
      // fetch accesses the COVID-19 API dataset of countries
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        // constant countries is a map key, that has "name" and "value"
        const countries = data.map((country) => ({
          //sets name to country
          name: country.country,
          //sets name to country but is formatted (for example, United States -> US) through the .iso2 dataset within the API
          value: country.countryInfo.iso2,
        }));

        console.log("Countries >>>", data);
        setCountries(countries);
      })
    }
    getCountriesData();
  }, []);

  
  const onCountryChange = (event) => {
    // countryCode retrieves value of whatever input it was called on through the argument event
    const countryCode = event.target.value;
    setCountry(countryCode);


    const url = 
      //const url is set to either the worldwide url or the countries url depending on the value of "countryCode"
      countryCode === 'Worldwide' 
        // if countryCode is equal to Worldwide (which is the default value on npm start), sets url to the worldwide url
        ? 'https://disease.sh/v3/covid-19/all' 
        // else url is set to the country url
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    // fetch accesses the COVID-19 API dataset of countries
     fetch(url)
      .then(response => response.json())
      .then(data => {
        //sets countryCode to a new value
        setCountry(countryCode)
        // sets data to a new value
        setCountryInfo(data);

        //debugging code that allows the user to see what the program is retriving through console
        console.log("CountryCode >>>", countryCode);
        console.log("Country data >>>", data);
      })
  };

  //return is the result that is displayed on the screen
  return (
    <div className="app">

      <div className="app__left">
      <div className="app__header">
        <h1>COVID-19 Statistics</h1> 

          //FormControl is an imported API that ensures consistent formatting
          <FormControl className="app_dropdown">

            //Select is an imported component from material-ui/core that allows the user to choose from a menu
            <Select variant="outlined" onChange={onCountryChange} value={country}>

              //MenuItem is an imported component from material-ui/core that displays a dropdown list of menu items
             <MenuItem value="Worldwide">Worldwide</MenuItem>
              {
                countries.map(country => (
                  //displays the name of the country selected
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
        </FormControl> 
      </div>

      <div className="app_stats">

        //disease.sh, the external API used in this code, has statistics under cases, recovered, and deaths.
        //As such, nowhere in the code do we have to define these 3; we simply only have to call for them.
        //InfoBox 1 displays the cases of Coronavirus using countryInfo.cases
        <InfoBox title="Cases" cases={countryInfo.cases}/>
        //InfoBox 2 displays the recoveries of Coronavirus using countryInfo.recovery
        <InfoBox title="Recovered" cases={countryInfo.recovered}/>
        //InfoBox 3 displays the deaths of Coronavirus using countryInfo.deaths
        <InfoBox title="Deaths" cases={countryInfo.deaths}/>
        
      </div>
        </div>    
    </div>
  );
}

export default App;
