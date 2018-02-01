// THIS HAS NOTHING TO DO WITH HOW THE SERVER OPERATES THIS FILE IS JUST MEANT TO PRODUCE jitaItemInfo.json WHICH IT HAS I AM KEEPING THIS HERE FOR REFERENCE

const jitaData = require("./../jitaIdData.json"); // top 5000 types in jita (no names) pages 1-5
const itemNames = require("./../itemNames.json"); // all types in game
const matches = []; // will hold the matches found in findMatches
const pureJitaData = []; // will hold a duplicate removed array of jitaData

// checks for duplicates in a json data file and removes duplicates
function removeDupes(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (pureJitaData.indexOf(arr[i]) == -1) {
      pureJitaData.push(arr[i]);
    }
  }
  console.log(pureJitaData);
  console.log(pureJitaData.length);
  return pureJitaData;
}

removeDupes(jitaData);

// finds matching type ids and pushes matches to a new array
//   arr = jitaData [id, id, id, id, id]
//   arrObj = itemNames -- [{id, itemname}, {id, itemname}, {id, itemname}]
function findMatches(arr, arrObj) {
  for (let i = 0; i < arr.length; i++) {
    for (let x = 0; x < arrObj.length; x++) {
      if (arr[i] === arrObj[x].TYPEID) {
        console.log(`Match found ${arrObj[x].TYPEID}`);
        matches.push(arrObj[x]);
      }
    }
  }
  console.log(matches);
  return matches;
}

findMatches(pureJitaData, itemNames);
