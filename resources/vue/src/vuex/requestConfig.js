const RequestConfig = {
  data : {
    // urlPrefix: 'http://localhost:8001/',

    'index': 'api/index',
  },

  getURL: function(requestOptions) {
    let _url = this.data.urlPrefix + this.data[requestOptions.url];

    let params = _url.match(/\$\{(\w+)\}/g);

    let logsArr = {};
    params && params.forEach(function(param){
      _url = _url.replace(param, requestOptions[param.replace(/[^\w]+/g, '')]);
      logsArr[param.replace(/[^\w]+/g, '')] = requestOptions[param.replace(/[^\w]+/g, '')];
    });

    //_url += '?_=' + new Date().getTime();

    // console.log('[log]','url params =>', logsArr);

    return _url;
  }
};

export default RequestConfig
