const { google } = require('googleapis');

const CLIENT_ID = process.env.OAUTH_CLIENT_ID || '964686734006-97v1ncvk2pra1ain7kecgbgnsqmjkqpm.apps.googleusercontent.com';
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET || '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';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'http://localhost:8080'
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/gmail.send'],
});

console.log('Authorize this app by visiting this url:', authUrl);
console.log('After authorization, paste the code here:');

process.stdin.on('data', (data) => {
  const code = data.toString().trim();
  oauth2Client.getToken(code, (err, token) => {
    if (err) {
      console.error('Error getting token:', err);
      return;
    }
    console.log('Refresh token:', token.refresh_token);
    console.log('Access token:', token.access_token);
    console.log('Token expires in:', token.expiry_date);
    process.exit();
  });
});
