 import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/App.css';


function App() {
   const  KEY = '88756f9cc4e8ce3d5f02ecd792d9b8a2';
   const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
  
   const [meteo,setMeteo] = useState() ;
   const [recherche,setRecherche] = useState();

  useEffect(()=>{
    if(recherche==undefined || recherche ==""){
      navigator.geolocation.getCurrentPosition((position) => {
        axios.get(`${BASE_URL}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&lang=fr&appid=${KEY}`).then((res)=>{
          setMeteo(res.data)
        }); 
        });
    }else{
      axios.get(`${BASE_URL}?q=${recherche}&units=metric&lang=fr&appid=${KEY}`)
      .then((res)=>{
        setMeteo(res.data)
      })
      .catch(function (error) {
      })
    }
   
  },[recherche]);
  const dateBuilder = (d) => {
    let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "July", "Juillet", "Aout","Septembre","Octobre", "Novembre", "Decembre"];
    let days = ["Samedi", "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  
  return (
    <div className="App">
      <div className="serach">
        <input type="text"
         placeholder="Recherche... " 
          onChange={(e)=>setRecherche(e.target.value)}
         />
      </div>
     <div className="info">
        <div className="position">
          {!(meteo==undefined)? <span>{meteo.name },{meteo.sys.country} </span> : ""}
        </div>
        <div className="date">
          {!(meteo==undefined)? dateBuilder(new Date()) : ""}
        </div>
          <div className="tempurature">
              {!(meteo==undefined)? <span>{meteo.main.temp}<span className='celcus'>℃ </span></span> :""}
          </div>
        <div className="temps">
          {!(meteo==undefined)? meteo.weather[0].description:""}
        </div>
     </div>
     
     
    </div>
  );
}

export default App;
