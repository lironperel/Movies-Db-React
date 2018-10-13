import React from 'react';
import { FormControl, FormGroup, Button, HelpBlock, ControlLabel } from 'react-bootstrap';

class MovieEditForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: this.props.movie.Title,
            year: this.props.movie.Year,
            runtime: this.props.movie.Runtime,
            genre: this.props.movie.Genre,
            director: this.props.movie.Director,
            formErrors: {
                title: "",
                year: "",
                runtime: "",
                genre: "",
                director: ""
            }
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        if(this.formValid(this.state)) {

            let movie = this.props.movie;

            movie.Title = this.state.title;
            movie.Year = this.state.year;
            movie.Runtime = this.state.runtime;
            movie.Genre = this.state.genre;
            movie.Director = this.state.director;
            
            let editedMovie = this.props.movie;

            this.props.edit(editedMovie.id,editedMovie.Title,editedMovie.Year,editedMovie.Runtime,editedMovie.Genre,editedMovie.Director);
            
        } else {
            console.error("FORM INVALID!");
        }
    }

    handleChange = e => {
        e.preventDefault();

        const { name,value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name){
            case "title":
                formErrors.title = value.length === 0
                ? "Please enter movie title"
                : "";
                formErrors.title = this.props.search(this.props.movie.id,value)
                ? "Movie with same title already exists"
                : "";
            break;
            case "year": 
                formErrors.year = !isFinite(String(value)) ||
                                parseInt(value, 10) < 1800 ||
                                parseInt(value, 10) > 2099 ||
                                parseInt(value, 10) <= 0
                ? "Please enter valid year (after 1800 and before 2099)"
                : "";
            break;
            case "runtime":
                formErrors.runtime = value.length === 0
                ? "Please enter movie runtime"
                : "";
            break;
            case "genre":
                formErrors.genre = value.length === 0
                ? "Please enter movie genre"
                : "";
            break;
            case "director":
                formErrors.director = value.length === 0
                ? "Please enter movie director name"
                : "";
            break;
            default: break;
        }

        this.setState({formErrors, [name]: value})
    }

    formValid = ({formErrors, ...rest}) => {
        let valid = true;

        // check if no errors
        Object.values(formErrors).forEach(val => {
            val.length > 0 && (valid = false); 
        });

        // validate that all values are filled
        Object.values(rest).forEach(val =>{
            if(val==="" || val===null) {
                valid = false;
                this.setState({bottomError:"Please fill all fields"});
            }
        });

        if(valid===true){
            this.setState({bottomError:""})
        }

        return valid;
    }

    render(){
        const { formErrors } = this.state;
        return(
        <div>
            <h4>Editing: {this.props.movie.Title}</h4>
            <form onSubmit={this.handleSubmit}>
                <FormGroup validationState={formErrors.title.length > 0 ? "error":null}>
                    <ControlLabel>Title:</ControlLabel>
                    <FormControl
                        type="text"
                        name="title"
                        placeholder="Movie Title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    {formErrors.title.length > 0 && (
                        <HelpBlock bsClass="error-message">{formErrors.title}</HelpBlock>
                    )}
                </FormGroup>
                <FormGroup validationState={formErrors.year.length > 0 ? "error":null}>
                    <ControlLabel>Year:</ControlLabel>
                    <FormControl
                        type="text"
                        name="year"
                        placeholder="Year"
                        value={this.state.year}
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    {formErrors.year.length > 0 && (
                        <HelpBlock bsClass="error-message">{formErrors.year}</HelpBlock>
                    )}
                </FormGroup>
                
                <FormGroup validationState={formErrors.runtime.length > 0 ? "error":null}>
                    <ControlLabel>Runtime:</ControlLabel>
                    <FormControl
                        type="text"
                        name="runtime"
                        placeholder="Runtime"
                        value={this.state.runtime}
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    {formErrors.runtime.length > 0 && (
                        <HelpBlock bsClass="error-message">{formErrors.runtime}</HelpBlock>
                    )}
                </FormGroup>
                
                <FormGroup validationState={formErrors.genre.length > 0 ? "error":null}>
                    <ControlLabel>Genre:</ControlLabel>
                    <FormControl
                        type="text"
                        name="genre"
                        placeholder="Genre"
                        value={this.state.genre}
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    {formErrors.genre.length > 0 && (
                     <HelpBlock bsClass="error-message">{formErrors.genre}</HelpBlock>
                    )}
                </FormGroup>
                <FormGroup validationState={formErrors.director.length > 0 ? "error":null}>
                    <ControlLabel>Director:</ControlLabel>
                    <FormControl
                        type="text"
                        name="director"
                        placeholder="Director Name"
                        value={this.state.director}
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    {formErrors.director.length > 0 && (
                    <HelpBlock bsClass="error-message">{formErrors.director}</HelpBlock>
                    )}
                </FormGroup>
                
                <br />
                <div className="right-btn">
                  <p className="error-message">{this.state.bottomError}</p>
                  <Button type="submit" bsClass="custom-btn-sm" onClick={this.handleSubmit}>Save</Button>&nbsp;
                  <Button bsClass="custom-btn-sm" onClick={this.props.closeModal}>Cancel</Button>
                </div>
              
              
            </form>
            
          </div>
          );
    }
};

export default MovieEditForm;