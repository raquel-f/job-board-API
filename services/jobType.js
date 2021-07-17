const db = require("./db");
const helper = require("../helper");
const config = require("../config");

// READ all job types
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, job_type
        FROM job_type LIMIT ?,?`,
    [offset, parseInt(config.listPerPage)]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

// get number of job types
async function getRows(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT COUNT(*) as total FROM job_type LIMIT ?,?`,
    [offset, parseInt(config.listPerPage)]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

// READ one specific job_type
async function getJobType(page = 1, id) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, job_type
        FROM job_type 
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

// CREATE job_type
async function create(job) {
  const result = await db.query(
    `INSERT INTO job_type 
        (job_type) 
        VALUES 
        (?)`,
    [job.job_type]
  );

  let message = "Error in creating job type";

  if (result.affectedRows) {
    message = "Job Type created successfully";
  }
  return { message };
}

// UPDATE job type
async function update(id, job) {
  const result = await db.query(
    `UPDATE job_type 
        SET job_type=?
        WHERE id=?`,
    [job.job_type, id]
  );

  let message = "Error in updating job type";

  if (result.affectedRows) {
    message = "Job Type updated successfully";
  }
  return { message };
}

// DELETE job type
async function remove(id) {
  const result = await db.query(`DELETE FROM job_type WHERE id=?`, [id]);

  let message = "Error in deleting job type";

  if (result.affectedRows) {
    message = "Job Type deleted successfully";
  }
  return { message };
}

module.exports = {
  getMultiple,
  getRows,
  getJobType,
  create,
  update,
  remove,
};
