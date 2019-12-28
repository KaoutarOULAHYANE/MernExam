const router = require('express').Router();
/* let : to declare a local variable */
let User = require('../models/user.model');

/* the first endpoint that handles incoming HTTP GET requests */
// router.route('/').get((req, res) => {
  /* Mongoose method to get a list of all users from Compass database */
  /* respone in a JSON format */
  // User.find()
    // .then(users => res.json(users))
    // .catch(err => res.status(400).json('Error: ' + err));
// });

/* get user by ID */
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});


/* get the users by page and limir also query by username and the possibillity of sorting*/
router.route('/:page/:size').get((req, res) => {


  const str = req.query.search || ''
  const gendre = req.query.gender == null ? 1 : req.query.gender
  const dob = req.query.dob || 1

  const page = req.params.page;
  const size = req.param.size || 10
  User.paginate({ "username" : { $regex: str , $options: 'i' } },{ page: page, limit: size ,sort: { dob: dob , gendre: gendre}})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

/* display all users */
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

/* display all users */
/* router.route('/').post((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
}); */

/* create new user */
router.route('/add').post((req, res) => {
  // the body of HTTP request contains th JSON parametr
  const username = req.body.username;
  const gender = req.body.gender;
  const dob = Date.parse(req.body.dob);
  const news = req.body.news;
  const email = req.body.email;
  const photo = req.body.photo;

  const newUser = new User({username,gender,dob,news,email,photo});

  // save the new user to the database
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

/* update user */
router.route('/:id').put((req, res) => {

  User.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      user.gender = req.body.gender;
      user.dob = Date.parse(req.body.dob);
      user.news = req.body.news;
      user.email = req.body.email;
      user.photo = req.body.photo;

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

/* to delete a user */
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;