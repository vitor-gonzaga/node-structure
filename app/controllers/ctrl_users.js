const connection = require('../methods/connection');
const methods = require('../methods/mtd_users');

exports.user_get_all = async (req, res) => {
  let sql;
  try {
    sql = await connection.getConnection();
    const result = await methods.get_all(sql);
    res.status(200).json(result);
    sql.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
    if (sql) {
      sql.release();
    }
  }
};

exports.user_add = async (req, res) => {
  let sql;
  try {
    sql = await connection.getConnection();
    const result = await methods.post(sql, req.body);
    res.status(200).json(result);
    sql.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
    if (sql) {
      sql.release();
    }
  }
};

exports.user_get_by_id = async (req, res) => {
  let sql;
  try {
    sql = await connection.getConnection();
    const result = await methods.user_get_by_id(sql, req.body);
    res.status(200).json(result);
    sql.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
    if (sql) {
      sql.release();
    }
  }
};

exports.user_update = async (req, res) => {
  let sql;
  try {
    sql = await connection.getConnection();
    const result = await methods.put(sql, req.body);
    res.status(200).json(result);
    sql.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
    if (sql) {
      sql.release();
    }
  }
};

exports.user_delete = async (req, res) => {
  let sql;
  try {
    sql = await connection.getConnection();
    const result = await methods.delete_user(sql, req.body);
    res.status(200).json(result);
    sql.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
    if (sql) {
      sql.release();
    }
  }
};
