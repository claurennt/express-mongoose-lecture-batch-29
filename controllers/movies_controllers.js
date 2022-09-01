const Movie = require("../models/Movie");

const create_new_movie = async (req, res, next) => {
  const { title, director, year } = req.body;
  if (!title || !director || !year)
    return res
      .status(400)
      .send("Please provide values for title, director and year");
  try {
    const newMovie = await Movie.create({ title, director, year }); //{title:title,director:director, year:year}

    return res.status(201).send(newMovie);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const retrieve_all_movies = async (req, res, next) => {
  const condition = req.query;
  try {
    const allMovies = await Movie.find(condition);
    if (!allMovies.length)
      return res
        .status(400)
        .send(
          "The collection you are trying to query does not contain any documents"
        );

    return res.status(200).send(allMovies);
  } catch (err) {
    console.log(err);

    next(err);
  }
};

const retrieve_movie_by_id = async (req, res, next) => {
  const { id } = req.params;
  try {
    //findOne({_id:id})
    const foundMovie = await Movie.findById(id);

    if (!foundMovie)
      return res.status(404).send(`The movie with _id ${id} does not exist`);

    return res.status(200).send(foundMovie);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const update_one_field_of_movie = async (req, res, next) => {
  const { id } = req.params;
  const [key, value] = Object.entries(req.body)[0];

  if (!key || !value)
    return res
      .status(400)
      .send("Please provide a condition for your update operation");
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { [key]: value },
      { new: true }
    );

    if (!updatedMovie)
      return res
        .status(404)
        .send(`The movie you are trying to update does not exist`);

    return res.status(200).send(updatedMovie);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const delete_movie_by_condition = async (req, res, next) => {
  const condition = req.body;

  //in oder to check for thruthiness of an object we need to convert it to an array
  if (!Object.keys(condition))
    return res
      .status(400)
      .send("Please provide a condition for the delete operation");

  try {
    const deletedMovie = await Movie.findOneAndDelete(condition);

    return res.status(200).send(deletedMovie);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports = {
  create_new_movie,
  retrieve_all_movies,
  retrieve_movie_by_id,
  update_one_field_of_movie,
  delete_movie_by_condition,
};
