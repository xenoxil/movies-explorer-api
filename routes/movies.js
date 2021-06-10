const router = require('express').Router();
const { deleteMovie, saveMovie, getMyMovies } = require('../controllers/movies');
const { movieIdValidation, movieValidation } = require('../middlewares/validation');

router.get('/movies', getMyMovies);
router.post('/movies', movieValidation, saveMovie);
router.delete('/movies/:movieId', movieIdValidation, deleteMovie);

module.exports = router;
