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

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        callback(xmlHttp.responseText);
    };
  };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function writeResults(result) {

    var result = result.substring(1, result.length-1);
    var res_array = result.split(",");
    console.log(res_array);
    console.log(res_array.length);
    // Kirjoittaa ruoka-aineen sijalle inputin
    var input = material_input.value;
    input = capitalizeFirstLetter(input);
    var aines_div = document.getElementById("aines");
    var ruoka_div = document.getElementById("ehdotukset");
    aines_div.textContent = input;
    var wanted = [];
    for (i = 0; i < res_array.length; i++) {
      console.log(res_array[i]);
      var resObj = JSON.parse(res_array[i])
      console.log(resObj["rnimi"])
      wanted.push(resObj["rnimi"])

    }
    console.log(wanted);
    var item = wanted[Math.floor(Math.random()*wanted.length)];
    ruoka_div.textContent = item;

}

// Vaihtaa etsityn ruoka-aineksen paikkaan aines
function changeOutput() {

  var url = "food/:" + material_input.value;
  url = url.toLowerCase();
  console.log(url);
  httpGetAsync(url, writeResults);

};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
