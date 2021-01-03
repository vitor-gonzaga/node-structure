/* eslint-disable no-console */
/* eslint-disable camelcase */
const express = require('express');
const controller_ping = require('../controllers/ctrl_ping');
const controller_users = require('../controllers/ctrl_users');
const controller_months_balance = require('../controllers/ctrl_months_balance');
const controller_expenses = require('../controllers/ctrl_expenses');
const controller_projects = require('../controllers/ctrl_projects');

const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/ping', controller_ping.Ping);

router.get('/getMonthBalance', controller_months_balance.actual_month_get_all);
router.get('/getEditMonthBalance/:id', controller_months_balance.get_item_month_edit);
router.post('/postMonthBalance', controller_months_balance.post_new_input);
router.put('/putMonthBalance', controller_months_balance.put_item_month_balance);
router.delete('/deleteMonthBalance/:id', controller_months_balance.delete_item);

router.get('/getExpenses', controller_expenses.get_all_active);
router.post('/postExpenses', controller_expenses.post_new_input_expenses);
router.delete('/putExpenses/:id', controller_expenses.put_item_expenses);
router.delete('/deleteExpenses/:id', controller_expenses.delete_item_expenses);

router.get('/getProjects', controller_projects.get_all_active);
router.post('/postProjects', controller_projects.post_new_input_projects);
router.delete('/putProjects/:id/:value', controller_projects.put_item_projects);
router.delete('/deleteProjects/:id', controller_projects.delete_item_projects);

router.get('/user_get_all', controller_users.user_get_all);
router.post('/user_get_by_id', controller_users.user_get_by_id);
router.post('/user_add', controller_users.user_add);
router.put('/user_update', controller_users.user_update);
router.put('/user_delete', controller_users.user_delete);

module.exports = router;
