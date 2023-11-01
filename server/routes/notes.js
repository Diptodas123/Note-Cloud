const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");
const router = express.Router();

//ROUTE 1: Get All the Nots using: GET "/api/notes/fetchallnotes". login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE 2: Add a new Note using: POST "/api/notes/addnote". login required
router.post("/addnote", fetchUser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({ min: 5 }),
], async (req, res) => {

    //If there're errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tag } = req.body;

        const note = new Note({
            user: req.user.id,
            title: title,
            description: description,
            tag: tag
        });
        const savedNote = await note.save();

        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE 3: update an existing Note using: PUT "/api/notes/updatenote". login required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
    const { title, desciption, tag } = req.body;

    try {

        //create a new note
        const newNote = {};
        if (title) { newNote.title = title; }
        if (desciption) { newNote.desciption = desciption; }
        if (tag) { newNote.tag = tag; }

        //Find the note to be updated
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not found");
        };

        //if a user trying to update a note that belongs to another user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE 4: delete an existing Note using: DELETE "/api/notes/deletenote". login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
    //find the note to be deleted
    let note = await Note.findById(req.params.id);
    
    try {

        if (!note) {
            return res.status(404).send("Not found");
        }

        //if a user trying to delete a note that belongs to another user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;