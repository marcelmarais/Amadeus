import React from 'react';
import ReactDOM from 'react-dom';

var Http = new XMLHttpRequest();
const url = 'http://localhost:2000/';
var validNext = false;
var model_data = '';


function createData(name, type) {
  return { name, type };
}

const columns = [
  {
    name: "name",
    label: "Name"
  },
  {
    name: "type",
    label: "Type"
  },
];


var rows = [];
function createTable(json) {

  json.forEach((item, i) => {
    rows.push(createData(item.name, item.type));
  });

}
export function getModelData() {
  Http = new XMLHttpRequest();

  Http.open("GET", url + 'model-info')
  Http.send();

  Http.onreadystatechange = (e) => {
    if (Http.readyState === 4 && Http.status === 200) {
      try {
        var model = JSON.parse(Http.responseText)
        return createTable(model['input_features']);

      } catch (err) {
        console.log(err);
      }

    }
  }
}

export function generateModel() {
  
  Http.open("POST", url + 'generate-model-file');
  Http.setRequestHeader("Content-type", "application/json");
  console.log(document.getElementById("targetName").value);
  Http.send('{"model_name":"herefile","target_name":"' + document.getElementById("targetName").value + '"}');

  Http.onreadystatechange = (e) => {
    if (Http.readyState === 4 && Http.status === 200) {
      validNext = true;
      getModelData();
      return true;
    } else {
      validNext = false;
      console.log(Http.status)
      return false;
    }
  }
}

export function canNext(){
  return validNext;
}


export function trainModel(){
  Http = new XMLHttpRequest();

  Http.open("GET", url + 'train-model')
  Http.send();
}