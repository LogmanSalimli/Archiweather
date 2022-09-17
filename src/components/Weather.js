import { useEffect, useRef, useState } from "react";
import classes from '../styles/weather.module.css';
import DetailedInfo from "./DetailedInfo";
import { apiKey } from '../apiKey';
import spinner from '../../src/assets/spinner.gif';

const Weather = props => {
    const [weatherDetails, setWeatherDetails] = useState();
    const [inputState, setInputState] = useState(false);
    const [cities, setCities] = useState(null);
    const cityName = useRef();
    const cityList = useRef();

    useEffect(() => {
        const getDetails = async () => {
            await fetch('https://geolocation-db.com/json/', { method: 'GET' })
                .then(res => res.json())
                .then(locationData => {
                    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.latitude}&lon=${locationData.longitude}&appid=${apiKey}&units=metric`,
                        { method: 'GET' })
                })
                .then(res => res.json())
                .then(weatherData => {
                    setWeatherDetails(weatherData);
                })
        }
        getDetails();
    }, []);
    const inputChangeHandler = async () => {
        if (cityName.current.value.trim() !== '') {
            await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName.current.value}&limit=5&appid=${apiKey}`, { method: 'GET' })
                .then(res => res.json())
                .then(data => {
                    setCities(data)
                })
        } else { setCities(null) }
    }

    const selectionHandler = async (city) => {
        setWeatherDetails(null);
        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`,
            { method: 'GET' })
            .then(res => res.json())
            .then(weatherData => {
                setWeatherDetails(weatherData);
                cityName.current.value = ''
            })
    }

    const submitHandler = async e => {
        e.preventDefault();
        setWeatherDetails(null);
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.current.value}&appid=${apiKey}&units=metric`,
            { method: 'GET' })
            .then(res => res.json())
            .then(weatherData => {
                setWeatherDetails(weatherData);
                cityName.current.value = ''
            })
    }

    const list = cities && cities.map(city => <li
        onClick={selectionHandler.bind(selectionHandler, city)}
        key={Math.random()}>{city.name}, {city.country}</li>)

    const inputFocusHandler = () => {
        setInputState(true);
    }
    const inputBlurHandler = (e) => {
        if (e.target !== cityName.current && e.path[1] !== cityList) {
            setInputState(false)
        }
    }

    window.addEventListener('click', inputBlurHandler)

    return (
        <main id='main'>
            <form onSubmit={submitHandler}>
                <input
                    type='text'
                    placeholder='Search city'
                    ref={cityName}
                    onFocus={inputFocusHandler}
                    onChange={inputChangeHandler}
                />
                {inputState && cityName.current && cityName.current.value.trim() !== '' && <ul ref={cityList} className={classes.list}>{list}</ul>}

            </form>

            {weatherDetails && weatherDetails.cod === 200 && <DetailedInfo
                data={weatherDetails} />}
            {!weatherDetails && <img alt='current condition' className={classes.spinner} src={spinner} />}
            {weatherDetails && weatherDetails.cod !== 200 && <p className={classes.error}>{weatherDetails.message}</p>}
        </main>
    )
}

export default Weather;