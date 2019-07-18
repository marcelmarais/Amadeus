import React from 'react';
import './styles.css';


function ModelData() {
  var Http = new XMLHttpRequest();
  const url = 'http://localhost:2000/';

  var model_data = '';

  function json2table(json, classes) {
    var cols = Object.keys(json[0]);

    var headerRow = '';
    var bodyRows = '';

    classes = classes || '';

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    cols.map(function (col) {
      headerRow += '<th>' + capitalizeFirstLetter(col) + '</th>';
    });

    json.map(function (row) {
      bodyRows += '<tr>';

      cols.map(function (colName) {
        bodyRows += '<td>' + row[colName] + '</td>';
      })

      bodyRows += '</tr>';
    });

    return '<table class="' +
      classes +
      '"><thead><tr>' +
      headerRow +
      '</tr></thead><tbody>' +
      bodyRows +
      '</tbody></table>';
  }


  function generateModel() {
    Http.open("POST", url + 'generate-model-file');
    Http.setRequestHeader("Content-type", "application/json");
    Http.send('{"name":"herefile"}');
    getModelData();
  }

  function getModelData() {
    Http = new XMLHttpRequest();

    Http.open("GET", url + 'model_info')
    Http.send();

    Http.onreadystatechange = (e) => {
      if (Http.readyState === 4 && Http.status === 200) {
        try {
          
          var model = JSON.parse(Http.responseText)
          console.log(model)
          document.getElementById('modelData').innerHTML = "<h3> Input Features </h3>" + json2table(model['input_features']);
          document.getElementById('genModel').style.display='none';
        } catch (err) {
          console.log(err);
        }
      }

    }

  }


  return (
    <div className='container'>
      <button id = 'genModel' onClick={generateModel} >Load Model</button>
      <br></br>
      <p id='modelData'></p>
    </div>
  );
}

export default ModelData;

