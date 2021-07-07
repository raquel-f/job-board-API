const express = require("express");
const router = express.Router();
const jobBoard = require("../services/jobPost");

// auth0 middleware
const { checkJwt, checkPermissions, permissions } = require("../auth0");

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

// GET number of job posts in the db
router.get("/total", async function (req, res, next) {
  try {
    res.json(await jobBoard.getRows(req.query.page));
  } catch (err) {
    console.error(`Error while getting number of job posts `, err.message);
    res.status(400).send("Error while getting number of job posts");
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

// GET job type of job post
router.get("/:id/type", async function (req, res, next) {
  try {
    res.json(await jobBoard.getJobPostJobType(req.query.page, req.params.id));
  } catch (err) {
    console.error(`Error while getting job type of job post`, err.message);
    res.status(400).send("Error while getting job type of job post");
    next(err);
  }
});

// GET location of job post
router.get("/:id/location", async function (req, res, next) {
  try {
    res.json(await jobBoard.getJobPostLocation(req.query.page, req.params.id));
  } catch (err) {
    console.error(`Error while getting location of job post`, err.message);
    res.status(400).send("Error while getting location of job post");
    next(err);
  }
});

// GET skill sets of job post
router.get("/:id/skills", async function (req, res, next) {
  try {
    res.json(await jobBoard.getJobPostSkillSets(req.query.page, req.params.id));
  } catch (err) {
    console.error(`Error while getting skills of job post`, err.message);
    res.status(400).send("Error while getting skills of job post");
    next(err);
  }
});

// only allowed users can perform the calls bellow
router.use(checkJwt);

// POST job post
router.post(
  "/", 
  checkPermissions(permissions.Registered),
  async function (req, res, next) {
  try {
    res.json(await jobBoard.create(req.body));
  } catch (err) {
    console.error(`Error while creating job post`, err.message);
    res.status(400).send("Error while creating job post");
    next(err);
  }
});

// only admin users can perform the calls bellow

// PUT job post
router.put(
  "/:id", 
  checkPermissions(permissions.Admin),
  async function (req, res, next) {
  try {
    res.json(await jobBoard.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating job post`, err.message);
    res.status(400).send("Error while updating job post");
    next(err);
  }
});

// DELETE job post
router.delete(
  "/:id", 
  checkPermissions(permissions.Admin),
  async function (req, res, next) {
  try {
    res.json(await jobBoard.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting job post`, err.message);
    res.status(400).send("Error while deleting job post");
    next(err);
  }
});

module.exports = router;
