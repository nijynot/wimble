import path from 'path';
import fs from 'fs-extra';
const { app, BrowserWindow, dialog, ipcMain, remote } = require('electron');
import toml from '@iarna/toml';
import config from 'utils/config';

import grin from 'client/grin';

let mainWindow;
let grinServer;
let grinWallet;

require('./menu.js');

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 375,
    height: 812,
    backgroundColor: '#f2f2f2',
    webPreferences: {
      nodeIntegration: true,
    },
    minWidth: 375,
    maxWidth: 900,
    minHeight: 812,
    useContentSize: true,
    titleBarStyle: 'hidden',
    // autoHideMenuBar: true,
    frame: (process.platform === 'darwin') ? false : true,
    icon: path.join(__dirname, 'assets/wimble.png'),
  });

  // Load index.html
  mainWindow.loadFile('./src/main/index.html');

  mainWindow.on('close', () => {
    if (grinWallet) {
      grinWallet.kill('SIGTERM', { forceKillAfterTimeout: 2000 });
    }

    if (grinServer) {
      grinServer.kill('SIGTERM', { forceKillAfterTimeout: 2000 });
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

ipcMain.on('start-owner', async (e, password, redirect = true) => {
  if (password) {
    let loginTimeout;
    grinWallet = grin.commands.startOwner(password);

    // Only login after 500 ms to check if `owner_api` starts.
    loginTimeout = setTimeout(() => {
      mainWindow.webContents.send('login', true, redirect);
    }, 500);

    // If `grin-wallet owner_api` errors out, stop `loginTimeout` and
    // kill `grin-wallet`.
    grinWallet.all.on('data', (data) => {
      console.error(data.toString('utf8'));
      if (data.toString('utf8') === 'Invalid Arguments: Error decrypting wallet seed (check provided password)\n') {
        mainWindow.webContents.send('toast', {
          text: `Failed to decrypt wallet seed, retry with another password.`,
          className: 'error',
        });
      } else {
        mainWindow.webContents.send('toast', {
          text: `Error: Could not start \`grin-wallet\`.`,
          className: 'error',
        });
      }
      clearTimeout(loginTimeout);
      grinWallet.kill('SIGTERM', { forceKillAfterTimeout: 2000 });
      mainWindow.webContents.send('login', false);
    });
  } else {
    mainWindow.webContents.send('toast', {
      text: `Error: Could not start \`grin-wallet\`.`,
      className: 'error',
    });
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  if (!fs.pathExistsSync(path.resolve(__dirname, 'grin-server.toml'))) {
    fs.outputFileSync(
      path.resolve(__dirname, 'grin-server.toml'),
      toml.stringify(config.SERVER)
    );
  }

  if (!fs.pathExistsSync(path.resolve(__dirname, 'grin-wallet.toml'))) {
    fs.outputFileSync(
      path.resolve(__dirname, 'grin-wallet.toml'),
      toml.stringify(config.WALLET)
    );
  }

  createWindow();
  grinServer = grin.commands.startServer();

  grinServer.all.on('data', (data) => {
    const output = data.toString('utf8');
    if (output.includes('Grin server started.')) {
      mainWindow.webContents.send('server-started', true);
    }
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
    grinServer = grin.commands.startServer();
  }
});
