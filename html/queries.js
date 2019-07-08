const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'postgres',
  port: '5432'
});

const getFoods = (request, response) => {
  pool.query("SELECT* FROM ruuat ORDER BY rnimi ASC", (err, result) => {
    if (err) {
      console.log(err);;
    }
    console.log(result.rows);
    response.status(200).json(result.rows);
  });

}

const addFood = (request, response) => {
  // const { food } = request.body
  console.log(request.body);
  //
  // pool.query("INSERT INTO ruuat VALUES($1)", [food], (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
     response.status(201).send("Ruoka lisätty kantaan")
  // })
};

module.exports = {
  getFoods,
  addFood
}
