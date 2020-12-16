const db  = require('../models/index');

const userController = {

  postUser (req, res, next) {
    console.log(req.body)
    const params = [req.body.FirstName, req.body.LastName, req.body.Email, req.body.Username, req.body.Password, req.body.Location];
    const queryString =  `INSERT INTO Users (FirstName, LastName, Email, Username, Password, Location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
    // const cb = (err, result) => {
    //   if (err) {
    //     console.log(err)
    //     console.log('error in postUser')
    //     return next(err)
    //   }
    //   else return next()
    // }
    console.log('before then: ' + params);
    db.query(queryString, params)
      .then((data) => {
        console.log('here first then')
        console.log('DATA: ' + data)
        res.locals.users = data.rows;
        return next()
      })
      .catch((err)=> {
        console.log('error in postuser')
        return next(err)
      })
  },
}

module.exports = userController;