
const router = require('express').Router();
const userRoute = require('./users');
const movieRoute = require('./movies');
/*const auth = require('../middlewares/auth');*/

router.use('/users', auth, userRoute);
router.use('/movies', auth, movieRoute);

module.exports = router;