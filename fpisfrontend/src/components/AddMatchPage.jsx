import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

function AddMatchPage({teams,stadiums,refreshMatchesFunction}) {
  //console.log(groups);
  console.log(stadiums);
   // const[groups,setGroups]=useState([]);
    //const[teams,setTeams]=useState([]);
    //const[stadiums,setStadiums]=useState([]);
    const [selectedOptionGroup, setSelectedOptionGroup] = useState('');
    const [selectedOptionStadium, setSelectedOptionStadium] = useState('');
    const [selectedOptionTeam1, setSelectedOptionTeam1] = useState('');
    const [selectedOptionTeam2, setSelectedOptionTeam2] = useState('');



   
    const[clickedMatch,setClickedMatch]=useState(false);
   
     
     const[successMatch,setSuccessMatch]=useState(false);
   
     
     const[messageMatch,setMessageMatch]=useState("");

    const[time,setTime]=useState('');
    const currentDateTime = new Date();
const year = currentDateTime.getFullYear();
const month = String(currentDateTime.getMonth() + 1).padStart(2, '0');
const day = String(currentDateTime.getDate()).padStart(2, '0');
const hours = String(currentDateTime.getHours()).padStart(2, '0');
const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
const seconds = String(currentDateTime.getSeconds()).padStart(2, '0');

const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
   // const[tableData,setTableData]=useState([]);
    
    // const handleComboBoxChangeGroup = (event) => {
      
    //     if(!event.target.value){
    //       setTeams([]);
    //       setSelectedOptionTeam1('');
    //     setSelectedOptionTeam2('');
    //         setSelectedOptionGroup(event.target.value);
    //      //   setTableData([]);
    //         return;
    //     }
    //     setTeams([]);
    //     setSelectedOptionGroup(event.target.value);
    //     console.log('Izabrana opcija:', event.target.value);
    //     setSelectedOptionTeam1('');
    //     setSelectedOptionTeam2('');
    //     axios.get('/api/teams/'+event.target.value,{

    //     }).then((response)=>{
    //         console.log(response);
    //        // setTableData(response.data);
    //        setTeams(response.data.teams);
    //     }).catch((error)=>{
    //         console.log(error);
    //     });
         
    //   };
    // useEffect(() => {
          
       
    //     axios
    //       .get('/api/groups', {
            
    //       })
    //       .then((response) => {
    //         console.log(response);
    //         setGroups(response.data);
            
    //       })
    //       .catch((error) => {
            
    //         console.log(error);
    //       });

    //       axios
    //       .get('/api/stadiums', {
            
    //       })
    //       .then((response) => {
    //         console.log(response);
    //         setStadiums(response.data);
            
    //       })
    //       .catch((error) => {
            
    //         console.log(error);
    //       });
    //   },[]);

      function addMatch() {
      //  if(selectedOptionGroup=="" | selectedOptionStadium=="" | selectedOptionTeam1=="" | selectedOptionTeam2=="" | time==''){
      //   setError(true);
      //   setServerError(false);
      //   setServerErrorMessage("");
      //   return;
      //  }
      //  setError(false);
      //  console.log(time);

       
// Razdvajamo datum i vreme
let formattedDateTime='';
if(time!=''){
const dateTimeParts = time.split('T');
// Razdvajamo delove datuma
const dateParts = dateTimeParts[0].split('-');
// Razdvajamo delove vremena
const timeParts = dateTimeParts[1].split(':');

// Kreiramo formatirani datum i vreme
formattedDateTime = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]} ${timeParts[0]}:${timeParts[1]}:00`;
}

console.log(formattedDateTime);





       const data=new FormData();
       data.append('team1_id',selectedOptionTeam1);
       data.append('team2_id',selectedOptionTeam2);
       data.append('stadium_id',selectedOptionStadium);
       data.append('start',formattedDateTime)
       axios
       .post('/api/matches', data,{
         
       })
       .then((response) => {
        console.log(response);
        // setGroupName('');
        // setRefresh(refresh=>!refresh);
        refreshMatchesFunction();

        setClickedMatch(true);
        // setErrorGroup(false);
         setSuccessMatch(true);
         setMessageMatch(response.data.message);
     
        setSelectedOptionGroup('');
        setSelectedOptionStadium('');
        setSelectedOptionTeam1('');
        setSelectedOptionTeam2('');
        setTime('');
       })
       .catch((error) => {
         console.log(error);
         setClickedMatch(true);
         // setErrorGroup(false);
          setSuccessMatch(false);
          let pomocna="";
      if(error.response.data.errors &&  error.response.data.errors.team1_id){
        pomocna+=error.response.data.errors.team1_id;
      }
      if(error.response.data.errors && error.response.data.errors.team2_id){
        pomocna=pomocna+" "+error.response.data.errors.team2_id;
      }
      if(error.response.data.errors && error.response.data.errors.stadium_id){
        pomocna=pomocna+" "+error.response.data.errors.stadium_id;
      }
      if(error.response.data.errors && error.response.data.errors.start){
        pomocna=pomocna+" "+error.response.data.errors.start;
      }
      if(!error.response.data.errors){
        console.log(error.response.data.message);
        pomocna=error.response.data.message;
      }



          setMessageMatch(pomocna);
      
         //console.log(error);
         //console.log(error.errors);
       });
       
      }
  return (

    <>
  <div className="form-container">
    <div className="form-row">
      <div className="form-item">
        {/* <label htmlFor="group">Grupa:</label>
        <select id="group" className="combobox" value={selectedOptionGroup} onChange={handleComboBoxChangeGroup}>
          <option value="">Select group</option>
          {groups.map(group => (
            <option key={group.id} value={group.id}>{group.name}</option>
          ))}
        </select> */}
      </div>
      <div className="form-item">
        <label htmlFor="stadium">Stadium:</label>
        <select id="stadium" className="combobox" value={selectedOptionStadium} onChange={(e) => setSelectedOptionStadium(e.target.value)}>
          <option value="">Select stadium</option>
          {stadiums.map(stadium => (
            <option key={stadium.id} value={stadium.id}>{stadium.name}</option>
          ))}
        </select>
      </div>
    </div>
    <div className="form-row">
      <div className="form-item">
        <label htmlFor="team1">Team 1:</label>
        <select id="team1" className="combobox" value={selectedOptionTeam1} onChange={(e) => setSelectedOptionTeam1(e.target.value)}>
          <option value="">Select team 1</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}   >{team.name}</option>
          ))}
        </select>
      </div>
      <div className="form-item">
        <label htmlFor="team2">Team 2:</label>
        <select id="team2" className="combobox" value={selectedOptionTeam2} onChange={(e) => setSelectedOptionTeam2(e.target.value)} >
          <option value="">Select team 2</option>
          {teams.map(team => (
            <option key={team.id} value={team.id} >{team.name}</option>
          ))}
        </select>
      </div>
    </div>
    <div className="form-row">
      <div className="form-item">
        <label htmlFor="date">Date:</label>
        <input type="datetime-local" id="date" value={time} onChange={(e) => setTime(e.target.value)} className="date-input" />
      </div>
    </div>
    <div className="form-row">
      <button className="add-match-button" onClick={addMatch}>Add match</button>
      
    </div>
    <div className="form-row">
    {clickedMatch && (
        <label style={{ color: successMatch ? 'green' : 'red', fontSize: '14px', marginTop: '5px' }}>
       {messageMatch}
       </label> 
       )}
    </div>
  </div>

  <style jsx>{`
    .form-container {
      width: 60%;
      margin: 50px auto;
      padding: 30px;
      border: 1px solid #ccc;
      border-radius: 10px;
    }

    .form-row {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }

    .form-item {
      flex: 1;
      margin-right: 20px;
    }

    .combobox, .date-input {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 18px;
      outline: none;
      transition: border-color 0.3s ease;
    }

    .combobox:focus, .date-input:focus {
      border-color: #007bff;
    }

    label {
      font-weight: bold;
      margin-right: 10px;
      font-size: 18px;
    }

    .add-match-button {
      padding: 12px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 18px;
      width:100%;
    }
  `}</style>
</>

  
  )
}

export default AddMatchPage