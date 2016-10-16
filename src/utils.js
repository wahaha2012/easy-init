var fs = require('fs');

module.exports = {
  isEmptyDir: function(path) {
    try {
      var stat = fs.statSync(path);
      // console.log(stat);
    } catch (e) {
      // console.log(e);
      return true;
    }
    if (stat.isDirectory()) {
      // console.log('isDirectory');
      var items = fs.readdirSync(path);
      // console.log(items.length, items);
      return !items || !items.length;
    }
    var file = fs.readFileSync(path);
    return !file || !file.length;
  }
};