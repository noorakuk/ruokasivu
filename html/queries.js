const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'postgres',
  port: '5432'
});

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

const addFood = (request, response) => {

  const food = request.body['rnimi'];
  console.log(food);

  pool.query("INSERT INTO ruuat VALUES($1)", [food], (err, result) => {
    if (err) {
      console.log(err);
    }
     response.status(201).send("Ruoka lisätty kantaan")
  })
};

module.exports = {
  getFoods,
  getFoodByStuff,
  addFood
}
