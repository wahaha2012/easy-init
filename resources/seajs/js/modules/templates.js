define(function(require, exports, module) {
    require("lib/mustache");

    var templates={
        'alert': '<div class="dialogue-title">{{title}}<i class="dialogue-close-btn">Close</i></div>\
                <div class="dialogue-body"><p class="alert-info">{{{text}}}</p></div>\
                <div class="dialogue-buttons">\
                    <button class="btn btn-success btn-sm J-btn-confirm">{{confirmBtn}}</button>\
                </div>',

        'confirm':'<div class="dialogue-title">{{title}}<i class="dialogue-close-btn">Close</i></div>\
                <div class="dialogue-body"><p class="alert-info">{{{text}}}</p></div>\
                <div class="dialogue-buttons">\
                    <button class="btn btn-success btn-sm J-btn-confirm">{{confirmBtn}}</button>\
                    <button class="btn btn-default btn-sm J-btn-cancel">取 消</button>\
                </div>'
    };

    module.exports = templates;
});
