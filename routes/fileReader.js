var glob = require("glob-fs")();
const csv = require("csvtojson");
var vm = require("vm");

function FileReader(callback){
  var classArray = new Array(7);
  for(var i = 0; i < 7; i++){
    classArray[i] = new Array(1);
  }
  var data = glob.readdir("./csv/**/*.csv", function(er, files){
    for(var i = 0; i < files.length; i++){
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
      }).fromFile(files[i])
      .on("json", function(jsonObj){
        classArray[i].push(jsonObj);
        if(i+1 == files.length){
          console.log(classArray);
          return classArray;
        }
      });
    };
  });
  vm.runInNewContext(data, this, ".");
};

module.exports = FileReader;
