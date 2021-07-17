const db = require("./db");
const helper = require("../helper");
const config = require("../config");

// READ all skill sets
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, skill_level, skill_id, job_post_id
        FROM job_skill_set LIMIT ?,?`,
    [offset, parseInt(config.listPerPage)]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

// READ all skill sets
async function getRows(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT COUNT(*) as total FROM job_skill_set LIMIT ?,?`,
    [offset, parseInt(config.listPerPage)]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

// READ all job skill sets
async function getMultipleFromJob(page = 1, jobID) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, skill_level, skill_id, job_post_id
        FROM job_skill_set 
        WHERE job_post_id=? 
        LIMIT ?,?`,
    [jobID, offset, parseInt(config.listPerPage)]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

// READ one specific skill set
async function getSkillSet(page = 1, id) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, skill_level, skill_id, job_post_id
        FROM job_skill_set 
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

// READ skill from skill set
async function getSkillFromSkillSet(page = 1, skillSetID) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT skill.id, skill.name, skill.description
          FROM skill 
          INNER JOIN job_skill_set ON skill.id=job_skill_set.skill_id AND job_skill_set.id=?
          LIMIT ?,?`,
    [skillSetID, offset, parseInt(config.listPerPage)]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

// CREATE skill set
async function create(skillSet) {
  const result = await db.query(
    `INSERT INTO job_skill_set 
        (skill_level, skill_id, job_post_id) 
        VALUES 
        (?, ?, ?)`,
    [skillSet.skill_level, skillSet.skill_id, skillSet.job_post_id]
  );

  let message = "Error in creating skill set";

  if (result.affectedRows) {
    message = "Skill Set created successfully";
  }
  return { message };
}

// UPDATE skill set
async function update(id, skillSet) {
  const result = await db.query(
    `UPDATE job_skill_set 
        SET skill_level=?, skill_id=?, job_post_id=?
        WHERE id=?`,
    [skillSet.skill_level, skillSet.skill_id, skillSet.job_post_id, id]
  );

  let message = "Error in updating skill set";

  if (result.affectedRows) {
    message = "Skill Set updated successfully";
  }
  return { message };
}

// DELETE skill set
async function remove(id) {
  const result = await db.query(`DELETE FROM job_skill_set WHERE id=?`, [id]);

  let message = "Error in deleting skill set";

  if (result.affectedRows) {
    message = "Skill Set deleted successfully";
  }
  return { message };
}

module.exports = {
  getMultiple,
  getRows,
  getMultipleFromJob,
  getSkillSet,
  getSkillFromSkillSet,
  create,
  update,
  remove,
};
