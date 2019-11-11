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
                default: "cotation"
            });

        } else {
            self.answers.name = prompts.name;
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
            { changeCase: changeCase, name: this.answers.name, props: this.props,namespace:this.namespace }
        );
    }
    writing() {
       
        if(!this.indomain){
            this.log(chalk.red("ABORTING:you are not in DOMAIN folder"));
            return
        }
        var tpls=[
            ["domain.cs",changeCase.titleCase(this.answers.name) + "s/Domain/" + changeCase.titleCase(this.answers.name) + ".cs"],
            ["dto.cs",changeCase.titleCase(this.answers.name) + "s/Dto/" + changeCase.titleCase(this.answers.name) + "Dto.cs"],
            ["messages/BaseCommand.cs",changeCase.titleCase(this.answers.name) + "s/Messages/Commands/" + changeCase.titleCase(this.answers.name) + "BaseCommand.cs"],
            ["messages/Create.cs",changeCase.titleCase(this.answers.name) + "s/Messages/Commands/Create" + changeCase.titleCase(this.answers.name) + ".cs"],
            ["messages/Delete.cs",changeCase.titleCase(this.answers.name) + "s/Messages/Commands/Delete" + changeCase.titleCase(this.answers.name) + ".cs"],
            ["messages/Update.cs",changeCase.titleCase(this.answers.name) + "s/Messages/Commands/Update" + changeCase.titleCase(this.answers.name) + ".cs"],
            ["events/BaseEvent.cs",changeCase.titleCase(this.answers.name) + "s/Messages/Events/" + changeCase.titleCase(this.answers.name) + "BaseEvent.cs"],
            ["events/Created.cs",changeCase.titleCase(this.answers.name) + "s/Messages/Events/" + changeCase.titleCase(this.answers.name) + "Created.cs"],
            ["events/Updated.cs",changeCase.titleCase(this.answers.name) + "s/Messages/Events/" + changeCase.titleCase(this.answers.name) + "Updated.cs"],
            ["events/Deleted.cs",changeCase.titleCase(this.answers.name) + "s/Messages/Events/" + changeCase.titleCase(this.answers.name) + "Deleted.cs"],
            ["events/BaseRejected.cs",changeCase.titleCase(this.answers.name) + "s/Messages/Events/" + changeCase.titleCase(this.answers.name) + "BaseRejectedEvent.cs"],
            ["events/CreateRejected.cs",changeCase.titleCase(this.answers.name) + "s/Messages/Events/Create" + changeCase.titleCase(this.answers.name) + "Rejected.cs"],
            ["events/UpdateRejected.cs",changeCase.titleCase(this.answers.name) + "s/Messages/Events/Update" + changeCase.titleCase(this.answers.name) + "Rejected.cs"],
            ["events/DeleteRejected.cs",changeCase.titleCase(this.answers.name) + "s/Messages/Events/Delete" + changeCase.titleCase(this.answers.name) + "Rejected.cs"],
            ["queries/Browse.cs",changeCase.titleCase(this.answers.name) + "s/Queries/Browse" + changeCase.titleCase(this.answers.name) + ".cs"],
            ["queries/Get.cs",changeCase.titleCase(this.answers.name) + "s/Queries/Get" + changeCase.titleCase(this.answers.name) + ".cs"],
            ["Profile.cs",changeCase.titleCase(this.answers.name) + "s/Mapping/" + changeCase.titleCase(this.answers.name) + "Profile.cs"]
        ];
        tpls.forEach(tpl=>{
            this._writing(tpl[0],tpl[1])
        })
      
    }

    end(){
       
    }

}