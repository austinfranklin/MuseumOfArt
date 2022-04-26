
// code for posting responses to Google Sheet with Fetch
let button = document.getElementById('submit');

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
        // clears text box after submitting something
        let input = document.getElementById('input');
        input.value = '';
    });
    setInterval(() => getResponses(), 2500);
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
let unique;
// array for divs
let resArray = [];

// start when window finishes loading
window.addEventListener("load", autoLoad());

// function that downloads csv
function getResponses() {
    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vRbATeczAPZBiWkuoTX7p-2IIg012MwAyHQx1Dno8fcqV3nZct8tYIf5I_VgNjILvfToO6rXyYlkADN/pub?output=csv",
    {   
        download: true,
        header: true,
        fastMode: true,
        skipEmptyLines: true,
        delimiter: "",
        //worker: true,
        complete: (results) => {
            responses = results;
            console.log(responses);
            createText();
        }
    });
}

function createText(parse = responses) {
    //console.log("data: ", parse.data);

    for (i in parse.data) {
        //console.log ("live? ", parse.data[i].Live)

        text = parse.data[i];

        if (allResponses.includes(text.Responses)) {

            if (text.Live === "FALSE") {
                //let remove = document.getElementById('div' + `${text.Responses}`);
                //remove.removeChild('div' + `${text.Responses}`);
                resArray[i].innerText = '';
            }

        } else {
            allResponses.push(text.Responses);
            // div for displaying text
            let textDiv = document.createElement('div');
            textDiv.classList.add("responses");
            textDiv.innerText = text.Responses;

            let display = document.getElementById("responses");
            display.appendChild(textDiv);
            resArray.push(textDiv);

            //textDiv.scrollIntoView({behavior:"smooth"});
        }
    }
}