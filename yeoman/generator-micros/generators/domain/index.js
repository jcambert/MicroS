const Generator = require("yeoman-generator");
const chalk = require("chalk");
var changeCase = require('change-case');
var glob = require("glob");
module.exports = class extends Generator {
    constructor(args, opt) {
        super(args, opt);

        this.answers = {}
        this.indomain=false;
        this.namespace="unknown";
        var self=this;
        glob("*.domain.csproj", { cwd: process.cwd() },function (er, files) {
            self.indomain=files.length==1;
            self.namespace=self.indomain?files[0].split('.')[0]:"";
            
         })
        //this.log(this.config.getAll())
    }

    initializing() {
        

    }

    async prompting() {
        var self = this;
        if(!self.indomain) return new Promise(r=>r());
        var prompts = self.config.get("promptValues");
        var prompting = [];
        this.props = [];


        if (!prompts || !prompts.name) {
            prompting.push({
                type: "input",
                name: "name",
                message: "Domain Name:",
                default: ""
            });

        } else {
            self.answers.name = prompts.name;
        }

        if (!prompts || !prompts.entity) {
            prompting.push({
                type: "confirm",
                name:"entity",
                message: "Is your domain name BaseEntity Derived",
                default: "Y"
            });

        } else {
            self.answers.entity = prompts.entity;
        }


        if (!prompts || !prompts.crud) {
            prompting.push({
                type: "confirm",
                name:"crud",
                message: "Crud Handling Enabled (Create,Update,Delete)",
                default: "Y"
            });

        } else {
            self.answers.crud = prompts.crud;
        }

        var resp = await this.prompt(prompting);
        this.answers = Object.assign({}, this.answers, resp);

        const columnPrompts = [{
            type: 'input',
            name: 'attributeName',
            message: 'Define your Domain - Property Name?',
            default: 'ID'
        }, {
            type: 'input',
            name: 'attributeType',
            message: 'Define your Domain - Property Type?',
            default: 'string'
        }, {
            type: 'confirm',
            name: 'repeat',
            message: 'Do you want to add more property?',
            default: 'Y'
        }]

       
        const loop = async (relevantPrompts) => {
            var resp=await this.prompt(relevantPrompts);
            self.props.push({name:resp.attributeName,type:resp.attributeType});
            if(resp.repeat)
                await loop(columnPrompts);
        }

        await loop(columnPrompts)

        this.config.set({"domain":this.props});
        this.config.save();


    }
    _writing(from,to){
        this.fs.copyTpl(
            this.templatePath(from),
            this.destinationPath(to),
            { changeCase: changeCase, name: this.answers.name, props: this.props,namespace:this.namespace,crud:this.answers.crud,base_entity:this.answers.entity }
        );
    }
    writing() {
       
        if(!this.indomain){
            this.log(chalk.red("ABORTING:you are not in DOMAIN folder"));
            return
        }
        var tpls=[
            ["domain.cs",changeCase.pascalCase(this.answers.name) + "s/Domain/" + changeCase.pascalCase(this.answers.name) + ".cs"],
            ["dto.cs",changeCase.pascalCase(this.answers.name) + "s/Dto/" + changeCase.pascalCase(this.answers.name) + "Dto.cs"],
            ["queries/Browse.cs",changeCase.pascalCase(this.answers.name) + "s/Queries/Browse" + changeCase.pascalCase(this.answers.name) + ".cs"],
            ["queries/Get.cs",changeCase.pascalCase(this.answers.name) + "s/Queries/Get" + changeCase.pascalCase(this.answers.name) + ".cs"],
            ["Profile.cs",changeCase.pascalCase(this.answers.name) + "s/Mapping/" + changeCase.pascalCase(this.answers.name) + "Profile.cs"]
        ];

        var cruds=[
            ["messages/BaseCommand.cs",changeCase.pascalCase(this.answers.name) + "s/Messages/Commands/" + changeCase.pascalCase(this.answers.name) + "BaseCommand.cs"],
            ["messages/Create.cs",changeCase.pascalCase(this.answers.name) + "s/Messages/Commands/Create" + changeCase.pascalCase(this.answers.name) + ".cs"],
            ["messages/Delete.cs",changeCase.pascalCase(this.answers.name) + "s/Messages/Commands/Delete" + changeCase.pascalCase(this.answers.name) + ".cs"],
            ["messages/Update.cs",changeCase.pascalCase(this.answers.name) + "s/Messages/Commands/Update" + changeCase.pascalCase(this.answers.name) + ".cs"],
            ["events/BaseEvent.cs",changeCase.pascalCase(this.answers.name) + "s/Messages/Events/" + changeCase.pascalCase(this.answers.name) + "BaseEvent.cs"],
            ["events/Created.cs",changeCase.pascalCase(this.answers.name) + "s/Messages/Events/" + changeCase.pascalCase(this.answers.name) + "Created.cs"],
            ["events/Updated.cs",changeCase.pascalCase(this.answers.name) + "s/Messages/Events/" + changeCase.pascalCase(this.answers.name) + "Updated.cs"],
            ["events/Deleted.cs",changeCase.pascalCase(this.answers.name) + "s/Messages/Events/" + changeCase.pascalCase(this.answers.name) + "Deleted.cs"],
            ["events/BaseRejected.cs",changeCase.pascalCase(this.answers.name) + "s/Messages/Events/" + changeCase.pascalCase(this.answers.name) + "BaseRejectedEvent.cs"],
            ["events/CreateRejected.cs",changeCase.pascalCase(this.answers.name) + "s/Messages/Events/Create" + changeCase.pascalCase(this.answers.name) + "Rejected.cs"],
            ["events/UpdateRejected.cs",changeCase.pascalCase(this.answers.name) + "s/Messages/Events/Update" + changeCase.pascalCase(this.answers.name) + "Rejected.cs"],
            ["events/DeleteRejected.cs",changeCase.pascalCase(this.answers.name) + "s/Messages/Events/Delete" + changeCase.pascalCase(this.answers.name) + "Rejected.cs"],
        ];
        if(this.answers.crud){
            tpl.concat(cruds);
        }
        tpls.forEach(tpl=>{
            this._writing(tpl[0],tpl[1])
        })
      
    }

    end(){
       
    }

}