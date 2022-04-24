
// code for posting responses to Google Sheet
window.addEventListener("load", function() {
    const form = document.getElementById('text-input');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = new FormData(form);
        const action = e.target.action;
        fetch(action, {
            method: 'POST',
            body: data,
        });
    });
});

// clears text box after submitting something
let button = document.getElementById('submit');
button.addEventListener('click', (e) => {
    e.preventDefault();
    let input = document.getElementById('input');
    input.value = '';
});

// code for retreiving and displaying responses
// Spreadsheet for testing
// https://docs.google.com/spreadsheets/d/1dMEF1bC9AuGRLN34wEfA6pBxsRev8cBJyUI-_5ZiDf4/pub?output=csv
// https://docs.google.com/spreadsheets/d/1dMEF1bC9AuGRLN34wEfA6pBxsRev8cBJyUI-_5ZiDf4

// used to create divs for new responses
let responses;
let parse;
// used to store individual texts and debug
let text;
// used to store all responses and prevent duplicates
let allResponses = [];
let animate = [];

setInterval(Papa.parse(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbATeczAPZBiWkuoTX7p-2IIg012MwAyHQx1Dno8fcqV3nZct8tYIf5I_VgNjILvfToO6rXyYlkADN/pub?output=csv",
    {
        download: true,
        header: true,
        fastMode: true,
        //skipEmptyLines: true,
        //worker: true,
        complete: (results) => {
            console.log(results);
            responses = results;
        }
    }
), 50); // refreshes every 500 ms

setInterval(function createText(parse = responses) {
    
    console.log("Data: ", parse.data);

    for (i in parse.data) {
        /*console.log ("live? ", responses.data[i].Live)
        if (responses.data[i].Live === "TRUE") {
            let colDiv = document.createElement("div");
            colDiv.classList.add("col");
        }; */

        let text = parse.data[i];
        //console.log(text);
        allResponses.push(text.Responses);

        if (checkIfDuplicateExists(allResponses) == false) {
            let textDiv = document.createElement("div");
            textDiv.classList.add("responses");
            textDiv.innerText = text.Responses;

            let display = document.getElementById("responses");
            display.appendChild(textDiv);
        } else if (responses == false) {
            allResponses = [];
        } else {
            allResponses.splice(i, 1);
        }
    };
}, 500); // Adds new text every 500 ms

function checkIfDuplicateExists(arr) {
    return new Set(arr).size !== arr.length;
}

let textPos;
let speed;