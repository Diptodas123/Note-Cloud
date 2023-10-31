import React from 'react';

const NoteItem = (props) => {
    const { title, description, tag, date } = props.note;
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{title}</h5>
                        <i className="fa-solid fa-trash mx-3"></i>
                        <i className="fa-regular fa-pen-to-square mx-3"></i>
                    </div>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;