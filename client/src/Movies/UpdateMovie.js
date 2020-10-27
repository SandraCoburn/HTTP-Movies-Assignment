import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateMovie = ({ movieToUpdate, setMovieToUpdate, ...props }) => {
  const { id } = useParams();

  console.log("Props", movieToUpdate);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovieToUpdate(res.data))
      .catch(err => console.log(err.response));
  }, []);

  const changeHandler = event => {
    event.persist();
    let value = event.target.value;
    console.log("value", value);

    if (event.target.name === "metascore") {
      value = parseInt(value, 10);
    }
    if (event.target.name === "stars") {
      value = value.split(",");
    }
    setMovieToUpdate({
      ...movieToUpdate,
      [event.target.name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movieToUpdate)
      .then(res => {
        props.history.push(`/movies/${id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="id">Id: </label>
        <input
          type="number"
          name="id"
          value={movieToUpdate.id}
          onChange={changeHandler}
        />
        <div className="baseline" />
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          value={movieToUpdate.title}
          onChange={changeHandler}
        />
        <div className="baseline" />
        <label htmlFor="director">Director: </label>
        <input
          type="text"
          name="director"
          value={movieToUpdate.director}
          onChange={changeHandler}
        />
        <div className="baseline" />
        <label htmlFor="metascore">Metascore: </label>
        <input
          type="number"
          name="metascore"
          value={movieToUpdate.metascore}
          onChange={changeHandler}
        />
        <div className="baseline" />
        <label htmlFor="stars">Actors: </label>

        <input
          type="text"
          name="stars"
          value={movieToUpdate.stars}
          onChange={changeHandler}
        />
        <div className="baseline" />
        <button>Update </button>
      </form>
    </div>
  );
};
export default UpdateMovie;
