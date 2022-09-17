import { useSelector, useDispatch } from 'react-redux';
import classes from '../../styles/theme.module.css';
import { unitActions } from '../../store/unitSlice';

const UnitToggler = () => {
    const { isMetric } = useSelector(state => state.unit);
    const dispatch = useDispatch();

    const unitChanger = () => {
        dispatch(unitActions.toggle());
    }

    const unit = isMetric ? '°F & mph' : '°C & m/s';

    return (
        <button onClick={unitChanger} className={classes.units}>
            <span className={classes.unit}><b>{unit}</b></span>
        </button>
    )
}

export default UnitToggler;