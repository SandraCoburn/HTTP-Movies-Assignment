import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateMovie from "./Movies/UpdateMovie";
import Movie from "./Movies/Movie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [addToUpdate, setAddToUpdate] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  const addMovieToUpdate = movie => {
    setAddToUpdate([...addToUpdate, movie]);
  };

  return (
    <div>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return (
            <Movie
              {...props}
              addToSavedList={addToSavedList}
              addMovieToUpdate={addMovieToUpdate}
            />
          );
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => (
          <UpdateMovie
            {...props}
            addToUpdate={addToUpdate}
            setAddToUpdate={setAddToUpdate}
            list={savedList}
          />
        )}
      />
    </div>
  );
};

export default App;
