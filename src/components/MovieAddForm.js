import React from 'react';
import { FormControl, FormGroup, Button, HelpBlock, ControlLabel } from 'react-bootstrap';

class MovieAddForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: "",
            year: "",
            runtime: "",
            genre: "",
            director: "",
            poster:"",
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

            let newMovie = {
                Title: this.state.title,
                Year: this.state.year,
                Runtime: this.state.runtime,
                Genre: this.state.genre,
                Director: this.state.director,
                Poster: this.state.poster
            }            
            

            this.props.add(newMovie.Title,newMovie.Year,newMovie.Runtime,newMovie.Genre,newMovie.Director,newMovie.Poster);
            
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
                formErrors.title = this.props.search("",value)
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

    formValid = ({formErrors,Poster, ...rest}) => {
        let valid = true;

        // check if no errors
        Object.values(formErrors).forEach(val => {
            val.length > 0 && (valid = false); 
        });

        // validate that all values are filled
        Object.values(rest).forEach((name,val) =>{
            if((val==="" || val===null) && (name!=="poster")) {
                valid = false;
                this.setState({bottomError:"Please fill all fields (Poster is optional)"});
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
            <h4>Add New Movie:</h4>
            <form onSubmit={this.handleSubmit}>
            <div className="d-flex">
                <FormGroup validationState={formErrors.title.length > 0 ? "error":null}>
                    <ControlLabel>Title:</ControlLabel>
                    <FormControl
                        type="text"
                        name="title"
                        placeholder="Movie Title"
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    {formErrors.title.length > 0 && (
                        <HelpBlock bsClass="error-message">{formErrors.title}</HelpBlock>
                    )}
                </FormGroup>
                &nbsp;
                <FormGroup validationState={formErrors.year.length > 0 ? "error":null}>
                    <ControlLabel>Year:</ControlLabel>
                    <FormControl
                        type="text"
                        name="year"
                        placeholder="Year"
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    {formErrors.year.length > 0 && (
                        <HelpBlock bsClass="error-message">{formErrors.year}</HelpBlock>
                    )}
                </FormGroup>
            </div>
                
                <FormGroup validationState={formErrors.runtime.length > 0 ? "error":null}>
                    <ControlLabel>Runtime:</ControlLabel>
                    <FormControl
                        type="text"
                        name="runtime"
                        placeholder="Runtime"
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
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    {formErrors.director.length > 0 && (
                    <HelpBlock bsClass="error-message">{formErrors.director}</HelpBlock>
                    )}
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Poster:</ControlLabel>
                    <FormControl
                        type="text"
                        name="poster"
                        placeholder="Poster Address (Optional)"
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                </FormGroup>
                
                <br />
                <div className="right-btn">
                  <p className="error-message">{this.state.bottomError}</p>
                  <Button type="submit" bsClass="custom-btn-sm" onClick={this.handleSubmit}>Add Movie</Button>&nbsp;
                  <Button bsClass="custom-btn-sm" onClick={this.props.closeModal}>Cancel</Button>
                </div>
              
              
            </form>
            
          </div>
          );
    }
};

export default MovieAddForm;