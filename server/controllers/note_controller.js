const axios = require("axios");
const notes = [];
let id = 0;

// lets user read the notes
const readNote = (req, res, next) => {
  console.log(`Providing Notes`);
  res.json(notes);
};

// lets user create notes
const postNote = (req, res, next) => {
  if (notes.length === 0) {
    console.log(`Note Created! ${req.body.input}`);
    // reaches into body and grabs the content of property body
    let newNote = req.body.input;
    notes.push({ id: id, note: newNote });
    id++;
    if (notes.length > 0) {
      res.json({ message: "Note Saved" });
    } else {
      res.status(500).json({
        message: "Failed to save message"
      });
    }
  } else if (notes.length > 0) {
    notes[0].note = req.body.input;
    res.json({ message: "one note per user" });
  }
};

// lets user update notes
const putNote = (req, res, next) => {
  console.log(`Note Updated to ${req.body.input}`);
  const id = req.params.id;
  notes[id].note = req.body.input;
  res.json({ message: "Note Updated" });
};

// lets user delete note
const deleteNote = (req, res, next) => {
  console.log(`Note Deleted`);
  const deleteID = req.params.id;
  for (let i = 0; i < notes.length; i++) {
    if (notes[i]["id"] == deleteID) {
      notes.splice(i, 1);
    }
  }
  console.log(notes);
  res.json({ message: "Note Deleted" });
};

module.exports = {
  readNote,
  postNote,
  putNote,
  deleteNote
};
