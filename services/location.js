const db = require("./db");
const helper = require("../helper");
const config = require("../config");

// READ all job locations
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, street, city, country, zip
        FROM job_location LIMIT ?,?`,
    [offset, parseInt(config.listPerPage)]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

// get number of locations
async function getRows(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT COUNT(*) as total FROM job_location LIMIT ?,?`,
    [offset, parseInt(config.listPerPage)]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

// READ one specific job location
async function getLocation(page = 1, id) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, street, city, country, zip
        FROM job_location 
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

// CREATE job location
async function create(location) {
  const result = await db.query(
    `INSERT INTO job_location 
        (street, city, country, zip) 
        VALUES 
        (?, ?, ?, ?)`,
    [location.street, location.city, location.country, location.zip]
  );

  let message = "Error in creating location";

  if (result.affectedRows) {
    message = "Location created successfully";
  }
  return { message };
}

// UPDATE job location
async function update(id, location) {
  const result = await db.query(
    `UPDATE job_location 
        SET street=?, city=?, country=?, zip=?
        WHERE id=?`,
    [location.street, location.city, location.country, location.zip, id]
  );

  let message = "Error in updating location";

  if (result.affectedRows) {
    message = "Location updated successfully";
  }
  return { message };
}

// DELETE job location
async function remove(id) {
  const result = await db.query(`DELETE FROM job_location WHERE id=?`, [id]);

  let message = "Error in deleting location";

  if (result.affectedRows) {
    message = "Location deleted successfully";
  }
  return { message };
}

module.exports = {
  getMultiple,
  getRows,
  getLocation,
  create,
  update,
  remove,
};
