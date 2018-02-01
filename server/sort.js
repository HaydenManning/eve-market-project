const marketData = require("./../jitaTypes.json"); // top 1000 types in jita (no names)
const itemNames = require("./../itemNames.json"); // all types in game
const matches = [];
const namesID = [];
const newItemNames = [];

// sort low to high
function sortNumber(a, b) {
  return a - b;
}

function findMatches(arr, arrObj) {}

// function findMatches(arr, names) {
//   for (let i = 0; i < arr.length; i++) {
//     marketID.push(arr[i].type_id);
//   }
//   for (let i = 0; i < names.length; i++) {
//     namesID.push(names[i].TYPEID);
//   }
//   marketID.sort(sortNumber);
//   namesID.sort(sortNumber);
//   for (let i = namesID.length - 1; i >= 0; i--) {
//     let count = 0;
//     for (let x = marketID.length - 1; x >= 0; x--) {
//       if (namesID[i] === marketID[x]) {
//         console.log(namesID[i]);
//         marketID.splice(x, 1);
//         break;
//       } else {
//         count++;
//       }
//       if (count === marketID.length) {
//         console.log("splicing");
//         namesID.splice(i, 1);
//       }
//     }
//   }
//   console.log(`MARKET LENGTH: ${marketID.length}`);
//   console.log(`NAMES LENGTH: ${namesID.length} DATA: ${namesID}`);
//   return namesID;
// }

// findMatches(marketData, itemNames);

// function toNewArr(arr, json, newArr) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let x = 0; x < json.length; x++) {
//       if (arr[i] === json[x].TYPEID) {
//         newArr.push(json[i]);
//       }
//     }
//   }
//   console.log(newArr[newArr.length - 1]);
// }

// toNewArr(namesID, itemNames, newItemNames);
