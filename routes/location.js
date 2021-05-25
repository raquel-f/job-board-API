const express = require('express');
const router = express.Router();
const location = require('../services/location');

// GET all locations
router.get('/', async function(req, res, next) {
    try {
        res.json(await location.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting locations`, err.message);
        next(err);
    }
});

// GET one specific location
router.get('/:id', async function(req, res, next) {
    try {
        res.json(await location.getLocation(req.query.page, req.params.id));
    } catch (err) {
        console.error(`Error while getting location`, err.message);
        next(err);
    }
});

// POST location
router.post('/new', async function(req, res, next) {
    try {
        res.json(await location.create(req.body));
    } catch (err) {
        console.error(`Error while creating location`, err.message);
        next(err);
    }
});

// PUT location
router.put('/update/:id', async function(req, res, next) {
    try {
        res.json(await location.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating location`, err.message);
        next(err);
    }
});

// DELETE location
router.delete('/delete/:id', async function(req, res, next) {
    try {
        res.json(await location.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting location`, err.message);
        next(err);
    }
});

module.exports = router;