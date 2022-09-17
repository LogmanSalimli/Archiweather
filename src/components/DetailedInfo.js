import classes from '../styles/weather.module.css';
import Piece from './UI/Piece';
import { useSelector } from 'react-redux';

const DetailedInfo = props => {
    const { isDark } = useSelector(state => state.theme);
    const { isMetric } = useSelector(state => state.unit);
    const temp = isMetric ? props.data.main.temp : ((props.data.main.temp * 9 / 5) + 32);
    const feelsLike = isMetric ? props.data.main.feels_like : ((props.data.main.feels_like * 9 / 5) + 32);

    const windDirection = { transform: `rotate(${90 + props.data.wind.deg}deg)` }
    const windSpeed = isMetric ? props.data.wind.speed : props.data.wind.speed * 2.237;

    const sunrise = new Date(props.data.sys.sunrise * 1000);
    const sunset = new Date(props.data.sys.sunset * 1000);

    const timezoneOffset = sunrise.getTimezoneOffset();
    const timezone = timezoneOffset === 0 ? 'GMT' : timezoneOffset < 0 ? 'GMT+' + timezoneOffset / (-60) : 'GMT-' + timezoneOffset / (-60)

    return (
        <>
            <div className={classes.basics}>
                {props.data && <h2>{props.data.name}</h2>}
                {
                    props.data && <div className={classes.icon}>
                        <img src={`https://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`} alt={props.data.weather.main}
                        />
                    </div >
                }
                {props.data && <div className={classes.temp}>
                    <span>{temp.toFixed(1)} °{isMetric ? 'C' : 'F'}
                    </span>
                </div>}
            </div>
            <div className={`${classes.table} ${isDark ? classes.dark : ''}`}>
                <div className={classes.tableGroup}>
                    <div className={classes.data}><Piece>Condition: {props.data.weather[0].main} </Piece></div>
                    <div className={classes.data}><Piece>Wind: <span className={classes.wind} style={windDirection}> ➣ </span>{windSpeed.toFixed(1)}{isMetric ? 'm/s' : 'mph'}</Piece></div>
                    <div className={classes.data}><Piece>Realfeel: {feelsLike.toFixed(1)} °{isMetric ? 'C' : 'F'}</Piece></div>
                </div>
                <div className={classes.tableGroup}>
                    <div className={classes.data}><Piece>Pressure: {props.data.main.pressure}hPa</Piece></div>
                    <div className={classes.data}><Piece>Humidity: {props.data.main.humidity}%</Piece></div>
                    <div className={classes.data}><Piece>Cloud cover: {props.data.clouds.all}% </Piece></div>
                </div>
                <div className={classes.tableGroup}>
                    <div className={classes.data}><Piece>Visibility: {props.data.visibility / 1000}km</Piece></div>
                    <div className={classes.data}><Piece>Sunrise: {`${sunrise.getHours()}:${sunrise.getMinutes()} ${timezone}`}</Piece></div>
                    <div className={classes.data}><Piece>Sunset: {`${sunset.getHours()}:${sunset.getMinutes()} ${timezone}`}</Piece></div>
                </div>
            </div>
        </>
    )
}
export default DetailedInfo;
