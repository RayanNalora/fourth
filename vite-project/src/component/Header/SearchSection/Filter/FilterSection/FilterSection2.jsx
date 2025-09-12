import React, { useState, useEffect } from 'react';
import './FilterSection.css';
import axios from 'axios';

const FilterSection2 = () => {
// بيانات الأراضي
const [lands, setLands] = useState([]);
const [filteredLands, setFilteredLands] = useState([]);

// حالات الفلاتر
const [city, setCity] = useState("");
const [village, setVillage] = useState("");
const [price, setPrice] = useState("");
const [space, setSpace] = useState("");
const [sortOption, setSortOption] = useState("");
  useEffect (() => {
    const fetchLands = async () => {
      try {
        const res = await axios.get("/api/v1/lands");
        const data = Array.isArray(res.data.data.lands) ? res.data.data.lands : [];
        setLands(data);
        setFilteredLands(data);
        console.log("Loaded lands:", data);
      } catch (error) {
        console.log("Error fetching lands:", error);
      }
    };
    fetchLands();
  }, []);
  
  const Citys = [
        "Damascus","Daraa","Hama","Homs","Aleppo","Deir ez-Zor","Tartus","Latakia","Raqqa","Idlib"
      ]

  // عرض جميع العقارات عند تحميل الصفحة
  useEffect(() => {
    // أول ما يفتح يعرض كل الأراضي
    setFilteredLands(lands);
  }, [lands]);

  // تحديث الفلتر عند النقر على زر View Results
  const handleViewResults = () => {
    let results = lands;

    if (price) {
      results = results.filter(l => typeof l.price === "number");
      switch(price){
        case "less-10000": results = results.filter(l => l.price < 100000); break;
        case "10000-20000": results = results.filter(l => l.price >= 100000 && l.price < 200000); break;
        case "20000-30000": results = results.filter(l => l.price >= 200000 && l.price < 300000); break;
        case "30000-40000": results = results.filter(l => l.price >= 300000 && l.price < 400000); break;
        case "more-40000": results = results.filter(l => l.price > 400000); break;
        default: break;
      }
    }
    if (space) {
      results = results.filter(l => typeof l.area === "number");
      switch(space){
        case "less-1dunams": results = results.filter(l => l.area < 1); break;
        case "1-5dunams": results = results.filter(l => l.area >= 1 && l.area < 5); break;
        case "5-10dunams": results = results.filter(l => l.area >= 5 && l.area < 10); break;
        case "10-50dunams": results = results.filter(l => l.area >= 10 && l.area < 50); break;
        case "more-50dunams": results = results.filter(l => l.area > 50); break;
        default: break;
      }
    }

    if (city) {
      results = results.filter(l => l.city?.toLowerCase() === city.toLowerCase());
    }

    // فلترة القرية
    if (village) {
      results = results.filter(l => l.village && l.village === village);
    }

    setFilteredLands(results);
  };

  // دالة الترتيب حسب الخيار المختار
  const handleSort = (option) => {
    setSortOption(option);

    let sorted = [...filteredLands];

    switch (option) {
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "area-desc":
        sorted.sort((a, b) => b.area - a.area);
        break;
      case "area-asc":
        sorted.sort((a, b) => a.area - b.area);
        break;
      default:
        break;
    }

    setFilteredLands(sorted);
  };

  return (
    <div className="property-page">
      {/* قسم الفلترة */}
      <div className="filter-section">
        <h2>Filter</h2>
        
        <div className="filter-container">
          {/* citys */}
          <select value={city} onChange={(e) => setCity(e.target.value)}>
             <option value="">Cities</option>
             {["Idlib", "Daraa", "Hama", "Homs", "Aleppo"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          
          <select value={village} onChange={(e) => setVillage(e.target.value)}>
            <option value="">Village</option>
            {["Al-Mazraa", "Ariqa", "Qanawat", "Al-Salkhad", "Al-Shahba", "Al-Hirak", "Nawa", "Tafas", "Izra", "Busra al-Sham" ,
              "Al-Mayadin","kamal","Al-Kasra","Al-Tabni","Al-Suwar", "Baniyas","Safita","Dreikish","Al-Hamidiyah","Sheikh Badr",
              "Qardaha","Jableh","Al-Haffah","Salibeh","Kasab","Maarat al-Numan","Saraqib","Binnish","Kafranbel","Jisr al-Shughur",
              "Al-Qusayr",
              "Al-Rastan",
              "Talbiseh",
              "Al-Qaryatayn",
              "Palmyra",
              "Taybat al-Imam",
              "Suran",
              "Masyaf",
              "Karnaz",
              "Kafr Zita",
              "Al-Bab",
              "Azaz",
              "Afrin",
              "Manbij",
              "Jarabulus", "Douma",
              "Darayya",
              "Al-Tall",
              "Al-Zabadani",
              "Yabroud",

            ].map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>


    {/* اختيار السعر */}
        <select value={price} onChange={(e) => setPrice(e.target.value)}>
            <option value="">Price</option>
            <option value="less-10000">Less than 100,000 $</option>
            <option value="10000-20000">100,000 - 200,000 $</option>
            <option value="20000-30000">200,000 - 300,000 $</option>
            <option value="30000-40000">300,000 - 400,000 $</option>
            <option value="more-40000">More than 400,000 $</option>
          </select>

{/* اختيار المساحة */}
         <select value={space} onChange={(e) => setSpace(e.target.value)}>
            <option value="">Space</option>
            <option value="less-1dunams">Less than 1 dunams</option>
            <option value="1-5dunams">1 - 5 dunams</option>
            <option value="5-10dunams">5 - 10 dunams</option>
            <option value="10-50dunams">10 - 50 dunams</option>
            <option value="more-50dunams">More than 50 dunams</option>
          </select>

          <button className="view-results-btn" onClick={handleViewResults}>View Results</button>
        </div>
      </div>

      {/* قسم عرض العقارات */}
      <div className="property-list">
        <div className="property-list-header">
          {/* 🔹 اختيار الترتيب */}
          <select className='sortselect' value={sortOption} onChange={(e) => handleSort(e.target.value)}>
            <option value=""> Sort </option>
            <option value="price-desc">Descending order by price</option>
            <option value="price-asc"> Ascending order by pric </option>
            <option value="area-desc">Descending order by area</option>
            <option value="area-asc">Ascending order by area </option>
          </select>
        </div>
        {filteredLands.map((property) => (
          <div key={property.id} className="property-item">
            <div className="property-image">
              {/* <img src="/lands/p1.jpg"  /> */}
              {property.landMedia?.map((media,i)=> (
                  <img key={i} src={media} alt={`Media ${i+1}`} />
                ))}
                {/* <img src={property.idPhoto}  className={styles.image}/> */}
            </div>
            
            <div className="property-details">
              <div className="property-header">

              <p style={{display:"flex"}}>
                <img src="/lands/dollers.png" style={{width: "20px",height: "20px"}} />
                <div className="property-price">{property.price}</div>
              </p>

              <p style={{display:"flex"}}>
                 <img src="/lands/house.jpg" style={{width: "20px",height: "20px",marginRight: "4px"}} />
                 <div className="property-size">{property.area} Dunmas</div>

             </p>
             <p style={{display:"flex"}}>
                 <img src="/lands/Land location.jpg" style={{width: "20px",height: "20px",marginRight: "4px"}} />
                 <div className="property-location">
                   {property.city}
                 </div>
             </p>
              </div>
              
              <p className="property-description">{property.description}</p>
              
              <div className="property-footer">
                <div className="owner-info">
                  <span className="owner-icon">
                  <img src="/lands/profile-circle.png" style={{width: "20px",height: "20px",marginRight: "4px"}} />
                  </span>
                  {property.firstName} {property.lastName}
                </div>
                <button className="contact-button">Contact</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSection2;
