#!/usr/bin/env node

//load modules required
var clc = require('cli-color'),
    shelljs = require('shelljs'),
    initProject = require('../src/init');

//package json config
var pkgJson = require('../package.json');

//define message colors
var error = clc.red.bold,
    notice = clc.cyan;

//check user environment
if (!shelljs.which('git')) {
    console.log(error('Please install git commond tools first.\nDownload link: http://git-scm.com/download/'));
    process.exit();
}

if (!shelljs.which('gulp')) {
    console.log(error('Please install gulp first. try') + notice('npm install -g gulp'));
    process.exit();
}

var mod = {
    help: function() {
        console.log('Usage: easy-init [options]\n');
        console.log('Options:\n');
        console.log('  -h, --help', 'help doc');
        console.log('  -v, --version', 'easy-init version');
    },
    version: function() {
        console.log(pkgJson.version);
    }
};

//use input arguments
var args = process.argv;
var firstArg = args[2];
switch (firstArg) {
    case '-h':
    case '--help':
    case 'help':
        mod.help();
        break;
    case '-v':
    case '--version':
        mod.version();
        break;
    default:
        initProject();
        break;
}