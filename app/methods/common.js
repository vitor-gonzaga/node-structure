const Moment = require('moment');
const fs = require('fs');

Moment.locale('pt-BR');
module.exports = {
  moment: Moment(),

  recordLog: (message) => new Promise((resolve, reject) => {
    const data = Moment();
    const logMessage = `${message} | Data: ${data}\n`;
    fs.writeFile('./logs.txt', `${logMessage}`, { enconding: 'utf-8', flag: 'a' },
      (erro) => {
        if (erro) {
          reject(erro);
        }
        // eslint-disable-next-line no-console
        resolve(console.log('Log gravado com êxito.'));
      });
  }),


};
