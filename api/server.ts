import { Application } from 'express';
import { createServer, Server } from 'http';

function getBind(server: Server) {
  const addr = server.address();
  return typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
}

/**
 * Handle server errors
 * @param {Server} server
 * @return {void}
 */
export function onError(server: Server, lib: Lib) {
  return (err: any) => {
    if (err.syscall !== 'listen') {
      lib.logger.error(err.message);
      throw err;
    }

    const bind = getBind(server);
    switch (err.code) {
      case 'EACCES':
        lib.logger.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        lib.logger.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        lib.logger.error(err.message);
        throw err;
    }
  };
}

export const onExit = (lib: Lib) => () => {
  lib.logger.info('Server is down');
  process.exit(0);
};

export const onListening = (server: Server, lib: Lib) => () => {
  const bind = getBind(server);
  lib.logger.info(`Server Listening on ${bind}`);
  lib.logger.info(`Process pid is ${process.pid}`);
};

export function startServer(app: Application, env: Env, lib: Lib) {
  try {
    const server = createServer(app);

    server.on('error', onError(server, lib));
    server.once('listening', onListening(server, lib));
    process.once('SIGINT', onExit(lib));
    process.once('SIGTERM', onExit(lib));

    server.listen(env.port);
    return server;
  } catch (err) {
    lib.logger.error(err);
    throw err;
  }
}

export default startServer;
