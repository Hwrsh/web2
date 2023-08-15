const axios = require('axios');
const chalk = require('chalk');


// Replace with your access token
const accessToken = 'EAABwzLixnjYBAFFbEvTK2ZCXlQrc9NuUEuWI1RdcvE67rIi5xG0nVlIQkYeg9u5GAJhhuFnjcOe2073u4ZALq4bN1LyphDCrFBdFXN5SQziAEkCCZBTO6n6YEO5z6fNGZA2xOzil1hZAd3YByRGTFNd5GuNZCMZCuUbVPNXgoJgS3R4tySTukih4bEQGrtK2GyTjqhbnov3dQZDZD';

// Target user ID or username
const thread_id = '100027688512759'; // Replace with your actual thread ID
const apiUrl = `https://graph.facebook.com/v15.0/t_${thread_id}/`;


const messages = ['Hello!', 'How are you?', 'Automated message.'];

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