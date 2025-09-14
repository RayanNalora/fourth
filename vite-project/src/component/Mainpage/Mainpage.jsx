import React from 'react';
import Header from '../Header/Header';
import SearchSection from '../Header/SearchSection/SearchSection';
import LandList from '../Header/LandCard/LandList';
import ContactForm from '../Header/ContactForm/ContactForm';
import Advisors from '../Header/Advisors/Advisors';
import Footer from '../Footer/Footer';
// import Cover from '../Cover/Cover';
import { useNavigate } from "react-router-dom";
import ReasultSearch from "../Header/SearchSection/Filter/ReasultSearch/ReasultSearch";
import Login from '../login/login';
import Signup from '../Signup/Signup';
import Page1 from '../dash/Page1';
function Mainpage() {
  const navigate = useNavigate();
  const gotoContactForm = () => {
    navigate("/ContactForm"); // ينقلك لصفحة Main
  };
  return (
    <>

        <Header/>
        <SearchSection/>
        {/* <Page1/> */}
        <LandList/>
        <Advisors/>
        <div className="imagetofram" style={{position: "relative",marginBottom: "61px"}}>
           <img src="/lands/fram.png"></img>
           <div style={{ marginBottom:"30px",display: "flex",justifyContent: "center",marginBottom: "-2px",position: "absolute",top: "150px",transform: "translateX(-50%)",left: "50%"}}>
              <button id="Post" style={{background:"#28a745", margin: "120px"}} onClick={gotoContactForm}>Post your land</button>
           </div>
        </div>
        <Footer/>
    </>
  )
}

export default Mainpage;