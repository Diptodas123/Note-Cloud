import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "6540e357c2b6a43275ff3465",
            "user": "65400ab2961d7a194f13022d",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2023-10-31T11:21:59.273Z",
            "__v": 0
        },
        {
            "_id": "65412442102dd91bbe258b83",
            "user": "65400ab2961d7a194f13022d",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2023-10-31T15:58:58.133Z",
            "__v": 0
        },

    ]

    const [notes, setNotes] = useState(notesInitial);

    //Add a note
    const addNote = (title, description, tag) => {
        console.log("Adding a new note");
        const note = {
            "_id": "65412472102dd91bbe258b86",
            "user": "65400ab2961d7a194f13022d",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-10-31T15:59:46.445Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }
    //Delete a note
    const deleteNote = () => {

    }
    //Edit a note
    const editNote = () => {

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;