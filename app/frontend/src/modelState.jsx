import React from 'react';
import ReactDOM from 'react-dom';

var Http = new XMLHttpRequest();
const url = 'http://localhost:2000/';
var validNext = false;
var model_data = '';
const axios = require('axios')

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
var rows = [];
  json.forEach((item, i) => {
    rows.push(createData(item.name, item.type));
  });
  return rows;
}
export async function getModelData() {
  const req =  await axios.get(url + 'model-info');
  return req
}

export async function getModelDescription() {
  const req =  await axios.get(url + 'data-description');
  return req
}

export function generateModel() {
  
  Http.open("POST", url + 'generate-model-file');
  Http.setRequestHeader("Content-type", "application/json");
  Http.send('{"model_name":"herefile","target_name":"' + document.getElementById("targetName").value + '"}');

  Http.onreadystatechange = (e) => {
    if (Http.readyState === 4 && Http.status === 200) {
      validNext = true;
      getModelData();
      return true;
    }else if(Http.status === 404){
      alert('Target not found in dataset.');
    }
     else {
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