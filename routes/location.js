const express = require("express");
const router = express.Router();
const location = require("../services/location");

// auth0 middleware
const {checkJwt, checkPermissions, permissions} = require("../auth0");

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

// GET number of locations in the db
router.get("/total", async function (req, res, next) {
  try {
    res.json(await location.getRows(req.query.page));
  } catch (err) {
    console.error(`Error while getting number of locations`, err.message);
    res.status(400).send("Error while getting nunmber of locations");
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

// only allowed users can perform the calls bellow 
router.use(checkJwt);

// POST location
router.post(
  "/", 
  checkPermissions(permissions.Registered),
  async function (req, res, next) {
  try {
    res.json(await location.create(req.body));
  } catch (err) {
    console.error(`Error while creating location`, err.message);
    res.status(400).send("Error while creating location");
    next(err);
  }
});

// only admin users can perform the calls bellow 

// PUT location
router.put(
  "/:id", 
  checkPermissions(permissions.Admin), 
  async function (req, res, next) {
  try {
    res.json(await location.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating location`, err.message);
    res.status(400).send("Error while updating location");
    next(err);
  }
});

// DELETE location
router.delete(
  "/:id", 
  checkPermissions(permissions.Admin),
  async function (req, res, next) {
  try {
    res.json(await location.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting location`, err.message);
    res.status(400).send("Error while deleting location");
    next(err);
  }
});

module.exports = router;
