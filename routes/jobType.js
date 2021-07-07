const express = require("express");
const router = express.Router();
const jobType = require("../services/jobType");

// auth0 middleware
const { checkJwt, checkPermissions, permissions } = require("../auth0");

// GET all job types
router.get("/", async function (req, res, next) {
  try {
    res.json(await jobType.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting job types`, err.message);
    res.status(400).send("Error while getting job types");
    next(err);
  }
});

// GET number of job types in the db
router.get("/total", async function (req, res, next) {
  try {
    res.json(await jobType.getRows(req.query.page));
  } catch (err) {
    console.error(`Error while getting number of job types`, err.message);
    res.status(400).send("Error while getting number of job types");
    next(err);
  }
});

// GET one specific job type
router.get("/:id", async function (req, res, next) {
  try {
    res.json(await jobType.getJobType(req.query.page, req.params.id));
  } catch (err) {
    console.error(`Error while getting job type`, err.message);
    res.status(400).send("Error while getting job type");
    next(err);
  }
});

// only allowed users can perform the calls bellow
router.use(checkJwt);

// POST job type
router.post(
  "/",
  checkPermissions(permissions.Registered),
  async function (req, res, next) {
    try {
      res.json(await jobType.create(req.body));
    } catch (err) {
      console.error(`Error while creating job type`, err.message);
      res.status(400).send("Error while creating job type");
      next(err);
    }
  }
);

// only admin users can perform the calls bellow

// PUT job type
router.put(
  "/:id",
  checkPermissions(permissions.Admin),
  async function (req, res, next) {
    try {
      res.json(await jobType.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating job type`, err.message);
      res.status(400).send("Error while updating job type");
      next(err);
    }
  }
);

// DELETE job type
router.delete(
  "/:id",
  checkPermissions(permissions.Admin),
  async function (req, res, next) {
    try {
      res.json(await jobType.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting job type`, err.message);
      res.status(400).send("Error while deleting job type");
      next(err);
    }
  }
);

module.exports = router;
