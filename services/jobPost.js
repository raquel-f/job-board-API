// bridge between route and the database
const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, created_date, job_title, job_description, 
        is_active, job_location_id, job_type_id
        FROM job_post LIMIT ?,?`,
    [offset, parseInt(config.listPerPage)]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

// get number of job posts
async function getRows(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT COUNT(*) as total FROM job_post LIMIT ?,?`,
    [offset, parseInt(config.listPerPage)]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

// READ one specific job post
async function getJobPost(page = 1, id) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, created_date, job_title, job_description, 
        is_active, job_location_id, job_type_id
        FROM job_post 
        WHERE id=? 
        LIMIT ?,?`,
    [id, offset, parseInt(config.listPerPage)]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };
  return {
    data,
    meta,
  };
}

// READ Job Type of Job Post
async function getJobPostJobType(page = 1, id) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT job_type.id, job_type.job_type 
        FROM job_type 
        INNER JOIN job_post ON job_type.id=job_post.job_type_id AND job_post.id=?
        LIMIT ?,?`,
    [id, offset, parseInt(config.listPerPage)]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };
  return {
    data,
    meta,
  };
}

// READ Location of Job Post
async function getJobPostLocation(page = 1, id) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT job_location.id, job_location.street, job_location.city, job_location.country, job_location.zip
        FROM job_location 
        INNER JOIN job_post ON job_location.id=job_post.job_location_id AND job_post.id=?
        LIMIT ?,?`,
    [id, offset, parseInt(config.listPerPage)]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };
  return {
    data,
    meta,
  };
}

// READ Skill Sets and Skills of Job Post
async function getJobPostSkillSets(page = 1, id) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT job_skill_set.id, job_skill_set.skill_level, job_skill_set.skill_id, skill.name, skill.description
        FROM job_skill_set
        LEFT JOIN skill ON skill.id = job_skill_set.skill_id
        INNER JOIN job_post ON job_skill_set.job_post_id=job_post.id AND job_post.id=?
        LIMIT ?,?`,
    [id, offset, parseInt(config.listPerPage)]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };
  return {
    data,
    meta,
  };
}

// CREATE job post
async function create(jobPost) {
  const result = await db.query(
    `INSERT INTO job_post 
        (created_date, job_title, job_description, 
        is_active, job_location_id, job_type_id) 
        VALUES 
        (?, ?, ?, ?, ?, ?)`,
    [
      jobPost.created_date,
      jobPost.job_title,
      jobPost.job_description,
      jobPost.is_active,
      jobPost.job_location_id,
      jobPost.job_type_id,
    ]
  );

  let message = "Error in creating job post";

  if (result.affectedRows) {
    message = "Job Post created successfully";
  }
  return { message };
}

// UPDATE job post
async function update(id, jobPost) {
  const result = await db.query(
    `UPDATE job_post 
        SET created_date=?, job_title=?, job_description=?, 
        is_active=?, job_location_id=?, job_type_id=?
        WHERE id=?`,
    [
      jobPost.created_date,
      jobPost.job_title,
      jobPost.job_description,
      jobPost.is_active,
      jobPost.job_location_id,
      jobPost.job_type_id,
      id,
    ]
  );

  let message = "Error in updating job post";

  if (result.affectedRows) {
    message = "Job Post updated successfully";
  }
  return { message };
}

// DELETE job post
async function remove(id) {
  const result = await db.query(`DELETE FROM job_post WHERE id=?`, [id]);

  let message = "Error in deleting job post";

  if (result.affectedRows) {
    message = "Job Post deleted successfully";
  }
  return { message };
}

module.exports = {
  getMultiple,
  getRows,
  getJobPost,
  getJobPostJobType,
  getJobPostLocation,
  getJobPostSkillSets,
  create,
  update,
  remove,
};
