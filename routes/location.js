const express = require("express");
const router = express.Router();
const location = require("../services/location");

// GET all locations
router.get("/", async function (req, res, next) {
  try {
    res.json(await location.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting locations`, err.message);
    res.status(400).send("Error while getting locations");
    next(err);
  }
});

// GET one specific location
router.get("/:id", async function (req, res, next) {
  try {
    res.json(await location.getLocation(req.query.page, req.params.id));
  } catch (err) {
    console.error(`Error while getting location`, err.message);
    res.status(400).send("Error while getting location");
    next(err);
  }
});

// POST location
router.post("/", async function (req, res, next) {
  try {
    res.json(await location.create(req.body));
  } catch (err) {
    console.error(`Error while creating location`, err.message);
    res.status(400).send("Error while creating location");
    next(err);
  }
});

// PUT location
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await location.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating location`, err.message);
    res.status(400).send("Error while updating location");
    next(err);
  }
});

// DELETE location
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await location.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting location`, err.message);
    res.status(400).send("Error while deleting location");
    next(err);
  }
});

module.exports = router;
