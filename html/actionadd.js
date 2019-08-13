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

// Mitä tapahtuu
function addToDatabase() {
  console.log("Funktion sisällä");
  if (food_input.value == "") {
    console.log("Ruokaa ei lisätty");
    return;
  } else if (stuff_input.value == "") {
    console.log("Aineksia ei lisätty");
    return;
  } else {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", 'food', false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send("data="+JSON.stringify({"rnimi" : food_input.value, "animi" : stuff_input.value}));
    // xmlHttp.send(JSON.stringify({"rnimi" : food_input.value, "animi" : stuff_input.value}));
    };
};
