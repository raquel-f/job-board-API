const express = require("express");
const router = express.Router();
const jobBoard = require("../services/jobPost");

// GET job posts
router.get("/", async function (req, res, next) {
  try {
    res.json(await jobBoard.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting job posts `, err.message);
    res.status(400).send("Error while getting job posts");
    next(err);
  }
});

// GET one specific job post
router.get("/:id", async function (req, res, next) {
  try {
    res.json(await jobBoard.getJobPost(req.query.page, req.params.id));
  } catch (err) {
    console.error(`Error while getting job post`, err.message);
    res.status(400).send("Error while getting job post");
    next(err);
  }
});

// POST job post
router.post("/", async function (req, res, next) {
  try {
    res.json(await jobBoard.create(req.body));
  } catch (err) {
    console.error(`Error while creating job post`, err.message);
    res.status(400).send("Error while creating job post");
    next(err);
  }
});

// PUT job post
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await jobBoard.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating job post`, err.message);
    res.status(400).send("Error while updating job post");
    next(err);
  }
});

// DELETE job post
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await jobBoard.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting job post`, err.message);
    res.status(400).send("Error while deleting job post");
    next(err);
  }
});

module.exports = router;
