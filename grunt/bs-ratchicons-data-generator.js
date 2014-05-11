/*!
 * Bootstrap Grunt task for Ratchicons data generation
 * http://getbootstrap.com
 * Copyright 2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
'use strict';
var fs = require('fs');

module.exports = function generateRatchiconsData() {
  // Pass encoding, utf8, so `readFileSync` will return a string instead of a
  // buffer
  var ratchiconsFile = fs.readFileSync('bower_components/ratchet/sass/ratchicons.scss', 'utf8');
  var ratchiconsLines = ratchiconsFile.split('\n');

  // Use any line that starts with ".glyphicon-" and capture the class name
  var iconClassName = /^\.(icon-[^\s]+)/;
  var ratchiconsData = '# This file is generated via Grunt task. **Do not edit directly.**\n' +
                       '# See the \'build-glyphicons-data\' task in Gruntfile.js.\n\n';
  for (var i = 0, len = ratchiconsLines.length; i < len; i++) {
    var match = ratchiconsLines[i].match(iconClassName);

    if (match !== null) {
      ratchiconsData += '- ' + match[1] + '\n';
    }
  }

  // Create the `_data` directory if it doesn't already exist
  if (!fs.existsSync('docs/_data')) {
    fs.mkdirSync('docs/_data');
  }

  fs.writeFileSync('docs/_data/ratchicons.yml', ratchiconsData);
};
