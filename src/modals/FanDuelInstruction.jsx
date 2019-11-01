import React, { useState } from 'react';
import '../App.css';
import {Form,Button,ButtonGroup,Table} from 'react-bootstrap'

function FanDuelInstruction(props) {
  const [uploadedFile, setUploadedFile] = useState([]);

  const uploadFileButton = (evt) => {
    setUploadedFile(evt.target.files[0]);
    setIsValid(false);
  }

  const selectQB = (players,total, salaryColumn) => {
    return [players[0],(total - players[0][salaryColumn])]
  }
    return (
        <div>
        Test

        </div>
    );
  }
  
  export default FanDuelInstruction;