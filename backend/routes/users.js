import express from "express";
import UserModel from "../models/User.js";
const router = express.Router();

router.get("/", (req, res) => {
  let param = req.query.username;
  UserModel.findOne({ userName: param }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

//return all the plants for this user
router.get("/plant", (req, res) => {
  let param = req.query.username;
  let plantId = req.query.id;
  const result = UserModel.findOne({ username: param }).then((doc) => {
    let plant = doc.plants.id(plantId);
    res.json(plant);
  });
});

//Add a new note to the plant notes array
router.get("/notes", (req, res) => {
  const plantId = req.body.id;
  const user = req.body.id;

  const result = UserModel.findOne({ username: param }).then((doc) => {
    let plant = doc.plants.id(plantId);
    res.json(plant.notes);
  });
});

router.post("/new", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

router.post("/update", async (req, res) => {
  let param = req.query.username;
  const result = await UserModel.findOne({ userName: param }).then((doc) => {
    doc.plants.push(req.body);
    doc.save();
    res.json(doc.plants.at(-1));
  });

  res.json(result);
});

router.post("/water", async (req, res) => {
  let param = req.query.username;
  const watered = req.body.watered;
  const plantId = req.body.id;

  const result = await UserModel.findOne({ username: param }).then((doc) => {
    let plant = doc.plants.id(plantId);
    plant.watered = watered;
    doc.save();
  });
  res.json(result);
});

//Edit name and/or location
router.post("/edit", async (req, res) => {
  let param = req.query.username;
  const name = req.body.name;
  const location = req.body.location;
  const plantId = req.body.id;
  console.log(req.body);

  const result = await UserModel.findOne({ username: param }).then((doc) => {
    let plant = doc.plants.id(plantId);
    plant.name = name;
    plant.location = location;
    doc.save();
  });
  res.json(result);
});

//Adds or edits note related to the plant
router.post("/note", async (req, res) => {
  const username = req.body.username;
  const noteBody = req.body.noteBody;
  const noteTitle = req.body.noteTitle;
  const plantId = req.body.id;
  const toDo = req.body.toDo;
  const idx = req.body.idx;
  console.log(req.body);

  const result = await UserModel.findOne({ username: username }).then((doc) => {
    let plant = doc.plants.id(plantId);
    console.log(`plant: ${plant}`);
    if (toDo === "add") {
      plant.notes.push({ noteTitle, noteBody });
      doc.save();
    } else if (toDo === "update") {
      doc.plants.id(plantId).notes[idx].noteTitle = noteTitle;
      doc.plants.id(plantId).notes[idx].noteBody = noteBody;
      console.log(`UPDATED: ${plant.notes[idx].noteTitle}`);
      doc.save();
    }
  });

  res.json(result);
});

router.post("/editLocation", async (req, res) => {
  let param = req.query.username;
  const location = req.body.location;
  const plantId = req.body.id;

  const result = await UserModel.findOne({ username: param }).then((doc) => {
    let plant = doc.plants.id(plantId);
    plant.location = location;
    doc.save();
  });
  res.json(result);
});

router.post("/editImage", async (req, res) => {
  let param = req.query.username;
  const imagePath = req.body.imagePath;
  const plantId = req.body.id;

  const result = await UserModel.findOne({ username: param }).then((doc) => {
    let plant = doc.plants.id(plantId);
    plant.image = imagePath;
    doc.save();
  });
  res.json(result);
});

router.post("/delete", async (req, res) => {
  const param = req.body.username;
  const plantId = req.body.id;
  const toDelete = req.body.toDelete;
  const noteIndex = req.body.idx;

  console.log(noteIndex);

  if (toDelete === "plant") {
    const result = await UserModel.findOne({ username: param }).then((doc) => {
      const index = doc.plants.findIndex((element) => element.id === plantId);
      doc.plants.splice(index, 1);
      doc.save();
    });
    res.json(result);
  } else if (toDelete === "note") {
    const result = await UserModel.findOne({ username: param }).then((doc) => {
      // const index = doc.plants.findIndex((element) => element.id === plantId);
      doc.plants.id(plantId).notes.splice(noteIndex, 1);
      doc.save();
    });
    res.json(result);
  }
});

export default router;
