var clc = require("./colors"),
  shelljs = require("shelljs"),
  async = require("async"),
  path = require("path"),
  fs = require("fs"),
  mergePkg = require("merge-packages").default,
  spawn = require("child_process").spawn;
var currentStep = 1;
// user package.json config
var userPkg = "";

var app = {
  // init git
  initGit: function (callback) {
    console.log(clc.info(currentStep++ + ". init git"));
    try {
      fs.access(".git", fs.constants.F_OK, (err) => {
        if (err) {
          shelljs.exec("git init", {
            async: false,
          });
          console.log(clc.notice("git init successfully"));
        } else {
          console.log(clc.notice("git has been initialized."));
        }
        callback();
      });
    } catch (err) {
      callback(new Error("failed to init git"));
    }
  },

  // init package.json
  initNpm: function (callback) {
    console.log(clc.info(currentStep++ + ". start npm init"));
    fs.access("package.json", fs.constants.F_OK, (err) => {
      if (err) {
        var npm = process.platform === "win32" ? "npm.cmd" : "npm";
        var npmInit = spawn(npm, ["init"], {
          stdio: "inherit",
        });
        npmInit.on("close", function (code) {
          if (code !== 0) {
            return callback(new Error("npm init failed"));
          }
          console.log(clc.notice("npm init successed."));
          userPkg = fs.readFileSync("./package.json", "utf-8");
          callback();
        });
      } else {
        console.log(clc.notice("npm package exist."));
        userPkg = fs.readFileSync("./package.json", "utf-8");
        callback();
      }
    });
  },

  // merge package.json
  mergePackages: function (callback) {
    try {
      var resourcesPath = "/../resources/" + app.options.path + "/";
      var resPkg = fs.readFileSync(
        __dirname + resourcesPath + "package.json",
        "utf-8"
      );

      var destPkg = mergePkg(userPkg, resPkg);

      // fs.writeFileSync("./package.json", JSON.stringify(destPkg, null, 2));
      fs.writeFileSync("./package.json", destPkg);
      console.log(
        clc.info(currentStep++ + ". package.json update successfully")
      );
      callback();
    } catch (err) {
      callback(
        new Error("failed to update package.json file: \n" + err.message)
      );
    }
  },

  // add default files to project
  addProjectDefaultFiles: function (callback) {
    console.log(clc.info(currentStep++ + ". add project default files"));
    try {
      var resourcesPath = "/../resources/" + app.options.path + "/";
      shelljs.cp("-rf", __dirname + resourcesPath + ".*", "./");
      shelljs.cp("-rf", __dirname + resourcesPath + "*", "./");
      console.log(clc.notice("default files added"));
      callback();
    } catch (err) {
      callback(new Error("failed to add default files:\n" + err.message));
    }
  },

  // install dependencies
  installDependencies: function (callback) {
    console.log(clc.info(currentStep++ + ". add and install npm dependencies"));
    try {
      shelljs.exec("npm install", {
        async: false,
      });
      console.log(
        clc.notice("project npm dependencies installed successfully")
      );
      callback();
    } catch (err) {
      callback(new Error("failed to install project npm dependencies"));
    }
  },

  // finished init
  initFinished: function (callback) {
    console.log(clc.info(currentStep++ + ". project init finished!"));
    console.log("------------------------------");
    app.options.projectName && console.log("$ cd " + app.options.projectName);
    console.log("$ run `npm install` or `yarn install`");
    console.log("$ then enjoy your " + app.options.path + " project!");
    console.log("------------------------------");
    callback();
  },

  //edit gitignore file
  updateGitignore: function (callback) {
    console.log(clc.info(currentStep++ + ". update .gitignore file"));
    try {
      console.log("pwd", shelljs.pwd().toString());
      var file = path.resolve(shelljs.pwd().toString(), ".gitignore");
      //check .gitignore file
      fs.access(file, fs.constants.W_OK, (err) => {
        if (err) {
          shelljs.exec("touch .gitignore", {
            async: false,
          });
          console.log(clc.warn(".gitignore file not find in this project"));
          console.log(clc.notice(".gitignore file created"));
        }
        var fileContent = fs.readFileSync(file, {
          encoding: "utf8",
        });
        var addContent =
          "# node files\nnode_modules/\nnpm-debug.log\nlogs/\n#build files\ndist/\n";

        fileContent = fileContent + addContent;
        fs.writeFileSync(file, fileContent);
        console.log(clc.notice(".gitignore file update successfully"));
        callback();
      });
    } catch (err) {
      callback(new Error("failed to update .gitignore file: \n" + err.message));
    }
  },

  // create react app
  createReactApp: function (callback) {
    try {
      shelljs.cd("../");
      shelljs.exec("npx create-react-app " + app.options.projectName, {
        async: false,
      });
      callback();
    } catch (err) {
      callback(new Error("create react app failed`: \n" + err.message));
    }
  },

  // create vue app
  createVueApp: function (callback) {
    try {
      if (!shelljs.which("vue")) {
        console.log(
          clc.error(
            "Please install vue-cli firstly, and then run `npm install -g @vue/cli` or `yarn global add @vue/cli`"
          )
        );
        process.exit();
      } else {
        console.log(
          clc.warn(
            "Please run `vue create " +
              app.options.projectName +
              "` in command line"
          )
        );
      }
      callback();
    } catch (err) {
      callback(new Error("create vue app failed: \n" + err.message));
    }
  },
};

module.exports = {
  init: function (options) {
    app.options = options || {};

    var waterFall = [
      app.initGit, //git init

      app.updateGitignore, //update .gitignore file

      app.initNpm, //npm init

      app.addProjectDefaultFiles, //add default files to project

      app.mergePackages,

      app.initFinished, //init finished
    ];

    if (options.path === "vue") {
      waterFall = [app.createVueApp];
    } else if (options.path === "react") {
      waterFall = [app.createReactApp];
    }

    async.waterfall(waterFall, function (err, rs) {
      if (err) {
        console.log(clc.error(err.message));
        return;
      }
    });
  },
};
