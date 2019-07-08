// TODO: Ruoka-aineilla haku ruokiin ja siihen database


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

// Vaihtaa etsityn ruoka-aineksen paikkaan aines
function changeOutput() {
  var input = material_input.value;
  var aines_div = document.getElementById("aines");
  aines_div.textContent = input;
};

var add_button = document.getElementById("add-button");
var food_input = document.getElementById("food");
var stuff_input = document.getElementById("stuff");

// Triggeri napista tai jomman kumman inputin enteristä
add_button.addEventListener("click", addToDatabase);
stuff_input.addEventListener("keyup", function(event) {
  if(event.keyCode === 13) {
    event.preventDefault();
    addToDatabase();
  }
});
food_input.addEventListener("keyup", function(event) {
  if(event.keyCode === 13) {
    event.preventDefault();
    addToDatabase();
  }
});

// Mitä silloin tapahtuu
function addToDatabase() {


};
