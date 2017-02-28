#! /usr/bin/env node
// var async = require("async");
var chalk = require("chalk");
var fs = require("fs-extra");
var minimist = require("minimist");
var path = require("path");

var packageJSON = require(path.join(__dirname, 'package.json'));
var args = minimist(process.argv.slice(2));
var codes;

loadCodes(processCommand);

function loadCodes(cb) {
  if(!packageJSON.codes) onError(`No codes file defined in ${path.join(__dirname, 'package.json')}`);
  fs.readJSON(packageJSON.codes, function(error, file) {
    if(error) {
      onError(error);
    }
    codes = file;
    cb();
  });
}

function processCommand() {
  switch(args._[0]) {
    case "map":
      mapCode(args._[1]);
      break;
    case "find":
      searchProjects(args._[1]);
      break;
    default:
      console.log(`Unknown command: "${command}"`);
      break;
  }
}

function mapCode(code) {
  logProject(lookupProject(code));
}

function lookupProject(code) {
  for(var i = 0, count = codes.length; i < count; i++) {
    var data = codes[i];
    if(code.toLowerCase().trim() === data.code.toLowerCase().trim()) {
      return data;
    }
    if(code.toLowerCase().trim() === data.oldCode.toLowerCase().trim()) {
      return data;
    }
  }
  onError(`${code} not found`);
}

function searchProjects(search) {
  for(var i = 0, count = codes.length; i < count; i++) {
    var data = codes[i];
    if(data.name.toLowerCase().trim().search(new RegExp(search)) > -1) {
      logProject(data);
    }
  }
}

/**
* Log shortcuts
*/

function onError(error) {
  console.log(`${chalk.red('Error')}: ${error}`);
  process.exit(1);
}

function logProject(project) {
  console.log(`${project.code.trim()} :: ${project.name.trim()}`);
}
