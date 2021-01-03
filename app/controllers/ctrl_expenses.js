const connection = require('../methods/connection');
const methods = require('../methods/mtd_expenses');

exports.get_all_active = async (req, res) => {
  let sql;
  try {
    sql = await connection.getConnection();
    const result = await methods.get_all_active(sql);
    res.status(200).json(result);
    sql.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
    if (sql) {
      sql.release();
    }
  }
};

exports.post_new_input_expenses = async (req, res) => {
  let sql;
  try {
    sql = await connection.getConnection();
    await methods.post_new_input(sql, req);
    res.status(200).json();
    sql.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
    if (sql) {
      sql.release();
    }
  }
};

exports.put_item_expenses = async (req, res) => {
  let sql;
  try {
    sql = await connection.getConnection();
    await methods.put_item_expenses(sql, req);
    res.status(200).json();
    sql.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
    if (sql) {
      sql.release();
    }
  }
};

exports.delete_item_expenses = async (req, res) => {
  let sql;
  try {
    sql = await connection.getConnection();
    await methods.delete_item_expenses(sql, req);
    res.status(200).json();
    sql.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
    if (sql) {
      sql.release();
    }
  }
};
