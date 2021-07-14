import React from 'react';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { apiKey } from './constants';

export const App = () => {
    // set hooks
    const [value, setValue] = useState('');
    const [weather, setWeather] = useState({
        temp: null,
        city: null,
        climate: null,
        visibility: null,
        wind: null,
    });
    // Handle change in input box 
    const handleChange = async (event) => {
        setValue(event.target.value);
    };
    // Handle submit button action
    const handleSubmit = async (event) => {
        callBackend();
        event.preventDefault();
    };

    const callBackend = async () => {
        try {
            // Set post options
            let url = `api.openweathermap.org/data/2.5/weather?q=${ value }&units=metric&appid=${ apiKey }`
            const config = {
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            };
            const data = {
                url: url,
            };
            // axios call
            const res = await axios.post('/express_backend', data, config);
            // Destructure response object to set hooks values.
            const { main: temp, 
                name, 
                weather: [
                    {
                        main: typeOfClimate,
                    }
                ],
                visibility,
                wind,
            } = res.data;
            // set weather hook
            setWeather({
                ...weather,
                city: name,
                temp: temp.temp,
                climate: typeOfClimate,
                visibility: visibility,
                wind: wind
            });
            if (res.status !== 200) {
              throw Error(res.message) 
            }
            return
        } catch (e) {
            throw Error(e.message) 
        }
    };
    return (
        <>
        <div className="App">
            <div className="App-header">
                <form onSubmit={ (event) => handleSubmit(event) }>
                    <div>
                    Insert the city here:
                        <input className="App-input" type="text" value={ value } onChange={ handleChange } />
                        <input className="App-button" type="submit" value="Submit" />
                    </div>
                </form>
                { weather.city && <p>{ `The temperature is ${ weather.temp } Celsius in the city: ${ weather.city },
                    with ${ weather.climate } and ${ weather.visibility } m. of visibility and winds of ${ weather.wind.speed } km/h` }</p> }
            </div>
        </div>
        </>
    );
}
export default App;
