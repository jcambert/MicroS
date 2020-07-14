const Generator = require("yeoman-generator");
const chalk = require("chalk");
var changeCase = require('change-case');
var glob = require("glob");
const path = require('path');
const micros = require("./../common/common");
module.exports = class extends Generator {
    constructor(args, opt) {
        super(args, opt);
        this.micros = new micros(this,this.options.namespace);
    }

    async initializing() {
        var self = this;
        await self.micros.initializing();
       
    }
    async prompting() {
        var self = this;
        if(!self.micros.using())return;
        self.micros.hello();
        await self.micros.askForApplicationName();
        await self.micros.askForDomain(false);




    }
    writing() {
        const self=this;
        if(!self.micros.using())return;
        const options=Object.assign({},{pascalDomain:changeCase.pascalCase(self.config.get('answers').domain)},self.config.get('answers'),{author:self.config.get('author'),changeCase:changeCase});
        var apiPath=self.config.get('api').path;
        var tpls = [
            ["AuthAdminAttribue.cs","Framework/AdminAuth.cs"],
            ["BaseController.cs","Controllers/BaseControllerGen.cs"],
            ["ApiController.cs", "Controllers/{0}sControllerGen.cs"],

            ["IApiService.cs", "Services/I{0}sServiceGen.cs"]
        ];
        tpls.forEach(tpl => {
            self.micros.writing(tpl[0], path.join(apiPath, tpl[1].format(options.pascalDomain)),options);
        });
    }


}