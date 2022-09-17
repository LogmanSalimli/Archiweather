import classes from '../styles/footer.module.css';

const Footer = () => {
    return (
        <footer className={classes.footer} id='footer'>
            <hr />
            <span className={classes.copy}>ArchiWeather by <b>Logman Salimli</b></span>
            <div className={classes.contact}>
                <a href='https://linkedin.com/in/logman-salimli' target='_blank' rel='noreferrer'>LinkedIn</a>|
                <a href='mailto:logman.salimli@gmail.com' target='_blank' rel='noreferrer'>E-mail</a>|
                <a href='tel:+994558424440' >Telephone</a>
            </div>
        </footer>
    )
}
export default Footer;