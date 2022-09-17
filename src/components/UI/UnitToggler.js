import { useSelector, useDispatch } from 'react-redux';
import classes from '../../styles/theme.module.css';
import { unitActions } from '../../store/unitSlice';

const UnitToggler = () => {
    const { isMetric } = useSelector(state => state.unit);
    const dispatch = useDispatch();
    const unitChanger = () => {
        dispatch(unitActions.toggle());
    }

    const selectorClasses = !isMetric ? `${classes.selector} ${classes.imperial}` : `${classes.selector}`
    const unit = isMetric ? '°F & mph' : '°C & m/s';
    const selector = (
        <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="currentColor" />
        </svg>
    )
    ////////////////////////////////
    return (
        <button onClick={unitChanger} className={classes.units}>
            <span className={classes.unit}><b>{unit}</b></span>
        </button>
    )
}

export default UnitToggler;