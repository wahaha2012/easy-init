//load modules required
var clc = require('./colors'),
  shelljs = require('shelljs'),
  async = require('async'),
  path = require('path'),
  fs = require('fs'),
  spawn = require('child_process').spawn;
var currentStep = 1;
var app = {
  //npm init
  initNpm: function(callback) {
    console.log(clc.info(currentStep++ + '. start npm init'));
    var npm = process.platform === "win32" ? 'npm.cmd' : 'npm';
    var npmInit = spawn(npm, ['init'], {
      stdio: 'inherit'
    });
    npmInit.on('close', function(code) {
      if (code !== 0) {
        return callback(new Error('npm init failed'));
      }
      console.log(clc.notice('npm init successed.'));
      callback();
    });
  },
  //add default files to project
  addProjectDefaultFiles: function(callback) {
    console.log(clc.info(currentStep++ + '. add project default files'));
    try {
      var resourcesPath = '/../resources/' + app.options.path + '/';
      shelljs.cp('-rf', __dirname + resourcesPath + '*', './');
      console.log(clc.notice('default files added'));
      callback();
    } catch (err) {
      callback(new Error('failed to add default files:\n' + err.message));
    }
  },
  //add project npm dependencies
  addNpmDependencies: function(callback) {
    console.log(clc.info(currentStep++ + '. add and install npm dependencies'));
    try {
      shelljs.exec('npm install', {
        async: false
      });
      console.log(clc.notice('project npm dependencies installed successfully'));
      callback();
    } catch (err) {
      callback(new Error('failed to install project npm dependencies'));
    }
  },
  //finished init
  initFinished: function(callback) {
    console.log(clc.info(currentStep++ + '. project init finished!'));
    console.log('***************************');
    console.log('*   Enjoy your ' + app.options.path + ' project!   *');
    console.log('***************************');
    callback();
  },

  //create project directories
  createDirs: function(callback) {
    console.log(clc.info(currentStep++ + '. create project directories'));
    try {
      shelljs.mkdir('-p', ['less', 'js', 'css', 'html']);
      if (app.options.config == 'full') {
        shelljs.mkdir('-p', ['api-php']);
      }
      console.log(clc.notice('create project directories successfully'));
      callback();
    } catch (err) {
      callback(new Error('failed to create directories: \n' + err.message));
    }
  },
  //add project npm dependencies
  addNormalNpmDependencies: function(callback) {
    console.log(clc.info(currentStep++ + '. add and install npm dependencies'));
    try {
      shelljs.exec('npm install gulp --save-dev', {
        async: false
      });
      shelljs.exec('npm install gulp-less --save-dev', {
        async: false
      });
      if (app.options.config == 'full') {
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
      console.log(clc.notice('project npm dependencies installed successfully'));
      callback();
    } catch (err) {
      callback(new Error('failed to install project npm dependencies'));
    }
  },
  //add default files to project
  addNormalProjectDefaultFiles: function(callback) {
    console.log(clc.info(currentStep++ + '. add project default files'));
    try {
      var resourcesPath = '/../resources/'+app.options.path+'/';
      //simple init copy
      shelljs.cp('-rf', __dirname + resourcesPath + 'html/index.html', './html/');
      shelljs.cp('-rf', __dirname + resourcesPath + 'less/style.less', './less/');
      shelljs.cp('-rf', __dirname + resourcesPath + 'less/comm/functions.less', './less/comm/');
      shelljs.cp('-rf', __dirname + resourcesPath + 'less/comm/cssreset.less', './less/comm/');
      shelljs.cp(__dirname + resourcesPath + 'gulpfile-simple.js', './gulpfile.js');
      if (app.options.config == 'full') {
        shelljs.cp('-rf', __dirname + resourcesPath + '*', './');
      }
      console.log(clc.notice('default files added'));
      callback();
    } catch (err) {
      callback(new Error('failed to add default files:\n' + err.message));
    }
  },
  //update folder for full
  updateDefaultFiles: function(callback) {
    try {
      if (app.options.config == 'full') {
        shelljs.rm('./gulpfile-simple.js');
        shelljs.mv('-f', './html/index-include.html', './html/index.html');
      }
      callback();
    } catch (err) {
      callback(new Error('failed to update default files:\n' + err.message));
    }
  },
  //edit gitignore file
  updateGitignore: function(callback) {
    console.log(clc.info(currentStep++ + '. update .gitignore file'));
    try {
      var file = path.resolve(shelljs.pwd(), '.gitignore');
      //check .gitignore file
      fs.exists(file, function(exist) {
        if (!exist) {
          shelljs.exec('touch .gitignore', {
            async: false
          });
          console.log(clc.warn('.gitignore file not find in this project'));
          console.log(clc.notice('.gitignore file created'));
        }
        var fileContent = fs.readFileSync(file, {
          encoding: 'utf8'
        });
        var addContent = '# node files\nnode_modules/\nnpm-debug.log\nlogs/';
        if (app.options.config == 'full') {
          addContent += '\n#build files\ndist/\n'
        }
        fileContent = fileContent + addContent;
        fs.writeFileSync(file, fileContent);
        console.log(clc.notice('.gitignore file update successfully'));
        callback();
      });
    } catch (err) {
      callback(new Error('failed to update .gitignore file: \n' + err.message));
    }
  },
};

module.exports = {
  init: function(options) {
    app.options = options || {};

    console.log(options);
    var normalWaterFall = [
      app.initNpm, //npm init

      app.addNormalNpmDependencies, //init project npm dependencies
      
      app.updateGitignore, //update .gitignore file

      app.createDirs, //create directories

      app.addNormalProjectDefaultFiles, //add default files to project

      app.updateDefaultFiles, //update default files

      app.initFinished //init finished
    ];

    var commonWaterFall = [
      app.addProjectDefaultFiles, //add default files to project
      
      app.initNpm, //npm init
      
      // app.addNpmDependencies, //init project npm dependencies
      
      app.initFinished //init finished
    ];

    async.waterfall(options.path === 'normal' ? normalWaterFall : commonWaterFall, function(err, rs) {
      if (err) {
        console.log(clc.error(err.message));
        return;
      }
    });
  }
};