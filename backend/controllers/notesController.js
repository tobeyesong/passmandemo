/** @format */

import asyncHandler from "express-async-handler";
import Note from "../models/noteModel.js";

// Importing the necessary library
import algoliasearch from "algoliasearch";

// Your Algolia setup
const searchClient = algoliasearch(
  "BC38Z1AKHU",
  "802e2ce9797af17219da6526ac4502ba"
);
const noteIndex = searchClient.initIndex("noteDemo");

// Fetch all notes
// GET /api/notes
// private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});

// Fetch single note
// GET /api/note/:id
// private

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

// @desc     Create a notes
// @route    POST api/notes
// @access   Public

const createNote = asyncHandler(async (req, res) => {
  const newNote = new Note({
    category: req.body.category,
    title: req.body.title,
    caption: req.body.caption,
    image: req.body.image,
  });

  const createdNote = await newNote.save();
  res.status(201).json(createdNote);
});

// @route   PUT /api/note/:id
// @access  Private/Admin
const updateNote = asyncHandler(async (req, res) => {
  const { title, caption, image } = req.body.values || req.body;

  const note = await Note.findById(req.params.id);
  if (note) {
    note.title = title;
    note.caption = caption;
    note.image = image;
    const updatedNote = await note.save();

    // Update Algolia index
    try {
      await noteIndex.partialUpdateObject({
        objectID: updatedNote._id.toString(),
        title: updatedNote.title,
        caption: updatedNote.caption,
        image: updatedNote.image,
      });
    } catch (error) {
      console.error("Error updating Algolia index: ", error);
      // You might want to handle this error in a way that's appropriate for your application
    }

    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

// @desc    Delete a note
// @route   DELETE /api/note/:id
// @access
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    await note.deleteOne();

    // Delete the corresponding index from Algolia
    try {
      await noteIndex.deleteObject(req.params.id);
      res.json({ message: "Note and corresponding Algolia index removed" });
    } catch (algoliaError) {
      res.status(500).json({
        message: "Note removed, but failed to delete Algolia index",
        error: algoliaError.message,
      });
    }
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

export { getNotes, getNoteById, deleteNote, createNote, updateNote };
