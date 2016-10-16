define(function(require, exports, module){
    var pageNumberCreator = {
        getPages: function(config){
            var totalRecords = config.totalRecords,
                pageSize = config.pageSize,
                currentPage = config.currentPage,
                pagerData = {
                    totalRecords: totalRecords,
                    currentPage: currentPage,
                    totalPage: Math.ceil(totalRecords/pageSize),
                    pageNumber:[]
                };

            if (totalRecords > 1) {
                var pageNumberArray = [],
                    cp = currentPage,
                    maxP = Math.ceil(totalRecords/pageSize),
                    centerNumber = 4;

                var startPage = cp > centerNumber / 2 ? cp - centerNumber / 2 : 1,
                    endPage = (maxP - cp >= centerNumber) ? cp + (cp > centerNumber / 2 ? centerNumber / 2 : centerNumber) : maxP;
                if (cp > 1) {
                    pageNumberArray.push({
                        number:(cp - 1),
                        type:'prevPage'
                    });

                    if(cp > 3){
                        pageNumberArray.push({
                            number:1,
                            type:'pageNumber'
                        });
                    }
                }

                if(startPage > 2){
                    pageNumberArray.push({
                        text:"...",
                        type:'plainText'
                    });
                }
                
                for (var i = startPage; i <= endPage; i++) {
                    if (i === cp) {
                        pageNumberArray.push({
                            text:i,
                            type:'plainText'
                        });
                    } else {
                        pageNumberArray.push({
                            number:i,
                            type:'pageNumber'
                        });
                    }
                }

                if(endPage < maxP - 1){
                    pageNumberArray.push({
                        text:"...",
                        type:'plainText'
                    });
                }
                if (cp < maxP) {
                    if (endPage < maxP && cp <= maxP - centerNumber) {
                        pageNumberArray.push({
                            number:maxP,
                            type:'pageNumber'
                        });
                    }

                    pageNumberArray.push({
                        number:(cp + 1),
                        type:'nextPage'
                    });
                }
                pagerData.pageNumber = pageNumberArray;
            }

            return pagerData;
        }
    };

    module.exports = pageNumberCreator;
});