const express = require('express');
const router = express.Router();
const jobBoard = require('../services/jobPost');

// GET job posts
router.get('/', async function(req, res, next) {
    try {
        res.json(await jobBoard.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting job posts `, err.message);
        next(err);
    }
});

// GET one specific job post
router.get('/:id', async function(req, res, next) {
    try {
        res.json(await jobBoard.getJobPost(req.query.page, req.params.id));
    } catch (err) {
        console.error(`Error while getting job post`, err.message);
        next(err);
    }
});

// POST job post
router.post('/new', async function(req, res, next) {
    try {
        res.json(await jobBoard.create(req.body));
    } catch (err) {
        console.error(`Error while creating job post`, err.message);
        next(err);
    }
});

// PUT location
router.put('/update/:id', async function(req, res, next) {
    try {
        res.json(await jobBoard.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating job post`, err.message);
        next(err);
    }
});

// DELETE location
router.delete('/delete/:id', async function(req, res, next) {
    try {
        res.json(await jobBoard.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting job post`, err.message);
        next(err);
    }
});

module.exports = router;