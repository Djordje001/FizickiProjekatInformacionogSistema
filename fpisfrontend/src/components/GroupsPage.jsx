import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
function GroupsPage({groups}) {
    const [selectedOption, setSelectedOption] = useState('');
    const[tableData,setTableData]=useState([]);
    
    const handleComboBoxChange = (event) => {
        if(!event.target.value){
            setSelectedOption(event.target.value);
            setTableData([]);
            return;
        }
        setSelectedOption(event.target.value);
        console.log('Izabrana opcija:', event.target.value);

        axios.get('/api/groups/'+event.target.value,{

        }).then((response)=>{
            console.log(response);
            setTableData(response.data.data);
        }).catch((error)=>{
            console.log(error);
        });
         
      };


      // const[groups,setGroups]=useState([]);
      // useEffect(() => {
          
       
      //     axios
      //       .get('/api/groups', {
              
      //       })
      //       .then((response) => {
      //         console.log(response);
      //         setGroups(response.data.groups);
              
      //       })
      //       .catch((error) => {
              
      //         console.log(error);
      //       });
      //   },[]);
  return (
    <>
    <div className="combobox-container">
      <select className="combobox" value={selectedOption} onChange={handleComboBoxChange}>
        <option value="">Select group</option>
        {groups.map(group => (
          <option key={group.id} value={group.id}>{group.name}</option>
        ))}
      </select>
    </div>
  
    <div className="group-stage-tables">
      <table>
        <thead>
          <tr>
          <th>Country</th>
          <th>Matches played</th> 
          <th>Wins</th> 
          <th>Draws</th> 
          <th>Losses</th> 
          <th>Goals conceded</th> 
          <th>Goals scored</th> 
          <th>Points</th> 
          </tr>
        </thead>
        <tbody>
          {tableData.map((team, index) => (
            <tr key={index}>
              <td>{team.name}</td>
              <td>{team.played_games}</td>
              <td>{team.wins}</td>
              <td>{team.tieds}</td>
              <td>{team.losses}</td>
              <td>{team.goals_conceded ? team.goals_conceded : 0}</td>
              <td>{team.goals_scored ? team.goals_scored : 0}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
    <style jsx>{`
      .combobox-container {
        width: 200px;
        margin: 50px auto 20px; /* 50px from top, centered horizontally */
      }
  
      .combobox {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 16px;
        outline: none;
        transition: border-color 0.3s ease;
      }
  
      .combobox:focus {
        border-color: #007bff;
      }
  
      .group-stage-tables {
        margin: 20px auto; /* Centering table horizontally */
        width: 80%; /* Adjust width as needed */
      }
  
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px; /* Add space between combobox and table */
      }
  
      th, td {
        border: 1px solid #ccc;
        padding: 8px;
        text-align: center;
      }
  
      th {
        background-color: #f2f2f2;
        font-weight: bold;
      }
  
      tbody tr:nth-child(even) {
        background-color: #f2f2f2;
      }
  
      tbody tr:hover {
        background-color: #e0e0e0;
      }
    `}</style>
  </>
  
  
  )
}

export default GroupsPage