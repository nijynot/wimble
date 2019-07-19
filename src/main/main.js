const { app, BrowserWindow, dialog, ipcMain, remote } = require('electron');
import grin from 'client/grin';

let mainWindow;
let grinServer;
let grinWallet;

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

ipcMain.on('start-owner', async (e, password) => {
  try {
    // Try if `owner_api` is already running, if it is, login directly.
    const status = await grin.wallet.status();
    if (status) {
      loginTimeout = setTimeout(() => {
        mainWindow.webContents.send('login', true);
      }, 500);
    }
  } catch (e) {
    if (password) {
      let loginTimeout;
      grinWallet = grin.commands.startOwner(password);

      // If `grin-wallet owner_api` errors out, try to kill `grinWallet`
      // if it exists and stop the login transition.
      grinWallet.all.on('data', (data) => {
        console.error(data.toString('utf8'));
        clearTimeout(loginTimeout);
        grinWallet.kill('SIGTERM', { forceKillAfterTimeout: 2000 });
        mainWindow.webContents.send('login', false);
      });

      // Only login after 500 ms to check if `owner_api` starts.
      loginTimeout = setTimeout(() => {
        mainWindow.webContents.send('login', true);
      }, 500);
    }
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  grinServer = grin.commands.startServer();
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
