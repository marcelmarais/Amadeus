import React from 'react';
import './styles.css';


function ModelData() {
  const Http = new XMLHttpRequest();
  const url = 'http://localhost:2000/generate-model-file';

    
    function generateModel(){
      var data = ({'name':'file1'});
      Http.open("POST",url);
      Http.setRequestHeader("Content-type", "application/json");
      Http.send('{"name":"herefile"}')
        
      
    }
    return (
      <button type = 'submit' onClick = {generateModel} className = 'center-horizontal'>Load Model</button>
    );
}

export default ModelData;

