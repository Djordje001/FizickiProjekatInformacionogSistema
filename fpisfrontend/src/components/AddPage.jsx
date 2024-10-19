import React from 'react'

import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function AddPage({groups,refreshGroupsFunction,refreshTeamsFunction}) {
    const [groupName, setGroupName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [logo, setLogo] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState('');
  //const[groups,setGroups]=useState([]);
  //const[refresh,setRefresh]=useState(true);

  


 const[clickedGroup,setClickedGroup]=useState(false);
 const[clickedTeam,setClickedTeam]=useState(false);

  const[successGroup,setSuccessGroup]=useState(false);
  const[successTeam,setSuccessTeam]=useState(false);

  const[messageGroup,setMessageGroup]=useState("");
  const[messageTeam,setMessageTeam]=useState("");

  const handleGroupSubmit = (event) => {
    event.preventDefault();
    //onAddGroup({ groupName });
    // if(groupName===''){
    //   setErrorGroup(true);
    //   setSuccessGroup(false);
    //     return;
    // }
    // setErrorGroup(false);
    // setSuccessGroup(true);
    const data=new FormData();
    data.append('name',groupName);
    axios
    .post('/api/groups', data,{
      
    })
    .then((response) => {
      setClickedGroup(true);
      refreshGroupsFunction();
     // setErrorGroup(false);
      setSuccessGroup(true);
      setMessageGroup(response.data.message);
      setGroupName('');
      //setRefresh(refresh=>!refresh);
      
    
      
    })
    .catch((error) => {
      setClickedGroup(true);
      setSuccessGroup(false);
      console.log(error.response.data.errors.name);
      setMessageGroup(error.response.data.errors.name)
      
      console.log(error);
    });



    
  };

  const handleTeamSubmit = (event) => {
    event.preventDefault();
    console.log(logo);
    console.log(selectedGroup);
    console.log(countryName);

    // if(logo===null | selectedGroup==="" ||countryName===""){
      

    //   setSuccessTeam(false);
    //     console.log("nesto je prazno");
    //     return;
    // }
    
    // setSuccessTeam(true);
    //onAddTeam({ country, logo, selectedGroup });
    

    const data=new FormData();
    data.append('name',countryName);
    data.append('image',logo);
    data.append('group_id',selectedGroup);
    axios
    .post('/api/teams', data,{
      
    })
    .then((response) => {
     // setGroupName('');
     // setRefresh(refresh=>!refresh);
     refreshTeamsFunction();
     setClickedTeam(true);
     setSuccessTeam(true);
      setMessageTeam(response.data.message);

     setCountryName('');
     setLogo(null);
     setSelectedGroup('');
      
    })
    .catch((error) => {
      setSuccessTeam(false);
      let pomocna="";
      if(error.response.data.errors.group_id){
        pomocna+=error.response.data.errors.group_id;
      }
      if(error.response.data.errors.name){
        pomocna=pomocna+" "+error.response.data.errors.name;
      }
      if(error.response.data.errors.image){
        pomocna=pomocna+" "+error.response.data.errors.image;
      }
      setMessageTeam(pomocna);
      setClickedTeam(true);
      console.log(error);
      console.log(error.response.data.errors.group_id);
      console.log(error.response.data.errors.name);
      console.log(error.response.data.errors.image);
      //console.log(error.response.data.errors.);
    });
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    setLogo(file);
  };

  // useEffect(() => {
       
  //   axios
  //     .get('/api/groups', {
        
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       setGroups(response.data);
        
  //     })
  //     .catch((error) => {
        
  //       console.log(error);
  //     });
  // },[refresh]);

  return (
    
    <div className="form-container">
      <div className="form-wrapper">
        <h2>Add Group</h2>
        <form onSubmit={handleGroupSubmit}>
          <input 
            type="text" 
            placeholder="Group Name" 
            value={groupName} 
            onChange={(e) => setGroupName(e.target.value)} 
          />
          <button type="submit">Add Group</button>
          {/* {errorGroup && (
       <label style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>Morate uneti ime grupe</label>
         )} */}

       {clickedGroup && (
        <label style={{ color: successGroup ? 'green' : 'red', fontSize: '14px', marginTop: '5px' }}>
       {messageGroup}
       </label> 
       )}
        </form>
      </div>

      <div className="form-wrapper">
        <h2>Add Team</h2>
        <form onSubmit={handleTeamSubmit}>
          <input 
            type="text" 
            placeholder="Team name" 
            value={countryName} 
            onChange={(e) => setCountryName(e.target.value)} 
          />
          <input 
            type="file" 
            accept=".jpg, .jpeg, .png" 
            onChange={handleLogoChange} 
           // value={logo ? logo.name : ''}
          />
          <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
             <option value="">Select Group</option>
             {groups.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}  
          </select>

          <button type="submit">Add Team</button>
          {clickedTeam && (
        <label style={{ color: successTeam ? 'green' : 'red', fontSize: '14px', marginTop: '5px' }}>
       {messageTeam}
       </label> 
       )}

{/* {successTeam && (
       <label style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{messageTeam}</label>
         )} */}
        </form>
      </div>

      <style jsx>{`
        .form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-top: 20px;
        }

        .form-wrapper {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  width: 60%; /* Dodato pravilo za širinu */
}

        h2 {
          margin-bottom: 10px;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        input, select {
          margin-bottom: 10px;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 3px;
          outline: none;
        }

        button {
          padding: 8px 12px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          outline: none;
        }

        button:hover {
          background-color: #0056b3;
        }

        input[type="file"] {
          padding: 0;
        }
      `}</style>
    </div>
  );
}

export default AddPage