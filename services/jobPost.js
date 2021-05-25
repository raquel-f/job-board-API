// GET /job-board → getMultiple()
// POST /job-board → create()
// PUT /job-board/:id → update()
// DELETE /job-board/:id → remove()

// bridge between route and the database
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, created_date, job_title, job_description, 
        is_active, job_location_id, job_type_id
        FROM job_post LIMIT ?,?`, 
        [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

// READ one specific job post
async function getJobPost(page=1, id){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, created_date, job_title, job_description, 
        is_active, job_location_id, job_type_id
        FROM job_post 
        WHERE id=? 
        LIMIT ?,?`, 
        [id, offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
    return {
        data,
        meta
    }
}

// CREATE job post
async function create(jobPost){
    const result = await db.query(
        `INSERT INTO job_post 
        (created_date, job_title, job_description, 
        is_active, job_location_id, job_type_id) 
        VALUES 
        (?, ?, ?, ?, ?, ?)`, 
        [   jobPost.created_date, jobPost.job_title, 
            jobPost.job_description, jobPost.is_active,
            jobPost.job_location_id, jobPost.job_type_id
        ]
    );
  
    let message = 'Error in creating job post';
  
    if (result.affectedRows) {
      message = 'Job Post created successfully';
    }
    return {message};
}

// UPDATE job post
async function update(id, jobPost){
    const result = await db.query(
        `UPDATE job_post 
        SET created_date=?, job_title=?, job_description=?, 
        is_active=?, job_location_id=?, job_type_id=?
        WHERE id=?`, 
        [   jobPost.created_date, jobPost.job_title, 
            jobPost.job_description, jobPost.is_active,
            jobPost.job_location_id, jobPost.job_type_id, id
        ]
    );
  
    let message = 'Error in updating job post';
  
    if (result.affectedRows) {
        message = 'Job Post updated successfully';
    }
    return {message};
}

// DELETE job post
async function remove(id){
    const result = await db.query(
      `DELETE FROM job_post WHERE id=?`, 
      [ id ]
    );
  
    let message = 'Error in deleting job post';
  
    if (result.affectedRows) {
      message = 'Job Post deleted successfully';
    }
    return {message};
}

module.exports = {
    getMultiple,
    getJobPost,
    create,
    update,
    remove
}