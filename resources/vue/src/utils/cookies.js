class Cookies {
    /**
     * [setCookie set cookies]
     * @param {[type]} name   cookie name
     * @param {[type]} value  cookie value
     * @param {[type]} option cookies options {expires:Integer, path:String, domain:String, secure:Boolean}
     */
    static setCookie(name, value, option) {
        if (!name) {
            return false;
        }
        value = value || "";
        option = option || {};
        var expires = '';
        if (option.expires) {
            var date = new Date();
            date.setDate(date.getDate() + option.expires);
            expires = ";expires=" + date.toGMTString();
        }
        var path = option.path ? ";path=" + (option.path) : "";
        var domain = option.domain ? ";domain=" + (option.domain) : "";
        var secure = option.secure ? ";secure" : "";
        document.cookie = [encodeURIComponent(name), "=", encodeURIComponent(value), expires, path, domain, secure].join("");
    }

    static getCookie(name) {
        var rs = document.cookie.match(new RegExp("(?:^| )" + encodeURIComponent(name) + "=([^;]*)(?:;|$)", "i"));
        return rs ? decodeURIComponent(rs[1]) : undefined;
    }

    static deleteCookie(name, option) {
        if (!name) {
            return false;
        }
        option = option || {};
        var expires = ";expires=" + new Date().toGMTString();
        var path = option.path ? ";path=" + (option.path) : "";
        var domain = option.domain ? ";domain=" + (option.domain) : "";
        var secure = option.secure ? ";secure" : "";
        document.cookie = [encodeURIComponent(name), "=", expires, path, domain, secure].join("");
    }

    static clearCookie(option) {
        option = option || {};
        var expires = ";expires=" + new Date().toGMTString();
        var path = option.path ? ";path=" + (option.path) : "";
        var domain = option.domain ? ";domain=" + (option.domain) : "";
        var secure = option.secure ? ";secure" : "";
        //获取当前可访问cookie中的所有name值
        var rs = document.cookie.match(new RegExp("([^ ;][^;]*)(?=(=[^;]*)(;|$))", "gi"));
        //删除所有cookie
        for (var i in rs) {
            document.cookie = [rs[i], "=", expires, path, domain, secure].join("");
        }
    }
};

export default Cookies;
