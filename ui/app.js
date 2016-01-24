var ajaxLoad = require('./ajaxLoad'),
    storage = require('./storage'),
    torrent = require('./torrent');


// Bootstrap application
(function () {
    ajaxLoad.loadTemplate("filesDrop");
    
    torrent.setSharedFilesObserver(function () {
        ajaxLoad.loadComponent("#filesUploadedList", 
                               "filesUploadedList", 
                               {filesUploadedList: 
                                torrent.sharedFilesList}
                              );
    });
}());