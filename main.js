const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow = null;
let playWindow = null;
let taskBookWindow = null;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 482,
        height: 800,
        resizable: false,
        useContentSize: true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
        }
    });

    mainWindow.loadFile('index.html');
}

function openPlayWindow() {
    if (!playWindow) {
        playWindow = new BrowserWindow({
            width: 482,
            height: 800,
            resizable: false,
            useContentSize: true,
            webPreferences: {
                contextIsolation: false,
                nodeIntegration: true,
            }
        });

        playWindow.loadFile('playscreen.html');

        playWindow.on('closed', () => {
            playWindow = null;
        });
    }
}

function openTaskBookWindow() {
    if (!taskBookWindow) {
        taskBookWindow = new BrowserWindow({
            width: 300,
            height: 400,
            resizable: false,
            frame: false,
            alwaysOnTop: true,
            useContentSize: true,
            webPreferences: {
                contextIsolation: false,
                nodeIntegration: true,
            }
        });

        taskBookWindow.loadFile('taskbook.html');

        taskBookWindow.on('closed', () => {
            taskBookWindow = null;
            BrowserWindow.getAllWindows().forEach(win => {
                win.webContents.send('taskbook-closed');
            });
        });
    }
}

app.whenReady().then(createMainWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('open-play-window', () => {
    openPlayWindow();
});

ipcMain.on('close-play-window', () => {
    if (playWindow) {
        playWindow.close();
    }
});

ipcMain.on('open-taskbook-window', () => {
    openTaskBookWindow();
});

ipcMain.on('close-taskbook-window', () => {
    if (taskBookWindow) {
        taskBookWindow.close();
    }
});
