import React from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import MovieAddForm from './MovieAddForm.js';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  
Modal.setAppElement('#root')

class AddMovieModal extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            modalIsOpen: false
          };
      
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
      }
      
      openModal() {
        this.setState({modalIsOpen: true});
      }
    
      closeModal() {
        this.setState({modalIsOpen: false});
      }
    
      render() {
        return (
            <div className="btn-div">
              <div className="d-flex justify-content-center">
                <Button bsClass="custom-btn" onClick={this.openModal}>Add New Movie</Button>
              </div>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Add Movie"
              >
                {this.showModal()}
                
              </Modal>
            </div>
          ); 
      }
      
      showModal(){
        if(this.state.modalIsOpen){
          return(<MovieAddForm
            closeModal={this.closeModal}
            search={this.props.search}
            add={this.handleAdd}
            />);
        }
      }

      handleAdd = (Title,Year,Runtime,Genre,Director,Poster) => {
        this.props.add(Title,Year,Runtime,Genre,Director,Poster);
        this.closeModal();
      }
};


export default AddMovieModal;