import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    // eslint-disable-next-line
    const { title, description, tag, date } = props.note;

    const handleUpdate = () => {
        props.updateNote(props.note);
    }

    const handleDelete = () => {
        deleteNote(props.note._id)
        props.showAlert("Note deleted successfully", "success");
    }

    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{title}</h5>
                        <i className="fa-solid fa-trash mx-3" onClick={handleDelete}></i>
                        <i className="fa-regular fa-pen-to-square mx-3" onClick={handleUpdate}></i>
                    </div>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;