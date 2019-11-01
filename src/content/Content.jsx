import React, { useState } from 'react';
import '../App.css';
import Papa from 'papaparse'
import {Form,Button,ButtonGroup,Table} from 'react-bootstrap'

function Content(props) {
  const [uploadedFile, setUploadedFile] = useState([]);
  const [finalPlayers, setFinalPlayers] = useState([]);
  const [suggestedPlayers, setSuggestedPlayers] = useState([]);
  const [totalFanDuelAmount, setTotalFanDuelAmount] = useState(60000);
  const [totalDraftKingAmount, setTotalDraftKingAmount] = useState(50000);
  const [isValid, setIsValid] = useState(true);
  const [isFanDuel, setIsFanDuel] = useState(false);
  const [isDraftKings, setIsDraftKings] = useState(false);

  const uploadFileButton = (evt) => {
    setUploadedFile(evt.target.files[0]);
    setIsValid(false);
  }

  const selectQB = (players,total, salaryColumn) => {
    return [players[0],(total - players[0][salaryColumn])]
  }

  const selectRB = (players,total,salaryColumn) => {
    return [players[0],players[1],(total - players[0][salaryColumn] - players[1][salaryColumn])]
  }

  const selectWR = (players,total,salaryColumn) => {
    return [players[0],players[1],players[2],(total - players[0][salaryColumn] - players[1][salaryColumn] - players[2][salaryColumn])]
  }

  const selectTE = (players,total,salaryColumn) => {
    return [players[0],(total - players[0][salaryColumn])]
  }

  const selectD = (players,total,salaryColumn) => {
    return [players[0],(total - players[0][salaryColumn])]
  }

  const selectFlex = (players,total,salaryColumn) => {
    return [players[0],(total - players[0][salaryColumn]),players.slice(1,11)]
  }

  const selectDraftKingsPlayers = (filteredPlayers, amount) => {
    var total = amount;
    var qb;
    var rb1;
    var rb2;
    var wr1;
    var wr2;
    var wr3;
    var te;
    var d;
    var flex;
    var suggestions;
    var selectedPlayers = [];
    var salaryColumn = 5;
    var positionColumn = 0;
    var idColumn = 3;
    
    [qb, total] = selectQB(filteredPlayers.filter(x=> x[positionColumn] === "QB"),total,salaryColumn );
    selectedPlayers.push(qb);
    [rb1, rb2, total] = selectRB(filteredPlayers.filter(x=> x[positionColumn] === "RB"),total,salaryColumn );
    selectedPlayers.push(rb1);
    selectedPlayers.push(rb2);
    [wr1, wr2, wr3,total] = selectWR(filteredPlayers.filter(x=> x[positionColumn] === "WR"),total,salaryColumn );
    selectedPlayers.push(wr1);
    selectedPlayers.push(wr2);
    selectedPlayers.push(wr3);
    [te,total] = selectTE(filteredPlayers.filter(x=> x[positionColumn] === "TE"),total, salaryColumn );
    selectedPlayers.push(te);
    [d,total] = selectD(filteredPlayers.filter(x=> x[positionColumn] === "DST"),total,salaryColumn );
    selectedPlayers.push(d);
    [flex,total, suggestions] = selectFlex(filteredPlayers.filter(x=> (x[positionColumn] === "RB" || x[positionColumn] === "WR") && x[salaryColumn]<= total && !selectedPlayers.includes(x[idColumn])),total,salaryColumn );
    selectedPlayers.push(flex);

    setTotalDraftKingAmount(total)
    setFinalPlayers(selectedPlayers);
    return suggestions;
  }

  const selectFanDuelPlayers = (filteredPlayers, amount) => {
    var total = amount;
    var qb;
    var rb1;
    var rb2;
    var wr1;
    var wr2;
    var wr3;
    var te;
    var d;
    var flex;
    var suggestions;
    var selectedPlayers = [];
    var salaryColumn = 7;
    var positionColumn = 1;
    var idColumn = 0;
    
    [qb, total] = selectQB(filteredPlayers.filter(x=> x[positionColumn] === "QB"),total,salaryColumn );
    selectedPlayers.push(qb);
    [rb1, rb2, total] = selectRB(filteredPlayers.filter(x=> x[positionColumn] === "RB"),total,salaryColumn );
    selectedPlayers.push(rb1);
    selectedPlayers.push(rb2);
    [wr1, wr2, wr3,total] = selectWR(filteredPlayers.filter(x=> x[positionColumn] === "WR"),total,salaryColumn );
    selectedPlayers.push(wr1);
    selectedPlayers.push(wr2);
    selectedPlayers.push(wr3);
    [te,total] = selectTE(filteredPlayers.filter(x=> x[positionColumn] === "TE"),total,salaryColumn );
    selectedPlayers.push(te);
    [d,total] = selectD(filteredPlayers.filter(x=> x[positionColumn] === "D"),total,salaryColumn );
    selectedPlayers.push(d);
    [flex,total, suggestions] = selectFlex(filteredPlayers.filter(x=> (x[positionColumn] === "RB" || x[positionColumn] === "WR") && x[salaryColumn]<= total && !selectedPlayers.includes(x[idColumn])),total,salaryColumn );
    selectedPlayers.push(flex);

    setTotalFanDuelAmount(total)
    setFinalPlayers(selectedPlayers);
    return suggestions;
  }

  const parseDraftKings = () => {
    var count = 0; // cache the running count
    var finalResults = []
    Papa.parse(uploadedFile, {
        worker: true,
        step: function(result) {
          var newRecord;
          console.log("LAST THING",result.data);
          var newColumn = parseFloat(parseFloat(result.data[15])/parseFloat(result.data[18])) > 0 ? 
          parseFloat(parseFloat(result.data[15])/parseFloat(result.data[18])) : 999999
          newRecord = result.data;
          newRecord.push(newColumn);
          finalResults.push(newRecord);
          count ++;
            // do stuff with result
    },
    complete: function() {
        let filtered = finalResults.map(dataRow => dataRow.splice(10,20));
        filtered.sort(function(a, b){return a[9]-b[9]});
        var suggested = selectDraftKingsPlayers(filtered,totalDraftKingAmount);
        setSuggestedPlayers(suggested);
        setIsValid(true);
        setIsDraftKings(true);
        setIsFanDuel(false);
        console.log("THIS IS IT",suggested);
        console.log('parsing complete read', count, 'records.'); 
    }
});
  };

  const parseFanDuel = () => {
    var count = 0; // cache the running count
    var finalResults = []
    Papa.parse(uploadedFile, {
        worker: true,
        step: function(result) {
          var newRecord;
          var newColumn = parseFloat(parseFloat(result.data[7])/parseFloat(result.data[5])) > 0 ? 
          parseFloat(parseFloat(result.data[7])/parseFloat(result.data[5])) : 999999
          newRecord = result.data;
          newRecord.push(newColumn);
          finalResults.push(newRecord);
          count ++;
            // do stuff with result
    },
    complete: function() {
        console.log("RESULTS", finalResults);
        let filtered = finalResults.filter(dataRow => dataRow[6] > 4 && dataRow[11] === "");
        filtered.sort(function(a, b){return a[16]-b[16]});
        var suggested = selectFanDuelPlayers(filtered,totalFanDuelAmount);
        setSuggestedPlayers(suggested);
        setIsValid(true);
        setIsDraftKings(false);
        setIsFanDuel(true);
        console.log('parsing complete read', count, 'records.'); 
    }
});
  };
    return (
        <div className="App-header">
          <Form>
            <Form.Group controlId="fileUpload">
            <Form.Control type="file" label='Upload' accept='.csv' 
            placeholder="Enter file"
            onChange={uploadFileButton}  />
            </Form.Group>
            <ButtonGroup aria-label="SiteSelector">
              <Button 
                variant="secondary"
                onClick={parseFanDuel}
                disabled={isValid}
              >
                Fanduel
              </Button>
              <Button 
                variant="secondary"
                onClick={parseDraftKings}
                disabled={isValid}
              >
                DraftKings
              </Button>
              
            </ButtonGroup>
            <Form.Text className="text-muted">
            {isFanDuel && (
              <p>Remaining Salary: {totalFanDuelAmount}</p> 
            )}
            {isDraftKings && (
              <p>Remaining Salary: {totalDraftKingAmount}</p>
            )}
            </Form.Text>
          </Form>
 <div>
   <p>Optimal Lineup</p>
  <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Position</th>
      <th>Name</th>
      <th>Team</th>
      <th>Salary</th>
    </tr>
  </thead>
  <tbody>
  {finalPlayers.map((item, key) =>
    <tr>
      {isFanDuel && (
      <React.Fragment>
      <td>{item[1]}</td>
      <td>{item[3]}</td>
      <td>{item[9]}</td>
      <td>{item[7]}</td>
      </React.Fragment>
      )}
      {isDraftKings && (
      <React.Fragment>
      <td>{item[0]}</td>
      <td>{item[2]}</td>
      <td>{item[7]}</td>
      <td>{item[5]}</td>
      </React.Fragment>
      )}
    </tr>
    )}
  </tbody>
</Table>
</div>
<div>
  <p>Replacement Players</p>
<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Position</th>
      <th>Name</th>
      <th>Team</th>
      <th>Salary</th>
    </tr>
  </thead>
  <tbody>
  {suggestedPlayers.map((item, key) =>
    <tr>
      {isFanDuel && (
      <React.Fragment>
      <td>{item[1]}</td>
      <td>
        <a 
          href={'https://www.google.com/search?q=' + item[3]}
          target="_blank"
          rel="noopener no referrer"
        >
          {item[3]}
        </a>
      </td>
      <td>{item[9]}</td>
      <td>{item[7]}</td>
      </React.Fragment>
      )}
      {isDraftKings && (
      <React.Fragment>
      <td>{item[0]}</td>
      <td>
        <a 
          href={'https://www.google.com/search?q=' + item[2]}
          target="_blank"
          rel="noopener no referrer"
        >
          {item[2]}
        </a>
      </td>
      <td>{item[7]}</td>
      <td>{item[5]}</td>
      </React.Fragment>
      )}
    </tr>
    )}
  </tbody>
</Table>
</div>

        </div>
    );
  }
  
  export default Content;