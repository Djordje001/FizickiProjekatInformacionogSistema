import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

function Matches({matches,refreshMatchesFunction}) {
    //const [matches,setMatches]=useState([]);
    const [updejtuj,setUpdejtuj]=useState(false);


    const[error,setError]=useState(false);
    const[errorMessage,setErrorMessage]=useState("");



    const[clickedMatch,setClickedMatch]=useState(false);
   
     
    const[successMatch,setSuccessMatch]=useState(false);
  
    
    const[messageMatch,setMessageMatch]=useState("");

    
    // useEffect(() => {
          
       
    //     axios
    //       .get('/api/matches', {
            
    //       })
    //       .then((response) => {
    //         console.log(response);
    //        // setGroups(response.data);
    //         setMatches(response.data.matches);
    //       })
    //       .catch((error) => {
            
    //         console.log(error);
    //       });
    //   },[updejtuj]);
  
    
      const [team1Goals,setTeam1Goals]=useState(0);
      const [team2Goals,setTeam2Goals]=useState(0);
      const [isMatchSubmitted,setIsMatchSubmitted]=useState(false);
      const[currentMatch,setCurrentMatch]=useState(null);
      const [show,setShow]=useState(false);

      function handleSubmit(){
        console.log(team1Goals);
        console.log(team2Goals);
        console.log(isMatchSubmitted);

        if(currentMatch==null){
          return;
        }
        const data=new FormData();
        data.append('number_of_goals_team1',team1Goals);
        data.append('number_of_goals_team2',team2Goals);
        data.append('start',currentMatch.start);
        data.append('surrendered',isMatchSubmitted);

        axios
        .put('/api/matches/'+currentMatch.id,data, {
          headers: {
                     
            'Content-Type': 'application/json',
           
              
            
             
            },
        })
        .then((response) => {
          
          console.log(response);
          setClickedMatch(true);
          setMessageMatch(response.data.message);
          setSuccessMatch(true);

         // setGroups(response.data);
         
          setUpdejtuj(updejtuj=>!updejtuj);
          setTeam1Goals(0);
          setTeam2Goals(0);
          setIsMatchSubmitted(false);

        setShow(false);
        refreshMatchesFunction();
        })
        .catch((error) => {
          setClickedMatch(true);
          setMessageMatch(error.response.data.message);
          setSuccessMatch(false);


          

          console.log(error);
          console.log(error.response.data.message);
        });
   





      }
      function handleClose(){
        
        setTeam1Goals(0);
        setTeam2Goals(0);
        setIsMatchSubmitted(false);

        setShow(false);
      }

      function openModal(match){
        //console.log(match);
        setCurrentMatch(match);
        setClickedMatch(true);
        setMessageMatch("");
        setSuccessMatch(false);
        setShow(true);
      }
      



  

  return (
    <div style={{ fontFamily: "Arial, sans-serif", marginTop: "50px", textAlign: "center" }}>
    <table style={{ borderCollapse: "collapse", width: "80%", margin: "0 auto" }}>
      <thead>
        <tr style={{ backgroundColor: "#f2f2f2" }}>
          <th style={{ padding: "10px", border: "1px solid #ddd" }}>Team 1</th>
          <th style={{ padding: "10px", border: "1px solid #ddd" }}>Team 2</th>
          <th style={{ padding: "10px", border: "1px solid #ddd" }}>Stadium</th>
          {/* <th style={{ padding: "10px", border: "1px solid #ddd" }}>Goals team 1</th>
          <th style={{ padding: "10px", border: "1px solid #ddd" }}>Goals team 2</th> */}
          <th style={{ padding: "10px", border: "1px solid #ddd" }}>Start</th>
          <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {matches.map((match) => (
        <tr key={match.id} style={{ border: "1px solid #ddd" }}>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center" }}>
              <span>{match.team1_name}</span>
              <img src={match.team1_image_path} alt="" style={{ maxWidth: "100px", maxHeight: "100px", marginLeft: "10px" }} />
            </div>
          </td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center" }}>
              <span>{match.team2_name}</span>
              <img src={match.team2_image_path} alt="" style={{ maxWidth: "100px", maxHeight: "100px", marginLeft: "10px" }} />
            </div>
          </td>

          <td style={{ padding: "10px", border: "1px solid #ddd" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center" }}>
              <span>{match.stadium_name}</span>
              <img src={match.stadium_image_path} alt="" style={{ maxWidth: "100px", maxHeight: "100px", marginLeft: "10px" }} />
            </div>
          </td>
          
          {/* <td style={{ padding: "10px", border: "1px solid #ddd" }}>{match.number_of_goals_team1}</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>{match.number_of_goals_team2}</td> */}
          <th style={{ padding: "10px", border: "1px solid #ddd" }}>{match.start}</th>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>
            <button style={{ padding: "5px 10px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer", borderRadius: "3px" }} onClick={()=>openModal(match)}>Record the result of a match</button>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
    {/* Modal code can go here */}

    <Modal show={show} onHide={()=>handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Match Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="team1Goals">
              <Form.Label column sm={4}>{currentMatch ? currentMatch.team1_name : ""}</Form.Label>
              <Col sm={8}>
                <Form.Control 
                  type="number" 
                  // min={0}
                  value={team1Goals} 
                  onChange={(e) => setTeam1Goals(parseInt(e.target.value))}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="team2Goals">
              <Form.Label column sm={4}>{currentMatch ? currentMatch.team2_name : ""}</Form.Label>
              <Col sm={8}>
                <Form.Control 
                  type="number" 
                  // min={0}
                  value={team2Goals} 
                  onChange={(e) => setTeam2Goals(parseInt(e.target.value))}
                />
              </Col>
            </Form.Group>
            <Form.Group controlId="isMatchSubmitted">
              <Form.Check 
                type="checkbox" 
                label="Match Submitted" 
                checked={isMatchSubmitted} 
                onChange={(e) => setIsMatchSubmitted(e.target.checked)} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
          Record the result of a match
          </Button>
          {clickedMatch && (
        <label style={{ color: successMatch ? 'green' : 'red', fontSize: '14px', marginTop: '5px' }}>
       {messageMatch}
       </label> 
       )}

        </Modal.Footer>
      </Modal>
  </div>
  

  );
}

export default Matches