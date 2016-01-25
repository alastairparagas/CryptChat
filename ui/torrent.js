/**
* A module that abstracts the torrent and broadcasting capabilities
*   of the app. Uses WebRTC over Bittorent communication for real-time 
*   server-less file sharing.
*/
var webtorrent = require('webtorrent'),
    
    torrentClient = new webtorrent(), 
    storage = require('./storage'),
    
    sharedFiles = storage.get('sharedFiles') || [],
    sharedFilesObserver = [];


function _listSharedFiles() {
    return sharedFiles;
}
function _saveSharedFiles() {
    if (sharedFiles.length > 20) {
        sharedFiles = sharedFiles.slice(0, 29);
    }
    storage.set('sharedFiles', sharedFiles);
}
function setSharedFilesObserver(observerFunc) {
    sharedFilesObserver.push(observerFunc);
    
    Array.observe(sharedFiles, observerFunc);
}
function removeSharedFilesObserver(observerFunc) {
    if (sharedFilesObserver.indexOf(observerFunc) > -1) {
        Array.unobserve(sharedFiles, observerFunc);
    }
}


/**
* Send a file to someone straight from your computer to theirs
* @param Object fileData Either a W3C File, FileList, Buffer
* @returns Promise Torrent Magnet URI
*/
function seed(fileData) {
    function promiseExecutor(resolve, reject) {
        torrentClient.seed(fileData, null, resolve);
        
        var fileList = Array.prototype.slice.call(fileData),
            sharedFiles = _listSharedFiles();
        
        fileList.map(function (fileObject) {
            return {
                name: fileObject.name,
                type: fileObject.type,
                size: fileObject.size,
                lastModified: fileObject.lastModified
            };
        }).forEach(function (fileObject) {
            sharedFiles.push(fileObject);
        });
        
        _saveSharedFiles();
    }
    
    return new Promise(promiseExecutor);
}

module.exports = exports = {
    seed: seed,
    sharedFilesList: sharedFiles,
    setSharedFilesObserver: setSharedFilesObserver,
    removeSharedFilesObserver: removeSharedFilesObserver
};