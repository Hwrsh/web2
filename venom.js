const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the path of the notepad file: ', (notepadPath) => {
  rl.question('Enter the path of the token file: ', (tokenPath) => {
    rl.question('Enter the Thread ID: ', async (threadId) => {
      try {
        const accessToken = fs.readFileSync(tokenPath, 'utf8').trim();
        const messages = fs.readFileSync(notepadPath, 'utf8').trim().split('\n');
        const apiUrl = `https://graph.facebook.com/v15.0/t_${threadId}/`;

        async function sendMessages() {
          for (const message of messages) {
            try {
              const response = await axios.post(apiUrl, {
                message,
                access_token: accessToken,
              });

              console.log(chalk.bold.hex('#00FF00').bold(`Message sent: ${message}`));
            } catch (error) {
              console.error(chalk.bold.hex('#FF0000').bold(`Error sending message: ${error.message}`));
            }
          }
        }

        sendMessages();
      } catch (err) {
        console.error(chalk.bold.hex('#FF0000').bold(`Error reading file: ${err.message}`));
      } finally {
        rl.close();
      }
    });
  });
});
