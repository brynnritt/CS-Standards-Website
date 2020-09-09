const path = require('path');
module.exports = pathToMimeType;
/** @function pathToMimeType 
 * Converts the supplied file path string to 
 * the corresponding MIME-TYPE 
 * @param {string} filePath - the file path
 * @returns {string} the corresponding MIME-TYPE
 */
function pathToMimeType(filePath) {
  // isolate the extension 
  var extension = path.extname(filePath);
  
  // use switch statement to return appropriate MIME type
  switch(extension) {
    case ".html": 
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    case ".json":
      return "application/json"
    default:
      return "application/octet-stream";
  }
}