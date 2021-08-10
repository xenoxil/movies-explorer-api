const Movies = require('../models/movie');
const Users = require('../models/user');
const ResourceUnavailableError = require('../errors/ResourceUnavailableError');
const BadRequestError = require('../errors/BadRequestError');
const PermissionError = require('../errors/PermissionError');

//  получаем список всех фильмов сохранённых пользователем
module.exports.getMyMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

// сохраняем фильм пользователя
module.exports.saveMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Users.findById(req.user._id)
    .then((user) => {
      Movies.create({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
        owner: user,
      })
        .then((movie) => {
          res.send(movie);
        })
        .catch((err) => {
          if (err._message === 'movie validation failed') {
            next(new BadRequestError('Данные фильма не валидны'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err._message === 'movie validation failed') {
        next(new BadRequestError('Данные фильма не валидны'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movies.findById(req.params.movieId)
    .orFail(() => {
      next(new ResourceUnavailableError('Фильм не найден'));
    })
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) {
        Movies.findByIdAndRemove(req.params.movieId)
          .then((deletedMovie) => res.send({ data: deletedMovie }));
      } else {
        next(new PermissionError('Нельзя удалить чужой фильм'));
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Не корректный id фильма'));
      } else {
        next(err);
      }
    });
};
