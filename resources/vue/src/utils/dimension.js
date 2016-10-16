export default {
  getDocumentSize(){
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
  },
  getElementSize(element){
    return {
      width: element.scrollWidth,
      height: element.scrollHeight,
    }
  },
  getElementOffsetSize(element){
    return {
      width: element.scrollWidth,
      height: element.scrollHeight,
    }
  },
  getPosition(element) {
    return element.getBoundingClientRect();
  },
};