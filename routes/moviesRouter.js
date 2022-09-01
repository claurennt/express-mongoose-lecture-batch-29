var express = require("express");
var router = express.Router();

const {
  create_new_movie,
  retrieve_all_movies,
  retrieve_movie_by_id,
  update_one_field_of_movie,
  delete_movie_by_condition,
} = require("../controllers/movies_controllers");
/* GET users listing. */
router
  .route("/")
  .post(create_new_movie)
  .get(retrieve_all_movies)
  .delete(delete_movie_by_condition);

router.route("/:id").get(retrieve_movie_by_id).patch(update_one_field_of_movie);
module.exports = router;
