import React from 'react';
import $ from 'jquery';

import AddMovieModal from './AddMovieModal.js';
import Movie from './Movie.js';

class Movies extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            moviesNextId: 0
        };
        
    }

    componentWillMount() {
        const url = "https://www.omdbapi.com/?type=movie&r=json&s=Fast&apikey=a161ec7d";
        let Items = []
        let movieItems = []
        const generateMovieId = (array) => {
            if(array.length>=1){
                return Math.max(...array.map(function(o){return o.id;})) + 1;
            } else{
                return 1;
            }
        }
        $.ajax({
            url:url,
            success:function (searchResults) {
                if(searchResults.Response === "True"){
                    Items = searchResults.Search
                    Items.forEach(function(movie){
                        movie.id = generateMovieId(movieItems)
                        movieItems.push(movie)
                    })
                }
                else{
                    console.error("Failed to fetch data");
                }                
            },
            error:(xhr, status, err) => {
                console.error("Failed to fetch data");
            },
            complete: function (data){
                this.setState({ movies: movieItems , moviesNextId:generateMovieId(movieItems)})
            }.bind(this)
        })
    }
    
    render() {
        
        const moviesArray = this.state.movies.map(movie => (
            <Movie
            key={movie.id}
            movie={movie}
            delete={this.deleteMovie.bind(this)}
            edit={this.editMovie.bind(this)}
            search={this.checkIfTitleExists.bind(this)}/>
        ));
        return (<div>
            <AddMovieModal
            add={this.addNewMovie.bind(this)}
            search={this.checkIfTitleExists.bind(this)}
            />
            <div className="d-flex justify-content-center">
                <div className="d-flex justify-content-around flex-wrap">
                    { moviesArray }
                </div>
            </div>
            </div>
        );
        
    }  

    deleteMovie(movie){
        const newMovieList = this.state.movies.filter(i => i.id !== movie.id)
        this.setState({movies:newMovieList})
    }

    editMovie(id,title,year,runtime,genre,director){
        let movieList = [...this.state.movies];
        let index = movieList.findIndex(i => i.id === id);
        
        movieList[index].Title = title;
        movieList[index].Year = year;
        movieList[index].Runtime = runtime;
        movieList[index].Genre = genre;
        movieList[index].Director = director;

        this.setState({movies:movieList});
    }

    checkIfTitleExists(id,Title){
        let search = this.state.movies.filter(i => i.id !== id && i.Title === Title);

        if(search.length > 0) {
            return true;
        }else{
            return false;
        }
    }

    addNewMovie(title,year,runtime,genre,director,poster) {
        const newMovieId = this.state.moviesNextId;
        const newMovie = {
            Title: title,
            Year: year,
            Runtime: runtime,
            Genre: genre,
            Director: director,
            Poster: poster,
            id: newMovieId
        }
        const newMoviesList = [...this.state.movies]
        newMoviesList.push(newMovie)

        this.setState({movies:newMoviesList, moviesNextId:this.state.moviesNextId+1})
    }

};

export default Movies;