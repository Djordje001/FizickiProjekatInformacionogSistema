import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
function HomePage({stadiums}) {
  // const[stadiums,setStadiums]=useState([]);
  // useEffect(() => {
      
   
  //     axios
  //       .get('/api/stadiums', {
          
  //       })
  //       .then((response) => {
  //         console.log(response);
  //         setStadiums(response.data.stadiums);
          
  //       })
  //       .catch((error) => {
          
  //         console.log(error);
  //       });
  //   },[]);
     
  return (
    <>
     <h1 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#333', marginBottom: '20px' }}>Qatar 2024</h1>
    <div className="stadium-container">
      <div className="stadium-list">
        {stadiums.map(stadium => (
          <div key={stadium.id} className="stadium-card">
            <img src={stadium.image_path} alt={stadium.name} />
            <div className="stadium-info">
              <h3>{stadium.name}</h3>
              <p>Location: {stadium.location}</p>
            </div>
          </div>
        ))}
      </div>
      <style>
        {`
          .stadium-container {
            display: flex;
            justify-content: center; /* Centriranje elemenata horizontalno */
          }

          .stadium-list {
            display: grid;
            grid-template-columns: repeat(3, 1fr); /* Tri kolone */
            gap: 20px; /* Razmak između kartica */
            justify-content: center; /* Centriranje elemenata horizontalno */
            max-width: 1200px; /* Maksimalna širina kontejnera */
          }

          .stadium-card {
            width: 500px; /* Širina kartice */
            height: 400px; /* Visina kartice */
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .stadium-card img {
            width: 100%;
            height: 70%; /* Visina slike unutar kartice */
            object-fit: cover; /* Da bi slika pokrila celu površinu */
            border-radius: 5px 5px 0 0; /* Da bi se zaoblili gornji uglovi slike */
          }

          .stadium-info {
            padding-top: 10px;
          }
        `}
      </style>
    </div>
    </>
  )
}

export default HomePage