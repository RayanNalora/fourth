import React, { useState } from "react";
import "./ContactForm.css";
import Header from "../Header";
import Footer from "../../Footer/Footer";
import axios from "axios";

export default function ContactForm() {
  const[firstName,setfirstName]=useState('')
  const [Message,setMessage] = useState('')

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData =new FormData();
  //   formData.append('firstName',firstName);
    // formData.append('lastName',lastName);
    // formData.append('gender',gender);
    // formData.append('email',email);
    // formData.append('city',city);
    // formData.append('yourPhoto',yourPhoto);
    // formData.append('title',title);
    // formData.append('area',area);

    // try{
    //   const response = await axios.post("/api/v1/lands",formData,{
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   }).then(res => console.log(res.data));
    // }catch(error){
    //   setMessage('error'+error.message)
    // }
  //   try{
  //     const res = await axios.post("/api/v1/lands",formData,
  //     { 
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     }
  //   ).then(res => console.log(res.data));
  //   }catch(error){
  //     setMessage('error'+error.message)
  //   }
  // };
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phoneCode: "",
    phoneNumber: "",
    city: "",
    yourPhoto: null,
    idPhoto: null,
    ownershipPhoto: null,
    title: "",
    area: "",
    price: "",
    crop: "",
    treeAge: "",
    workers: "",
    equipment: "",
    rainRate: "",
    waterSource: "",
    irrigationWay: "",
    temperatureRate: "",
    climate: "",
    soil: "",
    suitableCrops: "",
    returns: "",
    contractDuration: "",
    description: "",
    landMedia: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted!");
  };

  return (
    <>
    <Header/>
    <div className="imagetofram">
      <img src="/lands/fram.png" ></img>
    </div>
    {/* <form onSubmit={handleSubmit}>
    <br/><br/><br/><br/><br/><br/><br/>
     <label>name</label> <input
     type="text" value={firstName}   onChange={(e)=>{setfirstName(e.target.value)}}/><br/> */}
     
     {/* <label>name</label> <input/>
     <label>name</label> <input/><br/>
     <label>name</label> <input/><br/>
     <label>name</label> <input/><br/>
     <label>name</label> <input/><br/>
     <label>name</label> <input/><br/>
     <label>name</label> <input/><br/>
     <label>name</label> <input/><br/>
     <label>name</label> <input/><br/>
     <label>name</label> <input/><br/>
     <label>name</label> <input/><br/> */}
     {/* <button type="submit" >submit</button>
    </form> */}
    
    <div className="max-w-5xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-8"> 

        {/* Your Info */}
         <section>
          <h2 className="text-xl font-bold mb-4">Your info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
            <label>First name</label>
           <input name="firstName" placeholder="First name" onChange={handleChange} className="border p-2" />
           </div>

           <div>
              <label>Last name</label>
              <input name="lastName" placeholder="Last name" onChange={handleChange} className="border p-2" />
          </div>            
           <div>
            <label>Gender</label>
            <select name="gender" onChange={handleChange} className="border p-2">
                <option value="">Please select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
           </div>
           <br></br>
            <div>
              <label>Email</label>
              <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2" />
            </div>     
            <div>
              <label>Phone Code</label>
              <input name="phoneCode" placeholder="Area code" onChange={handleChange} className="border p-2" />
            </div>        
             <div>
              <label>Phone Number</label>
            <input name="phoneNumber" placeholder="The number" onChange={handleChange} className="border p-2" />
            </div>
            <div>
              <label>You city</label>
              <input name="city" placeholder="Your city" onChange={handleChange} className="border p-2" />
            </div>
            <br></br>
            <div>
              <label>Your photo</label>
              <input type="file" name="yourPhoto" onChange={handleChange} className="border p-2" />
            </div>
            <div>
              <label>Your ID photo</label>
              <input type="file" name="idPhoto" onChange={handleChange} className="border p-2" />
            </div>
            <div>
              <label>Photos for land ownership contract </label>
              <input type="file" name="ownershipPhoto" onChange={handleChange} className="border p-2" />
            </div>
          </div>
        </section> 

         <h2 className="text-xl font-bold mb-4">Your land info</h2> 
         <section>
          <h2 className="text-xl font-bold mb-4">Your land info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Title</label>
               <input name="title" placeholder="Title" onChange={handleChange} className="border p-2" />
            </div>
            <div>
               <label>Land area</label>
               <input name="area" placeholder="Land area" onChange={handleChange} className="border p-2" />
            </div>
            <div>
              <label>Land price</label>
               <input name="price" placeholder="Land price" onChange={handleChange} className="border p-2" />
            </div>
            <div>
              <label>Current crop</label>
               <input name="crop" placeholder="Current crop" onChange={handleChange} className="border p-2" />
            </div>
            <div>
              <label>Tree Age</label>
              <input name="treeAge" placeholder="Tree's age" onChange={handleChange} className="border p-2" />
            </div>
            <div>
              <label>workers number</label>
               <input name="workers" placeholder="Workers number" onChange={handleChange} className="border p-2" />
            </div>
            <div>
              <label>Equipment</label>
               <input name="equipment" placeholder="Equipments" onChange={handleChange} className="border p-2" />
            </div>
            <div>
              <label>Rain rate</label>
              <input name="rainRate" placeholder="Rain rate" onChange={handleChange} className="border p-2" />
            </div>
            <div>
              <label>Water source</label>
               <input name="waterSource" placeholder="Water source" onChange={handleChange} className="border p-2" />
            </div>
            <div>
              <label>Irrigation way</label>
               <input name="irrigationWay" placeholder="Irrigation way" onChange={handleChange} className="border p-2" />
            </div>
            
            <div><label>Temperature rate</label><input name="temperatureRate" placeholder="Temperature rate" onChange={handleChange} className="border p-2" /></div>
            <div><label>Climate situation</label><input name="climate" placeholder="Climate situation" onChange={handleChange} className="border p-2" /></div>
            <div><label>Soil kind</label><input name="soil" placeholder="Soil kind" onChange={handleChange} className="border p-2" /></div>
            <div><label>Suitable crops</label><input name="suitableCrops" placeholder="Suitable crops" onChange={handleChange} className="border p-2" /></div>
            <div><label>Estimated returns</label><input name="returns" placeholder="Estimated returns" onChange={handleChange} className="border p-2" /></div>
            <div><label>Contract duration</label><input name="contractDuration" placeholder="Contract duration" onChange={handleChange} className="border p-2" /></div>
            <div><label>Description</label><textarea name="description" placeholder="Description" onChange={handleChange} className="border p-2 col-span-2" /></div>
            <div> <label>Photos and vedieos for the land</label><input placeholder="Browse land photos and vedio  " type="file" name="landMedia" onChange={handleChange} className="border p-2 col-span-2" /></div>
          </div>
        </section> 

        Submit Button
         <div className="flex justify-center">
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            Post your land!
          </button>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
}
