var express = require('express');
var glob = require("glob-fs")();
const csv = require("csvtojson");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  function bird(){
    var classArray = new Array(7);
    for(var i = 0; i < 7; i++){
      classArray[i] = new Array();
    };
    glob.readdir("./csv/**/*.csv", function(er, files){
      files.forEach(function(file, index){
        return csv({
          noheader: false,
          headers: ['Select',
                      'CRN',
                      'Subj',
                      'Crse',
                      'Sec',
                      'Cmp',
                      'Cred',
                      'Title',
                      'Days',
                      'Time',
                      'Cap',
                      'Act',
                      'Rem',
                      'XL Cap',
                      'XL Act',
                      'XL Rem',
                      'Instructor',
                      'Date',
                      'Location',
                      'Attribute'
                    ]
        }).fromFile(file)
        .on("json", function(jsonObj){
          classArray[index].push(jsonObj);
        })
        .on("done", function(){
          if(index == files.length-1){
            classArray = classArray.reduce(function(a, b){
              return a.concat(b);
            });
            var stringArray = [];
            classArray.forEach(function(item, index){
              if(item.Location && item.Location.length > 0){
                if(stringArray.indexOf(item.Location) === -1){
                  stringArray.push(item.Location);
                }
              }
            });
            var newObject = {};
            stringArray.forEach(function(string){
              newObject[string.substring(0, string.indexOf(" ") + 1)] = [];
            classArray.forEach(function(item, index){
              Object.keys(newObject).forEach(function(building){
                if(item.Location.substring(0, string.indexOf(" ") + 1) === building){
                  newObject[item.Location.substring(0, string.indexOf(" ") + 1)].push(item);
                }
                if(index+1 === classArray.length){
                  delete newObject.Location;
                  newObject = newObject[''];
                  res.send(newObject['']);
                }
              });
            });
          });
        };
      });
      });
    });
  };
  bird();
});


module.exports = router;
