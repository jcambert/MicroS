var readJson = require('read-package-json');
var info = function (root,cb) {

        //console.log(`${root}/package.json`);
        readJson(`${root}/package.json`, console.error, false, function (er, data) {
            if (er) {
                console.error("There was an error reading package.json file")
                throw new Error( "There was an error reading package.json file");
            }

            console.log('the package data is', data.author)
            cb(data);
        });

};
module.exports = info;