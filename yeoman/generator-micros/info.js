var readJson = require('read-package-json');
var info =  function (root) {
    if(root==null)
        root=__dirname;
    return new Promise((resolve, reject) => {
        readJson(`${root}/package.json`, console.error, false, function (er, data) {
            if (er) {
                console.error("There was an error reading package.json file");
                reject("There was an error reading package.json file");
            }

            //console.log('the package data is', data.author)
            resolve(data);
        });
    });
};
module.exports = info;