define(function(require, exports, module) {
    require('lib/underscore');

    var $ = require('jquery'),
        Templates = require('modules/templates'),
        Dialgoue = require('modules/dialogue');

    var util = {
        typeOf: function(obj,type) {
            var clas = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
            return type?obj !== undefined && obj !== null && clas === type:clas;
        },
        getQueryString: function(queryKey, searchString){
            if(!queryKey || !this.typeOf(queryKey,'string') || queryKey.replace(/\s+/,'').length<1){
                return '';
            }

            searchString = searchString || window.location.href;

            var pattern = new RegExp(queryKey+'=([^?&=]*)','g'),
                matches = searchString.match(pattern);

            if(matches && this.typeOf(matches,'array') && matches.length>0){
                return decodeURIComponent(matches[0].replace(queryKey+'=', ''));
            }else{
                return '';
            }
        },
        //ajax GET
        ajaxGet: function(url, data, successCallback, errorCallback){
            var _this = this;
            $.ajax({
                url: url,
                data: data || {},
                type: "GET",
                dataType: 'json',

                success: function(json) {
                    successCallback && successCallback(json);
                },
                error: function(errorMsg) {
                    // _this.alert('请求出错');
                    errorCallback && errorCallback(errorMsg);
                }
            });
        },

        //ajax POST
        ajaxPost: function(url, data, successCallback, errorCallback){
            var _this = this;
            $.ajax({
                url: url,
                data: data || {},
                type: "POST",
                dataType: 'json',

                success: function(json) {
                    successCallback && successCallback(json);
                },
                error: function(errorMsg) {
                    // _this.alert('请求出错');
                    errorCallback && errorCallback(errorMsg);
                }
            });
        },

        trim: function(str){
            return str.replace(/^\s+|\s+$/g, '');
        },

        alert: function(msg, callback) {
            this.showDialogue({
                width: 300,
                body: Mustache.render(Templates.alert, {
                    text: msg,
                    title: '提示',
                    confirmBtn: '确定'
                })
            }, function(dialogue) {
                dialogue.win.find(".J-btn-confirm").on('click', function(e) {
                    e.preventDefault();

                    callback && callback(dialogue);
                    dialogue.close();
                });
            });
        },

        confirm: function(msg, callback) {
            this.showDialogue({
                width: 300,
                body: Mustache.render(Templates.confirm, {
                    text: msg,
                    title: "提示",
                    confirmBtn: '确定'
                })
            }, function(dialogue) {
                dialogue.win.find(".J-btn-confirm").on('click', function(e) {
                    e.preventDefault();

                    callback && callback(dialogue);
                    dialogue.close();
                });
            });
        },

        showDialogue: function(options, callback) {
            options = options || {};

            var dialogue = new Dialgoue(options);
                
            dialogue.open();

            var win = dialogue.win;
            win.find(".J-btn-cancel").on('click', function(e) {
                e.preventDefault();

                dialogue.close();
            });

            if(options.addClass){
                win.addClass(options.addClass);
            }

            callback && callback(dialogue);
        },

        getDaysNumberOfMonth:function(y,m){
            if(y<0||y>9999||m<0||m>11){return 31;}
            //如果是2月，判断是否闰年
            if(m==1){
                if(y%100===0){
                    if(y%400===0){return 29;}else{return 28;}
                }else{
                    if(y%4===0){return 29;}else{return 28;}
                }
            }else{  //不是闰年直接返回天数
                return [31,28,31,30,31,30,31,31,30,31,30,31][m];
            }
        },
        
        /**格式化字符或数字，小于10的数字前面补上0
         *eg 1->01 , 2->02 ,16->16
        */
        formatNum:function(n){
            n = parseInt(n, 10) || 0;
            return n>9?n:('0'+n);
        },

        //create Date Object from String or Date Object
        createDate: function(dateTime){
            var resultDate = new Date();

            if(_.isDate(dateTime)){
                resultDate = dateTime;
            }else if(_.isString(dateTime)){
                resultDate = new Date(dateTime.replace("T"," ").replace(/[^\d\s:]/g,"/"));
            }else if(_.isNumber(dateTime)){
                resultDate = new Date(dateTime);
            }

            return resultDate;
        },

        //datetime to string
        dateToString: function(dateTime){
            if(dateTime){
                return dateTime.getFullYear()+'-'+(dateTime.getMonth()+1)+'-'+dateTime.getDate()+' '+dateTime.getHours()+':'+dateTime.getMinutes()+':'+dateTime.getSeconds();
            } else {
                return '';
            }
        },

        //day offset
        getDateOffset: function(beginDate, endDate){
            beginDate = this.createDate(beginDate);
            endDate = this.createDate(endDate);

            var beginDay = new Date(beginDate.getFullYear(), beginDate.getMonth(), beginDate.getDate()),
                endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),
                dateSeconds = 24 * 60 * 60 *1000;

            return Math.floor(endDay.getTime()/dateSeconds) - Math.floor(beginDay.getTime()/dateSeconds);
        },

        /*section format data
         *@originalData: data to be format  eg. 1234566789
         *@sectionNumber: how many sections should be format eg.3
         *@seperator: the seperator char eg.','
         *return string formated
         */

        sectionFormat: function(originalData, sectionNumber, seperator) {
            if (typeof originalData === 'undefined' || (originalData.constructor !== Number && originalData.constructor !== String)) {
                return '';
            }
            if (typeof sectionNumber === 'undefined' || sectionNumber.constructor !== Number || sectionNumber < 1) {
                sectionNumber = 3;
            }
            if (typeof seperator === 'undefined' || (seperator.constructor !== String && seperator.constructor !== Number)) {
                seperator = '';
            }
            var dataArr = originalData.toString().split('');
            var resultArr = [],
                elemIndex = 0;
            for (var i = 0, len = dataArr.length; i < len; i++) {
                if (dataArr[i] === seperator) {
                    continue;
                }
                resultArr.push(dataArr[i]);
                if (++elemIndex % sectionNumber === 0) {
                    resultArr.push(seperator);
                }
            }
            return this.trim(resultArr.join(''));
        },

        //highlight area
        highlightArea: function(config){
            if(!config || !config.dom){
                return false;
            }
            config = config || {};

            var area = $(config.dom),
                opacity = config.opacity || 0.75,
                BODY = $('body');

            var win = $(window),
                winSize = {width: win.width(), height: win.height()},
                areaSize = {width: area.width(), height: area.height()},
                areaPos = area.offset(),

                coverConfig = [
                    {left:0, top:0, width:winSize.width, height:areaPos.top},
                    {left:0, top:areaPos.top, width:areaPos.left, height:areaSize.height},
                    {left:areaPos.left+areaSize.width, top:areaPos.top, width:winSize.width-areaPos.left-areaSize.width, height:areaSize.height},
                    {left:0, top:areaPos.top+areaSize.height, width:winSize.width, height:winSize.height-areaSize.height-areaPos.top}
                ];

            // console.log(winSize, areaSize, areaPos);
            
            _.each(coverConfig, function(item, index){
                var el = $("<div></div>");
                el.css({
                    position:'absolute',
                    'z-index':20000+index,
                    'background':'#000000',
                    width: item.width,
                    height: item.height,
                    left: item.left,
                    top: item.top,
                    opacity: opacity
                });

                el.appendTo(BODY);
            });
        },

        arrayToJSON: function(array){
            var result = [];
            if(!_.isArray(array)){
                return array;
            }

            _.forEach(array, function(item, index){
                result.push({
                    value: index,
                    text: item
                });
            });

            return result;
        }
    };

    module.exports = util;
});