/*
 * grunt-regex-extract
 * https://github.com/mpau23/grunt-regex-extract
 *
 * Copyright (c) 2014 Miren Pau
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  grunt.registerMultiTask('regex_extract', 'Enable the user to extract all matching results of a regular expression and save them to file', function () {

var options = this.options(
    {
      regex : " ",
      matchPoints : "1"
    });

    // For each [destination : source map] in list
    this.files.forEach(function(file)
    {

      // For each source file
      var src = file.src.filter(function(filepath)
      {

        // Let me know through warning if a source doesn't exist
        if (!grunt.file.exists(filepath))
        {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        else
        {
          return true;
        }
      }).map(function(filepath)
      {
        // Read file source.
        var filestring = grunt.file.read(filepath);
        
        var re = new RegExp(options.regex, "ig");
        var match = "";
        var matches = "";
        var matchPointsArray = options.matchPoints.split(",");

        while ((match = re.exec(filestring)) !== null)
        {
          var matchstring = filepath;
          matchPointsArray.forEach(function(current)
          {
            matchstring = matchstring + ",\"" + match[current] + "\"";
          });
          matches = matches + matchstring + "\n";
          matchstring = undefined;
        }
        return matches;
      }).join("");

      // Write the destination file.
      grunt.file.write(file.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
