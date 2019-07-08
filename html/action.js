var food_button = document.getElementById("search-button");
var material_input = document.getElementById("material-input");

food_button.addEventListener("click", changeOutput);
// Enterillä sama kuin napin klikkauksella
material_input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    changeOutput();
  };
});

function httpGet(theUrl)
{

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function writeResults(result) {
    console.log(result);
    var aines_div = document.getElementById("aines");
    aines_div.textContent = input;

}

// Vaihtaa etsityn ruoka-aineksen paikkaan aines
function changeOutput() {
  var input = material_input.value;

  httpGetAsync("food", writeResults);

};
