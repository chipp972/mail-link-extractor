import fs from 'fs';
import { pathExists, readJson } from 'fs-extra';
import { OAuth2Client } from 'google-auth-library';
import { Credentials } from 'google-auth-library/build/src/auth/credentials';
import { google } from 'googleapis';
import { join } from 'path';
import { prompt } from 'prompts';

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.labels',
];
// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/gmail-nodejs-quickstart.json
// const TOKEN_PATH = TOKEN_DIR + 'mail-link-extractor.json';
const TOKEN_DIR = join(__dirname + '/../../../.credentials/');
const TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';

export async function getAuth(): Promise<OAuth2Client> {
  return authorize();
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(): Promise<OAuth2Client> {
  try {
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUrl = process.env.GOOGLE_REDIRECT_URL;
    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUrl,
    );

    // Check if we have previously stored a token.
    const hasToken = await pathExists(TOKEN_PATH);
    const accessToken = process.env.TOKEN;

    const token: Credentials = hasToken
      ? await readJson(TOKEN_PATH)
      : accessToken
        ? await retrieveAccessToken(accessToken, oauth2Client)
        : await getNewToken(oauth2Client);
    oauth2Client.setCredentials(token);
    return oauth2Client;
  } catch (err) {
    throw err;
  }
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 *     client.
 */
async function getNewToken(oauth2Client: OAuth2Client) {
  try {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    const response = await prompt({
      type: 'text',
      name: 'code',
      message: 'Enter the code from that page here:',
    });
    return retrieveAccessToken(response.code, oauth2Client);
  } catch (err) {
    throw err;
  }
}

async function retrieveAccessToken(code: string, oauth2Client: any) {
  return new Promise((resolve, reject) => {
    oauth2Client.getToken(code, async function(err: Error, token: string) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        reject(err);
      }
      await storeToken(token);
      resolve(token);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
async function storeToken(token: any) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), async (err: Error) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log('Token stored to ' + TOKEN_PATH);
      resolve();
    });
  });
}
