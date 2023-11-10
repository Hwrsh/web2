const fs = require('fs');
const prompt = require('prompt');
const login = require('facebook-chat-api');
const chalk = require('chalk');

prompt.start();

prompt.get(['appstatePath', 'targetID', 'stickerIDsPath', 'timer'], function (err, result) {
  if (err) { return onErr(err); }

  const appState = JSON.parse(fs.readFileSync(result.appstatePath, 'utf8'));
  const stickerIDs = fs.readFileSync(result.stickerIDsPath, 'utf8').split('\n').map(line => line.trim());

  login({ appState }, (err, api) => {
    if (err) return console.error(err);

    let currentIndex = 0;

    const sendSticker = () => {
      const stickerID = stickerIDs[currentIndex];
      if (!stickerID) {
        console.log(chalk.bold.hex('#FF0000').bold('No more stickers to send.'));
        return;
      }

      api.sendMessage({
        sticker: stickerID
      }, result.targetID, (err) => {
        if (err) {
          console.error(chalk.bold.hex('#FF0000').bold(`Error sending sticker: ${err.message}`));
        } else {
          const now = new Date();
          const formattedTime = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true });
          console.log(chalk.bold.hex('#00FF00').bold(`--> Your Convo/Inbox Link  :-- ${result.targetID}`));
          console.log(chalk.bold.hex('#00FF00').bold(`--> V3N0M W4NT3D RULL3X H3R3 :D || Date & Time ::- ${formattedTime}`));
          console.log(chalk.bold.hex('#00FF00').bold(`--> Sticker Successfully Sent By HwRsH Rajput :D ::\n`));
        }
        currentIndex = (currentIndex + 1) % stickerIDs.length;
      });
    };

    setInterval(sendSticker, `${result.timer}000`);
  });
});

function onErr(err) {
  console.log(err);
  return 1;
}

function onErr(err) {
  console.log(err);
  return 1;
}

process.on('unhandledRejection', (err, p) => {});