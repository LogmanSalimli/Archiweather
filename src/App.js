import React from "react"
import { useSelector } from "react-redux";
import './App.css';
import Weather from './components/Weather';
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const { isDark } = useSelector(state => state.theme);
  return (
    <div id='app' className={isDark ? 'dark' : ''}>
      <Header />
      <Weather />
      <Footer />
    </div>
  );
}

export default App;
