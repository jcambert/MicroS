const Generator = require("yeoman-generator");
const changeCase = require('change-case');
/*
const chalk = require("chalk");
var glob = require("glob-promise");
var info = require("../../info");*/
const path = require('path');
const micros = require("./../common/common");

module.exports = class extends Generator {
    constructor(args, opt) {
        super(args, opt);
        this.micros = new micros(this,"micros:domain");

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
        await self.micros.askForDomain();
        await self.micros.askForDomainProperties();

        


    }

    writing() {
        const self=this;
        if(!self.micros.using())return;
        //this.log("Domain writing");
        
        const options=Object.assign({},{pascalDomain:changeCase.pascalCase(self.config.get('answers').domain)},self.config.get('answers'),{author:self.config.get('author'),changeCase:changeCase});

        var domainPath=self.config.get('domain').path;

        var tpls = [
            ["domain.cs", "{0}s/Domain/{0}.cs"],
            ["dto.cs", "{0}s/Dto/{0}Dto.cs"],

            ["Profile.cs", "{0}s/Mapping/{0}Profile.cs"]
        ];
        var notSubDoc = [
            ["queries/Browse.cs", "{0}s/Queries/Browse{0}.cs"],
            ["queries/Get.cs", "{0}s/Queries/Get{0}.cs"],
        ]

        var cruds = [
            ["messages/BaseCommand.cs", "{0}s/Messages/Commands/{0}BaseCommand.cs"],
            ["messages/Create.cs", "{0}s/Messages/Commands/Create{0}.cs"],
            ["messages/Delete.cs", "{0}s/Messages/Commands/Delete{0}.cs"],
            ["messages/Update.cs", "{0}s/Messages/Commands/Update{0}.cs"],
            ["events/BaseEvent.cs", "{0}s/Messages/Events/{0}BaseEvent.cs"],
            ["events/Created.cs", "{0}s/Messages/Events/{0}Created.cs"],
            ["events/Updated.cs", "{0}s/Messages/Events/{0}Updated.cs"],
            ["events/Deleted.cs", "{0}s/Messages/Events/{0}Deleted.cs"],
            ["events/BaseRejected.cs", "{0}s/Messages/Events/{0}BaseRejectedEvent.cs"],
            ["events/CreateRejected.cs", "{0}s/Messages/Events/Create{0}Rejected.cs"],
            ["events/UpdateRejected.cs", "{0}s/Messages/Events/Update{0}Rejected.cs"],
            ["events/DeleteRejected.cs", "{0}s/Messages/Events/Delete{0}Rejected.cs"],
        ];
        if (!options.subdoc)tpls = tpls.concat(notSubDoc);
        if (options.crud)tpls = tpls.concat(cruds);
        tpls.forEach(tpl => {
            self.micros.writing(tpl[0], path.join(domainPath, tpl[1].format(options.pascalDomain)),options)
        });

    }

  /*  end() {
        if (this.options.namespace == this.namespace)
            this.micros.clear();
    }*/

}