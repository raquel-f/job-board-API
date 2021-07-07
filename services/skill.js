const db = require("./db");
const helper = require("../helper");
const config = require("../config");

// READ all skills
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, description
        FROM skill LIMIT ?,?`,
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

// get number of skills
async function getRows(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT COUNT(*) as total FROM skill LIMIT ?,?`, [
    offset,
    config.listPerPage,
  ]);
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

// READ one specific skill
async function getSkill(page = 1, id) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, description
        FROM skill 
        WHERE id=? 
        LIMIT ?,?`,
    [id, offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };
  return {
    data,
    meta,
  };
}

// CREATE skill
async function create(skill) {
  const result = await db.query(
    `INSERT INTO skill 
        (name, description) 
        VALUES 
        (?, ?)`,
    [skill.name, skill.description]
  );

  let message = "Error in creating skill";

  if (result.affectedRows) {
    message = "Skill created successfully";
  }
  return { message };
}

// UPDATE skill
async function update(id, skill) {
  const result = await db.query(
    `UPDATE skill 
        SET name=?, description=?
        WHERE id=?`,
    [skill.name, skill.description, id]
  );

  let message = "Error in updating skill";

  if (result.affectedRows) {
    message = "Skill updated successfully";
  }
  return { message };
}

// DELETE skill
async function remove(id) {
  const result = await db.query(`DELETE FROM skill WHERE id=?`, [id]);

  let message = "Error in deleting skill";

  if (result.affectedRows) {
    message = "Skill deleted successfully";
  }
  return { message };
}

module.exports = {
  getMultiple,
  getRows,
  getSkill,
  create,
  update,
  remove,
};
