define(function(require, exports, module) {
    var $ = require('jquery'),
        // urlPrefix = 'api-php/api.php?url=',
        urlPrefix = '',
        _defaultConfig = {
            write: {
                type:'POST',
                dataType: 'json',
                cache:false
            },
            read: {
                type:'GET',
                dataType: 'json',
                cache: false
            }
        };

    var ajax={
            url:{
                
            },
            write: function(config){
                config.url = urlPrefix + config.url;
                // config.url = urlPrefix + encodeURIComponent(config.url);
                return $.ajax($.extend(_defaultConfig.write, config));
            },
            read: function(config){
                config.url = urlPrefix + config.url;
                // config.url = urlPrefix + encodeURIComponent(config.url);
                return $.ajax($.extend(_defaultConfig.read, config));
            },
            errorCode:{
                
            }
        };

    module.exports = ajax;
});
