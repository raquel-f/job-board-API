const express = require('express');
const router = express.Router();
const jobType = require('../services/jobType');

// GET all job types
router.get('/', async function(req, res, next) {
    try {
        res.json(await jobType.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting job types`, err.message);
        next(err);
    }
});

// GET one specific job type
router.get('/:id', async function(req, res, next) {
    try {
        res.json(await jobType.getJobType(req.query.page, req.params.id));
    } catch (err) {
        console.error(`Error while getting job type`, err.message);
        next(err);
    }
});

// POST job type
router.post('/new', async function(req, res, next) {
    try {
        res.json(await jobType.create(req.body));
    } catch (err) {
        console.error(`Error while creating job type`, err.message);
        next(err);
    }
});

// PUT job type
router.put('/update/:id', async function(req, res, next) {
    try {
        res.json(await jobType.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating job type`, err.message);
        next(err);
    }
});

// DELETE job type
router.delete('/delete/:id', async function(req, res, next) {
    try {
        res.json(await jobType.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting job type`, err.message);
        next(err);
    }
});

module.exports = router;