const express = require("express");
const router = express.Router();
const skillSet = require("../services/skillSet");

// GET all skill sets
router.get("/", async function (req, res, next) {
  try {
    res.json(await skillSet.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting skill sets`, err.message);
    res.status(400).send("Error while getting skill sets");
    next(err);
  }
});

// GET all skill sets for a job posting
router.get("/job/:id", async function (req, res, next) {
  try {
    res.json(await skillSet.getMultipleFromJob(req.query.page, req.params.id));
  } catch (err) {
    console.error(`Error while getting job skill sets`, err.message);
    res.status(400).send("Error while getting job skill sets");
    next(err);
  }
});

// GET one specific skill set
router.get("/:id", async function (req, res, next) {
  try {
    res.json(await skillSet.getSkillSet(req.query.page, req.params.id));
  } catch (err) {
    console.error(`Error while getting skill set`, err.message);
    res.status(400).send("Error while getting skill set");
    next(err);
  }
});

// POST skill set
router.post("/", async function (req, res, next) {
  try {
    res.json(await skillSet.create(req.body));
  } catch (err) {
    console.error(`Error while creating skill set`, err.message);
    res.status(400).send("Error while creating skill set");
    next(err);
  }
});

// PUT skill set
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await skillSet.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating skill set`, err.message);
    res.status(400).send("Error while updating skill set");
    next(err);
  }
});

// DELETE skill set
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await skillSet.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting skill set`, err.message);
    res.status(400).send("Error while deleting skill set");
    next(err);
  }
});

module.exports = router;
