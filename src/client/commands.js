import execa from 'execa';
import { app } from 'electron';

function startOwner(password) {
  return execa(
    './bin/grin-wallet',
    ['-p', password, 'owner_api'],
    { buffer: false }
  );
}

function startServer() {
  return execa(
    './bin/grin',
    ['server', '--config_file', `${app.getPath('home')}/.wimble/main/grin-server.toml`, 'run'],
    { buffer: false }
  );
}

function stopOwner(process) {
}

export default {
  startOwner,
  startServer,
};
