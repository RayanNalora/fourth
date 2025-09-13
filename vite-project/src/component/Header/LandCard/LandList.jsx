import React from 'react';
import styles from './LandCard.module.css';
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
 
const LandList = () => {
  
  const navigate = useNavigate();

  const [lands,setLands]=  useState([]);
  const [imageUrl,setimageUrl]=  useState("");

  useEffect (() => {
    const fetchLands = async () => {
      try {
        console.log('aaaayybbbbbbbvv') ;
        const res = await axios.get("/api/v1/lands/")
        console.log(res.data);
        setLands(res.data.data.lands) ;
        // setimageUrl(res.data.data.lands.idPhoto); 
        // console.log(res.data.data.lands.idPhoto);
      }
      catch(error) {
        console.log("errorrrrrrrr") ; 
      }
    } ;
  
    fetchLands() ; 
  },[]);
  return (
    <div style={{ padding: "2rem" }}>
       <p className="description-text">
          <img src='/lands/icon.png' style={{width: "20px"
                     , height: "20px" , margin: "auto 4px"}}/>
          <em style={{margin:"25px auto"}}>This website gives you lands for investment in agricultural way. Here you see some of our lands</em>
          <img src='./lands/icon.png' style={{width: "20px"
                     , height: "20px" , margin: "auto  6px",marginBottom: "-4px"}}/>
        </p>
      <h2>Lands in Syria</h2>
          <div className={styles.fullcontainer}>
          {lands.map((land) => (
              <div key={land.id} className=''  onClick={() => navigate(`/landdetailspage/${land.id}`)}>
              <div className={styles.card}>
                {/* <img src={land.idPhoto}  className={styles.image}/> */}
                <img src={land.landMedia[0]} className={styles.image}/>
                  <div id="Available_lands" className={styles.content}>
                      <span style={{display:"flex"}}>
                         <img src="/lands/dollers.png" style={{width: "20px",height: "20px"}} />
                          <p>{land.price}</p>
                     </span>
                      <span style={{display:"flex"}}>
                          <img src="/lands/house.jpg" style={{width: "20px",height: "20px",marginRight: "4px"}} />
                          <p>{land.area} Dunams</p>
                       </span>
                       <span style={{display:"flex"}}>
                        <img src="../public/lands/Land location.jpg" style={{width: "20px",height: "20px",marginRight: "4px"}} />
                        <p>{land.city}</p>
                      </span>
                      <p className={styles.desc}>{land.description}</p>
                      <div className={styles.footer}>
                      <div style={{display: "flex",alignItems: "center",marginRight: "17px"}}>
                        <img src="../public/lands/profile-circle.png" style={{width: "20px",height: "20px",marginRight: "4px"}} />
                        <span style={{fontWeight: "600"}}>{land.firstName} {land.lastName}</span>
                      </div>
                      {/* {land.id} */}
                      {/* <button
                        style={{ padding: "5px 20px", marginRight: "10px" }}
                        onClick={() => navigate(`/landdetailspage/${land.id}`)}
                        >
                        Details
                        </button> */}
                      <button style={{padding: "5px 30px"}}>Contact</button>
                      </div>
                  </div>
            </div>
          </div>
        ))}
      </div>
  </div>
  );
};

export default LandList;
