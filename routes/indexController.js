function IndexController(){
    console.log(require("../bin/www").classArray)
    return require("../bin/www").classArray;
};

module.exports = IndexController;
