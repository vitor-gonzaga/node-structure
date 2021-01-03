const connection = require('../methods/connection');
const methods = require('../methods/mtd_months_balance');

exports.actual_month_get_all = async (req, res) => {
  let sql;
  try {
    sql = await connection.getConnection();
    const result = await methods.get_actual_month_all(sql);
    const treatment = await methods.treatment_result(result);
    res.status(200).json(treatment);
    sql.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
    if (sql) {
      sql.release();
    }
  }
};

exports.get_item_month_edit = async (req, res) => {
  let sql;
  try {
    sql = await connection.getConnection();
    const result = await methods.get_item_month_edit(sql, req);
    res.status(200).json(result);
    sql.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
    if (sql) {
      sql.release();
    }
  }
};

exports.post_new_input = async (req, res) => {
  let sql;
  try {
    sql = await connection.getConnection();
    await methods.post_new_input_month_balance(sql, req);
    res.status(200).json();
    sql.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
    if (sql) {
      sql.release();
    }
  }
};

exports.put_item_month_balance = async (req, res) => {
  let sql;
  try {
    sql = await connection.getConnection();
    await methods.put_item_month_balance(sql, req);
    res.status(200).json();
    sql.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
    if (sql) {
      sql.release();
    }
  }
};

exports.delete_item = async (req, res) => {
  let sql;
  try {
    sql = await connection.getConnection();
    await methods.delete_item_month_balance(sql, req);
    res.status(200).json();
    sql.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
    if (sql) {
      sql.release();
    }
  }
};
