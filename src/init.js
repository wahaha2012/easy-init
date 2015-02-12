//load modules required
var clc = require('cli-color'),
    shelljs = require('shelljs'),
    async = require('async'),
    path = require('path'),
    fs = require('fs'),
    spawn = require('child_process').spawn;

//define message color
var error = clc.red.bold,
    warn = clc.yellow,
    notice = clc.cyan
    info = clc.magenta;

var currentStep = 1;

//project methods
var app = {
    //npm init
    initNpm: function(callback){
        console.log(info(currentStep++ +'. start npm init'));
        var npm = process.platform === "win32" ? 'npm.cmd' : 'npm';
        var npmInit = spawn(npm, ['init'], {
            stdio: 'inherit'
        });

        npmInit.on('close', function(code) {
            if (code !== 0) {
                return callback(new Error('npm init failed'));
            }

            console.log(notice('npm init successed.'));
            callback();
        });
    },

    //create project directories
    createDirs: function(callback){
        console.log(info(currentStep++ +'. create project directories'));
        try {
            shelljs.mkdir('-p', ['less', 'js', 'css', 'html']);

            if(app.options.config == 'full'){
                shelljs.mkdir('-p', ['api-php']);
            }

            console.log(notice('create project directories successfully'));
            callback();
        } catch (err) {
            callback(new Error('failed to create directories: \n' + err.message));
        }
    },

    //add project npm dependencies
    addNpmDependencies: function(callback){
        console.log(info(currentStep++ +'. add and install npm dependencies'));
        try {
            shelljs.exec('npm install gulp --save-dev', {
                async: false
            });
            shelljs.exec('npm install gulp-less --save-dev', {
                async: false
            });

            if(app.options.config == 'full'){
                shelljs.exec('npm install gulp-htmlincluder --save-dev', {
                    async: false
                });
                shelljs.exec('npm install gulp-hash-creator --save-dev', {
                    async: false
                });
                shelljs.exec('npm install gulp-cssmin --save-dev', {
                    async: false
                });
                shelljs.exec('npm install gulp-uglify --save-dev', {
                    async: false
                });
            }

            console.log(notice('project npm dependencies installed successfully'));
            callback();
        } catch (err) {
            callback(new Error('failed to install project npm dependencies'));
        }
    },

    //add default files to project
    addProjectDefaultFiles: function(callback){
        console.log(info(currentStep++ +'. add project default files'));
        try {
            //simple init copy
            shelljs.cp('-rf', __dirname + '/../resources/html/index.html', './html/');
            shelljs.cp('-rf', __dirname + '/../resources/less/style.less', './less/');
            shelljs.cp('-rf', __dirname + '/../resources/less/comm/functions.less', './less/comm/');
            shelljs.cp('-rf', __dirname + '/../resources/less/comm/cssreset.less', './less/comm/');
            shelljs.cp(__dirname + '/../resources/gulpfile-simple.js', './gulpfile.js');

            if(app.options.config=='full'){
                shelljs.cp('-rf', __dirname + '/../resources/*', './');
            }
            console.log(notice('default files added'));
            callback();
        } catch (err) {
            callback(new Error('failed to add default files:\n' + err.message));
        }
    },

    //update folder for full
    updateDefaultFiles: function(callback){
        try{
            if(app.options.config == 'full'){
                shelljs.rm('./gulpfile-simple.js');
                shelljs.mv('-f', './html/index-include.html','./html/index.html');
            }
            callback();
        }catch(err){
            callback(new Error('failed to update default files:\n' + err.message));
        }
    },

    //edit gitignore file
    updateGitignore: function(callback){
        console.log(info(currentStep++ +'. update .gitignore file'));
        try {
            var file = path.resolve(shelljs.pwd(), '.gitignore');

            //check .gitignore file
            fs.exists(file, function(exist){  
                if(!exist){
                    shelljs.exec('touch .gitignore', {
                        async: false
                    });
                    console.log(warn('.gitignore file not find in this project'));
                    console.log(notice('.gitignore file created'));
                }

                var fileContent = fs.readFileSync(file, {
                    encoding: 'utf8'
                });

                var addContent = '# node files\nnode_modules/\nnpm-debug.log\nlogs/';

                if(app.options.config=='full'){
                    addContent += '\n#build files\ndist/\n'
                }
                fileContent = fileContent + addContent;

                fs.writeFileSync(file, fileContent);

                console.log(notice('.gitignore file update successfully'));
                callback();
            });
        } catch (err) {
            callback(new Error('failed to update .gitignore file: \n' + err.message));
        }
    },

    //finished init
    initFinished: function(callback){
        console.log(info(currentStep++ +'. project init finished!'));

        console.log('***************************');
        console.log('*   Enjoy your project!   *');
        console.log('***************************');
        callback();
    }
};

module.exports = {
    init: function(options){
        app.options = options || {};

        async
            .waterfall([
                //npm init
                app.initNpm,

                //init project npm dependencies
                app.addNpmDependencies,

                //update .gitignore file
                app.updateGitignore,

                //create directories
                app.createDirs,

                //add default files to project
                app.addProjectDefaultFiles,

                //update default files
                app.updateDefaultFiles,

                //init finished
                app.initFinished
            ], function(err, rs) {
                if (err) {
                    console.log(error(err.message));
                    return;
                }
            });
    }
};