import React from 'react';
import TrainingStats from './TrainingStats'
import ModelData from './ModelData'
import './styles.css';

function App() {
  return (
    <div className="App">
      <header className="Amadeus">
        <div style = {{paddingTop:'40px'}} className = 'container'>
            <div className = 'center-horizontal'>
          <div className = 'row'>
          <h1>Welcome to Amadeus</h1>
          <ModelData ></ModelData>

            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;