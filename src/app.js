/**
 * Main process
 */
var app = require('app'),
    ipc = require("electron").ipcMain,
    BrowserWindow = require('browser-window');

var mainWindow = null;
var configWindow = null;

function createConfig(p) {
    configWindow = new BrowserWindow(
        {
            x: p.xpos - 200, y: p.ypos,
            width: 400,
            height: 410,
            resizable: false,
            titleBarStyle: "hidden",
            frame: false,
            show: false
        });

    configWindow.loadURL('file://' + __dirname + '/windows/config/config.html');
    configWindow.on('closed', function () {
        configWindow = null;
    });
    
}

function createWindow() {
    mainWindow = new BrowserWindow(
        {
            x: 0, y: 0,
            width: 300,
            title: "GG-Flashcard",
            height: 420,
            alwaysOnTop: true,
            fullscreenable: false,
            resizable: false,
            titleBarStyle: "hidden",
            frame: false,
            transparent: true
        });

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/windows/main/main.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
    
    
    ipc.on('open-config', function(e, args) {
        if(!configWindow) {
            createConfig(args);
        }
        // configWindow.show();
        return (configWindow.isVisible()) ? configWindow.hide() : configWindow.show();    
    })
}

app.on('ready', createWindow);
