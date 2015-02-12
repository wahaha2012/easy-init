#!/usr/bin/env node

//load modules required
var clc = require('cli-color'),
    shelljs = require('shelljs'),
    app = require('../src/init'),
    commander = require('commander');

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

commander
    .version(pkgJson.version)
    .option('-c, --config [config]', 'configuration for project initialize, if set config "full" then will init the full version')
    .parse(process.argv);

app.init({
    config: commander.config
});