let fs = require('fs');

exports.subject = "Захватите теплую одежду";

let template = fs.readFileSync('./var/body.txt', 'utf8');

module.exports.prepareText = function(name) {
  return template.replace(/%name%/g, name);
}

module.exports.prepareHtml = function(name) {
  return this.prepareText(name).replace(/\r?\n/g, '<br />');
}
