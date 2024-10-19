import logo from './logo.svg';
import './App.css';
import { Routes,Route,Navigate} from 'react-router-dom';
import HomePage from './components/HomePage';

//import ThirdPage from './components/ThirdPage';
import NavBar from './components/Navbar';

import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import GroupsPage from './components/GroupsPage';
import AddPage from './components/AddPage';
import AddMatchPage from './components/AddMatchPage';
//import MatchesPage from './components/AddMatchPage';
import Matches from './components/Matches';


function App() {
  const[stadiums,setStadiums]=useState([]);
  const[groups,setGroups]=useState([]);
  const[teams,setTeams]=useState([]);
  const[matches,setMatches]=useState([]);
  const[refreshGroups,setRefreshGroups]=useState(false);
    useEffect(() => {
        
        console.log("1");
        axios
          .get('/api/stadiums', {
            
          })
          .then((response) => {
            console.log(response);
            setStadiums(response.data.stadiums);
            console.log("3");
            
          })
          .catch((error) => {
            
            console.log(error);
          });
          console.log("2");

          
      },[]);


      useEffect(() => {
        
     
      

          axios
          .get('/api/groups', {
            
          })
          .then((response) => {
            console.log(response);
            setGroups(response.data.groups);
            
          })
          .catch((error) => {
            
            console.log(error);
          });
      },[]);


      useEffect(() => {
        
     
      

        axios
        .get('/api/teams', {
          
        })
        .then((response) => {
          console.log(response);
          setTeams(response.data.teams);
          
        })
        .catch((error) => {
          
          console.log(error);
        });
    },[]);


    useEffect(() => {
        
     
      

      axios
      .get('/api/matches', {
        
      })
      .then((response) => {
        console.log(response);
        setMatches(response.data.matches);
        
      })
      .catch((error) => {
        
        console.log(error);
      });
  },[]);


   


    
    const refreshTeamsFunction = () => {
      axios
        .get('/api/teams', {
          
        })
        .then((response) => {
          console.log(response);
          setTeams(response.data.teams);
          
        })
        .catch((error) => {
          
          console.log(error);
        });
    };
    const refreshGroupsFunction = () => {
      axios
        .get('/api/groups', {
          
        })
        .then((response) => {
          console.log(response);
          setGroups(response.data.groups);
          
        })
        .catch((error) => {
          
          console.log(error);
        });
    };

    const refreshMatchesFunction = () => {
      axios
        .get('/api/matches', {
          
        })
        .then((response) => {
          console.log(response);
          setMatches(response.data.matches);
          
        })
        .catch((error) => {
          
          console.log(error);
        });
    };
    

  return (
    <Routes>
      <Route path='/' element={<NavBar/>}>
    <Route path="home" element={<HomePage stadiums={stadiums}/>} />
    <Route path="groups" element={<GroupsPage groups={groups}/>} />
    <Route path="add" element={<AddPage groups={groups} refreshGroupsFunction={refreshGroupsFunction}  refreshTeamsFunction={refreshTeamsFunction}/>} />
    <Route path="addmatch" element={<AddMatchPage teams={teams}  stadiums={stadiums} refreshMatchesFunction={refreshMatchesFunction}/>}/>
    <Route path="matches" element={<Matches matches={matches} refreshMatchesFunction={refreshMatchesFunction}/>}/>
    <Route path="*" element={<Navigate to="/home" />} />
    </Route>
  </Routes>
  );
}

export default App;
