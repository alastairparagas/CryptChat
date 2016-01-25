/**
* A module that exposes a bunch of methods to set, get and remove 
*   data to the application that should be made persistent
*/
var appData = localStorage.getItem('appData') || {}, 
    appDataMeta = localStorage.getItem('appDataMeta') || {};


function set(key, value) {
    if (typeof value === "function") {
        throw new Error("Functions cannot be stored.");
    }

    appData[key] = value;
    appDataMeta[key] = typeof value;
    
    localStorage.setItem('appData', JSON.stringify(appData));
    localStorage.setItem('appDataMeta', JSON.stringify(appDataMeta));
}

function get(key) {
    if (appDataMeta[key] === "object") {
        return JSON.parse(appData[key]);
    }
    return appData[key];
}

function remove(key) {
    delete appData[key];
    delete appDataMeta[key];
    localStorage.setItem('appData', appData);
    localStorage.setItem('appDataMeta', appDataMeta);
}

module.exports = exports = {
    set: set,
    get: get,
    remove: remove
};