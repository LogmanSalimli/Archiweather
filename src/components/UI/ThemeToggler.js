import { useRef, useEffect } from 'react';
import classes from '../../styles/theme.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { themeActions } from '../../store/themeSlice';

const ThemeToggler = () => {
    const selectorRef = useRef();
    const dispatch = useDispatch();
    const { isDark } = useSelector(state => state.theme);

    const userPrefersDark = JSON.parse(localStorage.getItem('userPrefersDark'));
    const isDeviceDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    useEffect(() => {
        if (userPrefersDark) {
            dispatch(themeActions.set(userPrefersDark));
        } else {
            dispatch(themeActions.set(isDeviceDark));
        }
    }, []);

    const onclick = () => {
        dispatch(themeActions.toggle());
    }

    const moon = (
        <svg id='moon' aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" mask="url(#moon-mask)" fill="currentColor" />
            <mask id="moon-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <circle cx="17" cy="10" r="8" fill="black" />
            </mask>
        </svg>
    )
    const selector = (
        <svg ref={selectorRef} id='selector' aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="currentColor" />
        </svg>
    )
    const sun = (
        <svg id='sun' aria-hidden="true" width="36" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="6" fill="currentColor" />
            <g stroke="currentColor">
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </g>
        </svg>
    )

    return (
        <button onClick={onclick} className={`${classes.theme} ${isDark ? classes.dark : ''}`}>
            <span>{sun}</span>
            <span>{moon}</span>
            <span>{selector}</span>
        </button>
    )
}

export default ThemeToggler;