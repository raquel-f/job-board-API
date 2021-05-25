const express = require('express');
const router = express.Router();
const skills = require('../services/skill');

// GET all skills
router.get('/', async function(req, res, next) {
    try {
        res.json(await skills.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting skills`, err.message);
        next(err);
    }
});

// GET one specific skill
router.get('/:id', async function(req, res, next) {
    try {
        res.json(await skills.getSkill(req.query.page, req.params.id));
    } catch (err) {
        console.error(`Error while getting skill`, err.message);
        next(err);
    }
});

// POST skill
router.post('/new', async function(req, res, next) {
    try {
        res.json(await skills.create(req.body));
    } catch (err) {
        console.error(`Error while creating skill`, err.message);
        next(err);
    }
});

// PUT skill
router.put('/update/:id', async function(req, res, next) {
    try {
        res.json(await skills.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating skill`, err.message);
        next(err);
    }
});

// DELETE skill
router.delete('/delete/:id', async function(req, res, next) {
    try {
        res.json(await skills.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting skill`, err.message);
        next(err);
    }
});

module.exports = router;