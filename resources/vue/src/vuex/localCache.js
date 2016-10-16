class LocalCache {
  static getStorage(){
    let storage = window && window.localStorage;
    return storage;
  }

  static save(name, value){
    let storage = this.getStorage();
    if(!storage || typeof name=='undefined' || typeof value=='undefined'){
      return;
    }

    storage.setItem(name, JSON.stringify(value));
  }

  static read(name){
    let storage = this.getStorage();
    if(!storage || typeof name=='undefined'){
      return;
    }

    return storage.getItem(name);
  }

  static readJSON(name){
    let value = this.read(name);

    try{
      value = JSON.parse(value);
    }catch(err){

    }

    return value;
  }

  static delete(name){
    let storage = this.getStorage();
    if(!storage || typeof name=='undefined'){
      return;
    }

    storage.removeItem(name);
  }

  static update(name, value){

  }

  static deleteAll(){

  }
};

export default LocalCache;