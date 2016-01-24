/**
* Loads an EJS file, given a template file name and a binding 
*   data object
* @param string domElement - DOM element to inject EJS file compiled 
*   contents into.
* @param string templateFile - Template File Name (with Path relative 
*   to index.html).
* @param object templateData - Template Data to bind to template
* @returns Promise Compiled Template String
*/
var $ = require('jquery'),
    ejs = require('ejs');

function loadEjsFileAtDom(domElement, templateFile, templateData) {
    
    if (typeof templateData !== "object") {
        templateData = {};
    }
    
    function promiseExecutor(resolve, reject) {
        if (!domElement) {
            throw new Error("No provided DOM element!");
        }
        if (!templateFile || typeof templateFile !== "string") {
            throw new Error("No provided template file!");
        }
        
        $.ajax({
            url: templateFile,
            type: 'get',
            success: function (templateString) {
                var compiledString = ejs.render(templateString, 
                                                templateData);
                
                $(domElement).html(compiledString);
                resolve(compiledString);
            },
            error: function (jqXhr, errorString, errorObject) {
                if (errorObject instanceof Error) {
                    throw errorObject;
                }
                
                throw new Error(errorString);
            }
        });
    }
    
    return new Promise(promiseExecutor);
}

function loadTemplate(templateFile, templateData) {
    return loadEjsFileAtDom("#pageCanvas", 
                            "templates/" + templateFile + ".ejs", 
                            templateData);
}
function loadComponent(domElement, templateFile, templateData) {
    return loadEjsFileAtDom(domElement, 
                            "components/" + templateFile + ".ejs", 
                            templateData);
}

module.exports = exports = {
    loadEjsFileAtDom: loadEjsFileAtDom,
    loadTemplate: loadTemplate,
    loadComponent: loadComponent
};