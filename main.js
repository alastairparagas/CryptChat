var electron = require('electron'),
    
    CryptChatApp = electron.app,
    AppWindow = electron.BrowserWindow,
    
    /* 
        Keep reference to main App window to prevent 
        automatic garbage collection.
    */
    mainAppWindow = null;


CryptChatApp.on('window-all-closed', function() {
    if (process.platform == 'darwin') {
        CryptChatApp.quit();
    }
});

CryptChatApp.on('ready', function() {
    mainAppWindow = new AppWindow({width: 800, height: 600});
    mainAppWindow.loadURL('file://' + __dirname + '/ui/index.html');
    mainAppWindow.on('closed', function() {
        mainAppWindow = null;
    });
});