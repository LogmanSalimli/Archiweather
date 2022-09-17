import ThemeToggler from "./UI/ThemeToggler"
import classes from '../styles/header.module.css'
import UnitToggler from "./UI/UnitToggler";

const Header = () => {
    const partOfDay = () => {
        const hour = new Date().getHours();
        if (hour >= 5) {
            if (hour >= 12) {
                if (hour >= 17) {
                    if (hour >= 21) {
                        return 'Night';
                    }
                    return 'Evening';
                }
                return 'Afternoon';
            }
            return 'Morning';
        }
        return 'Night';
    }

    return (
        <header className={classes.header}>
            <h3 className={classes.greeting}> Good {partOfDay()}!</h3>
            <div className={classes.controls}>
                <UnitToggler />
                <ThemeToggler />
            </div>
        </header>
    )
}

export default Header;