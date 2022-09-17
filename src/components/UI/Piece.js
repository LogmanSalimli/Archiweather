import { useSelector } from 'react-redux';
import classes from '../../styles/piece.module.css'

const Piece = props => {
    const { isDark } = useSelector(state => state.theme);
    const darkClass = isDark ? classes.dark : '';
    return (
        <div className={`${classes.piece} ${darkClass}`}>{props.children}</div>
    )
}
export default Piece;
