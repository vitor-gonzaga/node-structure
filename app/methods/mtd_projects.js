const Moment = require('moment');

module.exports = {
  get_all_active: (sql) => new Promise((resolve, reject) => {
    sql.query(`SELECT code_projects, name, description, actual_value, total_value, DATE_FORMAT(initial_date, '%m/%Y') AS initial_date,
    DATE_FORMAT(final_date, '%m/%Y') AS final_date  FROM PROJECTS WHERE deleted = 0`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }),
  post_new_input: (sql, req) => new Promise((resolve, reject) => {
    const ITEMS = {
      name: req.body.name,
      description: req.body.description,
      actual_value: 0,
      total_value: req.body.total_value,
      initial_date: req.body.initial_date,
      final_date: req.body.final_date,
      created: Moment().format('YYYY-MM-DD HH:mm:ss'),
      deleted: 0,
    };
    sql.query(`INSERT INTO PROJECTS
    (name, description, actual_value, total_value, initial_date, final_date, created, deleted) 
    VALUES (?,?,?,?,?,?,?,?)`, [ITEMS.name, ITEMS.description, ITEMS.actual_value, ITEMS.total_value, ITEMS.initial_date, ITEMS.final_date, ITEMS.created, ITEMS.deleted], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }),
  put_item_projects: (sql, req) => new Promise((resolve, reject) => {
    const ID = req.params.id;
    const VALUE = req.params.value;
    sql.query(`SELECT (select actual_value from PROJECTS where code_projects = ? )+ ${VALUE}  as actual_value FROM PROJECTS limit 1`, ID, (error, result) => {
      if (error) {
        reject(error);
      } else {
        const FIELDS = {
          actual_value: result[0].actual_value,
          updated: Moment().format('YYYY-MM-DD HH:mm:ss'),
        };
        sql.query('UPDATE PROJECTS SET ? WHERE code_projects = ?', [FIELDS, ID], (error2, result2) => {
          if (error2) {
            reject(error2);
          } else {
            resolve(result2);
          }
        });
      }
    });
  }),
  delete_item_projects: (sql, req) => new Promise((resolve, reject) => {
    const ID = req.params.id;
    sql.query('UPDATE PROJECTS SET deleted = 1 WHERE code_projects = ?', ID, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }),
};
