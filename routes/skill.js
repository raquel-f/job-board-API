const express = require("express");
const router = express.Router();
const skills = require("../services/skill");

// auth0 middleware
const { checkJwt, checkPermissions, permissions } = require("../auth0");

// GET all skills
router.get("/", async function (req, res, next) {
  try {
    res.json(await skills.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting skills`, err.message);
    res.status(400).send("Error while getting skills");
    next(err);
  }
});

// GET one specific skill
router.get("/:id", async function (req, res, next) {
  try {
    res.json(await skills.getSkill(req.query.page, req.params.id));
  } catch (err) {
    console.error(`Error while getting skill`, err.message);
    res.status(400).send("Error while getting skill");
    next(err);
  }
});

// only allowed users can perform the calls bellow
router.use(checkJwt);

// POST skill
router.post(
  "/",
  checkPermissions(permissions.Registered),
  async function (req, res, next) {
    try {
      res.json(await skills.create(req.body));
    } catch (err) {
      console.error(`Error while creating skill`, err.message);
      res.status(400).send("Error while creating skill");
      next(err);
    }
  }
);

// only admin users can perform the calls bellow

// PUT skill
router.put(
  "/:id",
  checkPermissions(permissions.Admin),
  async function (req, res, next) {
    try {
      res.json(await skills.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating skill`, err.message);
      res.status(400).send("Error while updating skill");
      next(err);
    }
  }
);

// DELETE skill
router.delete(
  "/:id",
  checkPermissions(permissions.Admin),
  async function (req, res, next) {
    try {
      res.json(await skills.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting skill`, err.message);
      res.status(400).send("Error while deleting skill");
      next(err);
    }
  }
);

module.exports = router;
