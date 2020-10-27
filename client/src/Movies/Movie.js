import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import UpdateMovie from "./UpdateMovie";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };
  handleUpdate = e => {
    e.preventDefault();
    this.props.history.push(`/update-movie/${this.state.movie.id}`);
    console.log("movie comp", this.state.movie);
  };
  handleDelete = () => {
    axios.delete(`http://localhost:5000/api/movies/${this.state.movie.id}`);
    this.props.history.push("/");
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="update-button">
          <button onClick={this.handleUpdate}>Update</button>
        </div>
        <div className="delete-button">
          <button onClick={this.handleDelete}>Delete</button>
        </div>
      </div>
    );
  }
}
