import React from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import MovieEditForm from './MovieEditForm.js';

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

class EditDeleteModal extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            modalIsOpen: false,
            editIsOpen: false,
            deleteIsOpen: false
          };
      
        this.openEditModal = this.openEditModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
      }
      
      openEditModal() {
        this.setState({modalIsOpen: true,editIsOpen: true, deleteIsOpen:false});
      }

      openDeleteModal() {
        this.setState({modalIsOpen: true,editIsOpen: false, deleteIsOpen:true});
      }
    
      closeModal() {
        this.setState({modalIsOpen: false,editIsOpen: false, deleteIsOpen:false});
      }
    
      render() {
        return (
            <div className="btn-div">
              <Button bsClass="custom-btn-sm" onClick={this.openEditModal}>Edit</Button>&nbsp;
              <Button bsClass="custom-btn-sm" onClick={this.openDeleteModal}>Delete</Button>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Edit/Delete Modal"
              >
                {this.showEditOrDelete()}
                
              </Modal>
            </div>
          ); 
      }
      
      showEditOrDelete(){
        if(this.state.editIsOpen){
          return(<MovieEditForm
            movie={this.props.movie}
            closeModal={this.closeModal}
            edit={this.handleEdit}
            search={this.props.search}
            />);
        }
        if(this.state.deleteIsOpen){
          return(<div>
            <p><b>Delete movie {this.props.movie.Title}</b></p>
            <p>Are you sure?</p>
            <div className="right-btn">
                  <Button bsStyle="primary" bsSize="small" onClick={this.handleDelete} >Ok</Button>&nbsp;
                  <Button bsStyle="primary" bsSize="small" onClick={this.closeModal}>Cancel</Button>
                </div>
          </div>);
        }
      }

      handleDelete = () => {
        this.props.delete(this.props.movie);
      }

      handleEdit = () => {
        const movie = this.props.movie;
        this.props.edit(movie.id,movie.Title,movie.Year,movie.Runtime,movie.Genre,movie.Director);
        this.closeModal();
      }
};


export default EditDeleteModal;