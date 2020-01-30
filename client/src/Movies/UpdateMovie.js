import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateMovie = props => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  console.log("Props", props);

  useEffect(() => {
    const movieUpdate = props.movies.find(mov => `${mov.id}` === id);
    if (movieUpdate) {
      setMovie(movieUpdate);
    }
  }, [props.movies, id]);

  const changeHandler = event => {
    event.persist();
    let value = event.target.value;
    if (event.target.name === "metascore") {
      value = parseInt(value, 10);
    }
    setMovie({
      ...movie,
      [event.target.name]: value
    });
  };
  // axios
  //   .get(`http://localhost:5000/api/movies/`)
  //   .then(
  //     res => {
  //         setMovie(res)
  //     // props.history.push(`/movies/${id}`)
  //     }

  //   )
  //   .catch(err => console.log(err));

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">Id: </label>
        <input
          type="number"
          name="id"
          value={movie.id}
          onChange={changeHandler}
        />
        <div className="baseline" />
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={changeHandler}
        />
        <div className="baseline" />
        <label htmlFor="director">Director: </label>
        <input
          type="text"
          name="director"
          value={movie.director}
          onChange={changeHandler}
        />
        <div className="baseline" />
        <label htmlFor="metascore">Metascore: </label>
        <input
          type="number"
          name="metascore"
          value={movie.metascore}
          onChange={changeHandler}
        />
        {/* <div className="baseline" />
        <label htmlFor="stars">Stars: </label>

        <input
          type="text"
          name="stars"
          value={movie.stars}
          onChange={changeHandler}
        /> */}
        <div className="baseline" />
        <button>Update </button>
      </form>
    </div>
  );
};
export default UpdateMovie;
