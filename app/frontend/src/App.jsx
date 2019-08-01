import React from 'react';
import TrainingStats from './TrainingStats'
import HorizontalLinearStepper from './Navigation'
import './styles.css';


function App() {
  return (
    <div className="App">
      <header className="Amadeus">
        <div style={{ paddingTop: '40px' }} className='container'>
          <div className='center-horizontal'>
            <div className='row'>
              <HorizontalLinearStepper></HorizontalLinearStepper>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;