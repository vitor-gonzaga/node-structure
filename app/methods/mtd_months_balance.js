/* eslint-disable no-param-reassign */
const { moment } = require('../methods/common');


module.exports = {
  get_actual_month_all: (sql) => new Promise((resolve, reject) => {
    sql.query('SELECT * FROM MONTHS_BALANCE WHERE MONTH(created) = ? AND deleted = 0', moment.format('M'), (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }),
  get_item_month_edit: (sql, req) => new Promise((resolve, reject) => {
    const ID = req.params.id;
    sql.query('SELECT * FROM MONTHS_BALANCE WHERE code_months_balance = ?', ID, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }),
  post_new_input_month_balance: (sql, req) => new Promise((resolve, reject) => {
    const ITEMS = {
      type: req.body.type,
      description: req.body.description,
      value: req.body.value,
      status: req.body.status,
    };
    sql.query(`INSERT INTO MONTHS_BALANCE (type, description, value, status, created, updated) 
    VALUES ( ?, ?, ?, ?, date(now()), date(now()))`, [ITEMS.type, ITEMS.description, ITEMS.value, ITEMS.status], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }),
  put_item_month_balance: (sql, req) => new Promise((resolve, reject) => {
    const ID = req.body.code_months_balance;
    const FIELDS = {
      type: req.body.typeEdit,
      description: req.body.descriptionEdit,
      value: req.body.valueEdit,
      status: req.body.statusEdit,
      updated: moment.format('YYYY-MM-DD HH:mm:ss'),
    };
    sql.query('UPDATE MONTHS_BALANCE SET ? WHERE code_months_balance = ?', [FIELDS, ID], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }),
  delete_item_month_balance: (sql, req) => new Promise((resolve, reject) => {
    const ID = req.params.id;
    sql.query('UPDATE MONTHS_BALANCE SET deleted = 1 WHERE code_months_balance = ?', ID, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }),
  treatment_result: (result) => new Promise((resolve, reject) => {
    try {
      const forloop = result.length;
      for (let i = 0; i < forloop; i += 1) {
        if (result[i].type === 1) {
          result[i].type = 'Entrada';
        } else {
          result[i].type = 'Saída';
        }

        if (result[i].status === 1) {
          result[i].status = 'Aberto';
        } else {
          result[i].status = 'Fechado';
        }
      }
      resolve(result);
    } catch (error) {
      reject(error);
    }
  }),
};
