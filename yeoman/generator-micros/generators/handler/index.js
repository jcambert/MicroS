const Generator = require("yeoman-generator");
var changeCase = require('change-case');
const path = require('path');
const micros = require("./../common/common");
module.exports = class extends Generator {
    constructor(args, opt) {
        super(args, opt);
        this.micros = new micros(this, "micros:handler");
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
        await self.micros.askForServiceName();
        await self.micros.askForDomain(false);
    }

    writing() {
        var self = this;
        if(!self.micros.using())return;
        //this.log("Writing")
       // this.log("Handler writing");
        const options=Object.assign({},{pascalDomain:changeCase.pascalCase(self.config.get('answers').domain)},self.config.get('answers'),{author:self.config.get('author'),changeCase:changeCase});
        //self.log(options);
      
        var servicePath=options.service.path;

        var tpls = [
            ["handlers/browse.cs", "Handlers/{0}/Browse{0}HandlerGen.cs"],
            ["handlers/create.cs", "Handlers/{0}/Create{0}HandlerGen.cs"],
            ["handlers/delete.cs", "Handlers/{0}/Delete{0}HandlerGen.cs"],
            ["handlers/get.cs", "Handlers/{0}/Get{0}HandlerGen.cs"],
            ["handlers/update.cs", "Handlers/{0}/Update{0}HandlerGen.cs"],
            ["repositories/repository.cs", "Repositories/{0}RepositoryGen.cs"],
            ["controllers/controller.cs", "Controllers/{0}ControllerGen.cs"]

        ];


        tpls.forEach(tpl => {
            self.micros.writing(tpl[0], path.join(servicePath, tpl[1].format(options.pascalDomain)),options);
        });
    }
    end(){}
}