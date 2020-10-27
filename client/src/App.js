import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateMovie from "./Movies/UpdateMovie";
import Movie from "./Movies/Movie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieToUpdate, setMovieToUpdate] = useState({});

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => <Movie {...props} addToSavedList={addToSavedList} />}
      />
      <Route
        path="/update-movie/:id"
        render={props => (
          <UpdateMovie
            {...props}
            movieToUpdate={movieToUpdate}
            setMovieToUpdate={setMovieToUpdate}
            list={savedList}
          />
        )}
      />
    </div>
  );
};

export default App;
