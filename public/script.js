
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
        })
    });
});

// code for retreiving and displaying responses
// Spreadsheet for testing
// https://docs.google.com/spreadsheets/d/1dMEF1bC9AuGRLN34wEfA6pBxsRev8cBJyUI-_5ZiDf4/pub?output=csv
// https://docs.google.com/spreadsheets/d/1dMEF1bC9AuGRLN34wEfA6pBxsRev8cBJyUI-_5ZiDf4

// used to create divs for new responses
let responses;
// used to store all responses and prevent duplicates
let allResponses = [];

Papa.parse(
    "https://docs.google.com/spreadsheets/d/1dMEF1bC9AuGRLN34wEfA6pBxsRev8cBJyUI-_5ZiDf4/pub?output=csv",
    {
        download: true,
        header: true,
        complete: (results) => {
            console.log(results);
            responses = results;
            allResponses.push(results);
            createText();
        }
    }
);

let responsesDiv = document.getElementById("responses");

function createText(responses) {
    console.log("Data", responses.data);
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("text");
    responsesDiv.appendChild(rowDiv);
};