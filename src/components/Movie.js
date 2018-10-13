import React from 'react';
import $ from 'jquery';
import notFoundImg from '../img/no_img.jpg';

import EditDeleteModal from './EditDeleteModal.js';
import { Image } from 'react-bootstrap';

class Movie extends React.Component {
    constructor(props){
        super(props);
        this.state= {movie: this.props.movie}
    }

    componentWillMount(){
        if(this.props.movie.imdbID !== undefined){
            const movieUrl = "https://www.omdbapi.com/?i=" + this.props.movie.imdbID + "&apikey=a161ec7d";
            var updatedMovie = this.state.movie;
            $.ajax({
                url:movieUrl,
                success:(movieResult) => {
                    
                    updatedMovie.Runtime = movieResult.Runtime
                    updatedMovie.Genre = movieResult.Genre
                    updatedMovie.Director = movieResult.Director
                },
                error: (xhr, status, err) => {
                    console.error("Failed to fetch data")
                },
                complete: function(){
                    this.setState({movie:updatedMovie})
                }.bind(this)
            })
        }        
    }

    render() {
     
        const removeSpecialChars = (text) => text.replace(/[^a-zA-Z0-9 ]/g, "");

        const capitalize = (text) => {
            return text.replace(/\w\S*/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }

        const titlePipe = (op1,op2) => {
            return (arg) => {
                const res1 = op1(arg);
                return op2(res1);
            }
        }

        const fixTitle = titlePipe(removeSpecialChars,capitalize);
        const movie = this.state.movie;
        const movieTitle = fixTitle(movie.Title);

        
        
        return <div key={movie.id} className="p-2 d-flex movie-item">
        <div className="movie-title">
          <Image src={this.getPoster()} alt="Poster" width="80%" thumbnail />
          <p>{movieTitle}</p>
        </div>
        <div className="movie-details">
          <p><b>Year: </b>{movie.Year}</p>
          <p><b>Runtime: </b>{movie.Runtime}</p>
          <p><b>Genre: </b>{movie.Genre}</p>
          <p><b>Director: </b>{movie.Director}</p>
          <div className="movie-btn text-center">
            <EditDeleteModal
            movie={movie}
            delete={this.props.delete}
            edit={this.props.edit}
            search={this.props.search} />
          </div>
        </div>
      </div>   
    }
    
    getPoster() {
        if(this.state.movie.Poster===""){
            return notFoundImg;
        } else {
            return this.state.movie.Poster;
        }
    }
    
};

export default Movie;