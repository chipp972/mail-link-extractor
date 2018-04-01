import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { createServer, Server } from 'http';
import { getAuth } from './google/auth';
import { findLinksInMessageList } from './google/gmail/link';
import { getMessageList } from './google/gmail/message';
import { initPocketAuth } from './pocket/auth';

/**
 * Lists the messages in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listMessageLinks(): Promise<string[]> {
  try {
    const auth: OAuth2Client = await getAuth();
    const gmail = google.gmail({ version: 'v1', auth });
    const messages = await getMessageList({
      gmail,
      q: 'from:medium|quincy',
      maxResults: 10,
    });
    const links: string[] = findLinksInMessageList(messages);
    return links;
  } catch (err) {
    throw err;
  }
}

/**
 * Handle server errors
 * @param {Server} server
 * @param {LoggerInstance} logger
 * @return {void}
 */
function handleServerError(server: Server) {
  server.on('error', (err: any) => {
    if (err.syscall !== 'listen') {
      console.error(err.message);
      throw err;
    }

    const bind = `Port 5000`;

    switch (err.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        console.error(err.message);
        throw err;
    }
  });
}

const cleanExit = () => async () => {
  console.info('Server is down');
  process.exit(0);
};

const onListening = (server: Server) => () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.info(`Server Listening on ${bind}`);
  console.info(`Process pid is ${process.pid}`);
};

(async () => {
  try {
    const links: string[] = await listMessageLinks();
    console.log(links.length);

    const app = express();
    const server = createServer(app);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(
      session({
        secret: process.env.EXPRESS_SESSION_SECRET || 'pocket-test-app',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: true },
      }),
    );

    initPocketAuth(app);

    handleServerError(server);
    process.once('SIGINT', cleanExit());
    process.once('SIGTERM', cleanExit());
    server.once('listening', onListening(server));

    server.listen(5000);
  } catch (err) {
    console.error(err);
  }
})();
