const Moment = require('moment');

module.exports = {
  get_all_active: (sql) => new Promise((resolve, reject) => {
    sql.query(`SELECT code_regular_expenses, description, DATE_FORMAT(initial_date, '%m/%Y') AS initial_date, DATE_FORMAT(final_date, '%m/%Y') AS final_date, 
                  total_value, current_value, amount_installments, installments_paid, installments_value
              FROM REGULAR_EXPENSES WHERE active = 1 AND amount_installments <> installments_paid`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }),
  post_new_input: (sql, req) => new Promise((resolve, reject) => {
    const dateFinal = Moment(req.body.initial_date).add(req.body.amount_installments, 'M');
    const lFinalDate = Moment(dateFinal).format('YYYY-MM-DD');
    const lInstallmentsValue = req.body.total_value / req.body.amount_installments;
    const ITEMS = {
      description: req.body.description,
      active: 1,
      initial_date: req.body.initial_date,
      final_date: lFinalDate,
      total_value: req.body.total_value,
      current_value: 0,
      amount_installments: req.body.amount_installments,
      installments_paid: 0,
      installments_value: lInstallmentsValue,
    };
    sql.query(`INSERT INTO REGULAR_EXPENSES (description, active, initial_date, final_date, created, total_value, current_value, amount_installments, installments_paid, installments_value) 
    VALUES ( ?, ?, ?, ?, date(now()), ?, ?, ?, ?, ?)`, [ITEMS.description, ITEMS.active, ITEMS.initial_date, ITEMS.final_date, ITEMS.total_value, ITEMS.current_value, ITEMS.amount_installments, ITEMS.installments_paid, ITEMS.installments_value], (error, result) => {
      if (error) {
        // console.log('error: ', error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  }),
  put_item_expenses: (sql, req) => new Promise((resolve, reject) => {
    const ID = req.params.id;

    sql.query('SELECT (select installments_paid from REGULAR_EXPENSES where code_regular_expenses = ? )+ 1  as installments_paid FROM REGULAR_EXPENSES limit 1', ID, (error, result) => {
      if (error) {
        reject(error);
      } else {
        const FIELDS = {
          installments_paid: result[0].installments_paid,
          updated: Moment().format('YYYY-MM-DD HH:mm:ss'),
        };
        sql.query('UPDATE REGULAR_EXPENSES SET ? WHERE code_regular_expenses = ?', [FIELDS, ID], (error2, result2) => {
          if (error2) {
            reject(error2);
          } else {
            resolve(result2);
          }
        });
      }
    });
  }),
  delete_item_expenses: (sql, req) => new Promise((resolve, reject) => {
    const ID = req.params.id;
    sql.query('UPDATE REGULAR_EXPENSES SET active = 0 WHERE code_regular_expenses = ?', ID, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }),
};
