var remote = require('remote'),
    Tray = remote.require('tray'),
    Menu = remote.require('menu');

var ipc = require('electron').ipcRenderer;    
var path = require('path');

module.exports = {
    create: function() {
        
        var appIcon = null;
        var iconIdle = path.join('src/images/icon', '16x16.png');
        appIcon = new Tray(iconIdle);
        
        appIcon.setToolTip('This is my application.');
        appIcon.on('click',function(e, bounds) {
            console.log('DEBUG bounds ', bounds.x);
            ipc.send('open-config', {xpos: bounds.x, ypos: bounds.y});
        });
    }
};
