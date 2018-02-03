const axios = require("axios");
const notes = [];
const id = 0;

// lets user read the notes
const readNote = (req, res, next) => {
  console.log(`Providing Notes`);
  res.json(notes);
};

// lets user create notes
const createNote = (req, res, next) => {
  if (notes.length === 0) {
    console.log(`Note Created!`);
    notes.push({ id: id, note: req.body });
    id++;
  }
};

// lets user update notes

// lets user delete note
