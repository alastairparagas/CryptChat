var ajaxLoad = require('./ajaxLoad'),
    torrent = require('./torrent');


// Bootstrap application renderer process
(function () {
    // Load the default app template and menu component
    ajaxLoad.loadTemplate("filesDrop");
    ajaxLoad.loadComponent("#filesUploadedList", 
                               "filesUploadedList", 
                               {filesUploadedList: 
                                torrent.sharedFilesList}
                              );
    
    // Whenever new torrent files are being shared, 
    // re-render the application menu component
    torrent.setSharedFilesObserver(function () {
        ajaxLoad.loadComponent("#filesUploadedList", 
                               "filesUploadedList", 
                               {filesUploadedList: 
                                torrent.sharedFilesList}
                              );
    });
}());