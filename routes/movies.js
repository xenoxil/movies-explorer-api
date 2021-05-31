
const router = require('express').Router();

const {deleteMovie,saveMovie,getMyMovies } = require('../controllers/movies');


router.get('/movies', getMyMovies);
router.post('/movies', movieValidation, saveMovie);
router.delete('/movies/:movieId', movieValidation, deleteMovie);


module.exports = router;