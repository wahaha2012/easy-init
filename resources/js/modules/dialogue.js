define(function(require, exports, module) {
    var $ = require("jquery");

    var win = $(window),
        BODY = $('body'),
        winSize = {width: win.width(), height: win.height()},
        overlay = $('<div class="dialogue-overlay"></div>')
        defaultConfig = {
            closeable: true,
            width:400
        };

        overlay.css({
            height: Math.max(win.height(), BODY.height())
        });

    var Dialogue = function(options){
            options = $.extend({}, defaultConfig, options||{});
            this.win = $('<div class="dialogue"></div>');
            this.opt = options;

            this.win.html(options.content||options.body);
        };

    Dialogue.prototype = {
        constructor: Dialogue,

        open: function(callback){
            var _this = this;
            overlay.appendTo(BODY);
            this.win.appendTo(BODY);
            this.win.css({
                width: this.opt.width,
                left: this.opt.left||(winSize.width-this.opt.width)/2, 
                top: this.opt.top||(winSize.height-this.win.height())/2
            });
            
            this.win.find(".dialogue-close-btn").on("click", function(e){
                e.preventDefault();

                _this.close();
            });

            if(!this.opt.closeable){
                this.win.find(".dialogue-close-btn").hide();
            }

            this.opt.onOpen && this.opt.onOpen();
            
            callback && callback();
        },

        close: function(callback){
            if(this.opt.swfUploader){
                this.opt.swfUploader.remove();
            }
            this.win.remove();

            if(!$("div.dialogue").length){
                overlay.remove();
            }

            this.opt.onClose && this.opt.onClose();

            callback && callback();
        }
    };

    module.exports = Dialogue;
});