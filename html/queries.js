const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'postgres',
  port: '5432'
});


// Get request for all the food in the systems
const getFoods = (request, response) => {
  pool.query("select ruuat.rnimi, ainekset.animi \
    from ruuat \
    left outer join ruuat_ainekset on ruuat.rnimi = ruuat_ainekset.rnimi \
    left outer join ainekset on ruuat_ainekset.animi = ainekset.animi;", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result.rows);
    response.status(200).json(result.rows);
  });

}

// Get foods which have given stuff
const getFoodByStuff = (request, response) => {
  var stuff = (request.params.stuff);
  stuff = stuff.replace(":", "");
  stuff = stuff.toLowerCase();
  console.log(stuff);

  pool.query("select distinct rnimi from ruuat_ainekset \
    where animi = $1", [stuff], (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result.rows);
      response.status(200).json(result.rows);
    });
};

// Add food into the database
const addFood = (request, response) => {

  const json_data = request.body['data'];
  console.log(json_data);

  var data = JSON.parse(json_data);

  var food = data['rnimi'];
  var stuff = data['animi'];

  food = capitalizeFirstLetter(food);

  var stuff_vetor = stuff.split(", ");

  pool.query("INSERT INTO ruuat VALUES($1) ON CONFLICT (rnimi) DO NOTHING", [food], (err, result) => {
    if (err) {
      console.log(err);
    }

    recursiveForInsert(stuff_vetor, food);

  })

  response.status(201).send("Ruoka/Aines/Yhteys lisätty kantaan")
};

module.exports = {
  getFoods,
  getFoodByStuff,
  addFood
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function recursiveForInsert(vectorNeeded, food) {

  if (vectorNeeded.length === 0 ) {
    return;
  }
  else {

    stuffs = capitalizeFirstLetter(vectorNeeded[0]);

    pool.query("INSERT INTO ainekset VALUES($1) ON CONFLICT (animi) DO NOTHING", [stuffs], (err, result) => {
      if (err) {
        console.log(err);
      };

      pool.query("INSERT INTO ruuat_ainekset VALUES($1, $2) ON CONFLICT ON CONSTRAINT ruuat_ainekset_pkey DO NOTHING", [food, stuffs], (err, result) => {
        if (err) {
          console.log(err);
        }

          // Delete the first item of array
          vectorNeeded.shift();
          recursiveForInsert(vectorNeeded, food);

        });
    });
  }
}
