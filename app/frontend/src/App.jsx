import React from 'react';
import TrainingStats from './TrainingStats'
import HorizontalLinearStepper from './Navigation'
import SimpleTable from './DataDescriptionTable'
import './styles.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
          <header className="Amadeus">
            <div>
            <div style={{ paddingTop: '40px' }} className='container'>
              <div>
                <div style = {{align: 'center' }}>
                  <HorizontalLinearStepper></HorizontalLinearStepper>
                </div>
              </div>
            </div>
            </div>
          </header>
        </div>

    )
  }
}