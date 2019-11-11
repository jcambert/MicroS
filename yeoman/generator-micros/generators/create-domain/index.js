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
            this.log(chalk.red("ABORTING:you are not in domain folder"));
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
      
        //this.log("Create Domain")
        //Create Domain
       /* this.fs.copyTpl(
            this.templatePath("domain.cs"),
            this.destinationPath(changeCase.titleCase(this.answers.name) + "s/Domain/" + changeCase.titleCase(this.answers.name) + ".cs"),
            { changeCase: changeCase, name: this.answers.name, props: this.props,namespace:this.namespace }
        );


        //Create Dto
        this.fs.copyTpl(
            this.templatePath("dto.cs"),
            this.destinationPath(changeCase.titleCase(this.answers.name) + "s/Dto/" + changeCase.titleCase(this.answers.name) + "Dto.cs"),
            { changeCase: changeCase, name: this.answers.name, props: this.props ,namespace:this.namespace}
        );

        //Create BaseCommand
        this.fs.copyTpl(
            this.templatePath("messages/BaseCommand.cs"),
            this.destinationPath(changeCase.titleCase(this.answers.name) + "s/Messages/Commands/" + changeCase.titleCase(this.answers.name) + "BaseCommand.cs"),
            { changeCase: changeCase, name: this.answers.name, props: this.props,namespace:this.namespace }
        );

        //Create CreateCommand
        this.fs.copyTpl(
            this.templatePath("messages/Create.cs"),
            this.destinationPath(changeCase.titleCase(this.answers.name) + "s/Messages/Commands/Create" + changeCase.titleCase(this.answers.name) + ".cs"),
            { changeCase: changeCase, name: this.answers.name, props: this.props,namespace:this.namespace }
        );

        //Create DeleteCommand
        this.fs.copyTpl(
            this.templatePath("messages/Delete.cs"),
            this.destinationPath(changeCase.titleCase(this.answers.name) + "s/Messages/Commands/Delete" + changeCase.titleCase(this.answers.name) + ".cs"),
            { changeCase: changeCase, name: this.answers.name, props: this.props,namespace:this.namespace }
        );

        //Create UpdateCommand
        this.fs.copyTpl(
            this.templatePath("messages/Update.cs"),
            this.destinationPath(changeCase.titleCase(this.answers.name) + "s/Messages/Commands/Update" + changeCase.titleCase(this.answers.name) + ".cs"),
            { changeCase: changeCase, name: this.answers.name, props: this.props ,namespace:this.namespace}
        );

        //Create BaseEvent
        this.fs.copyTpl(
            this.templatePath("events/BaseEvent.cs"),
            this.destinationPath(changeCase.titleCase(this.answers.name) + "s/Messages/Events/" + changeCase.titleCase(this.answers.name) + "BaseEvent.cs"),
            { changeCase: changeCase, name: this.answers.name, props: this.props ,namespace:this.namespace}
        );

        //Create CreatedEvent
        this.fs.copyTpl(
            this.templatePath("events/Created.cs"),
            this.destinationPath(changeCase.titleCase(this.answers.name) + "s/Messages/Events/" + changeCase.titleCase(this.answers.name) + "Created.cs"),
            { changeCase: changeCase, name: this.answers.name, props: this.props ,namespace:this.namespace}
        );

        //Create UpdatedEvent
        this.fs.copyTpl(
            this.templatePath("events/Updated.cs"),
            this.destinationPath(changeCase.titleCase(this.answers.name) + "s/Messages/Events/" + changeCase.titleCase(this.answers.name) + "Updated.cs"),
            { changeCase: changeCase, name: this.answers.name, props: this.props ,namespace:this.namespace}
        );

        //Create DeletedEvent
        this.fs.copyTpl(
            this.templatePath("events/Deleted.cs"),
            this.destinationPath(changeCase.titleCase(this.answers.name) + "s/Messages/Events/" + changeCase.titleCase(this.answers.name) + "Deleted.cs"),
            { changeCase: changeCase, name: this.answers.name, props: this.props ,namespace:this.namespace}
        );

        //Create BaseRejectedEvent
        this.fs.copyTpl(
            this.templatePath("events/BaseRejected.cs"),
            this.destinationPath(changeCase.titleCase(this.answers.name) + "s/Messages/Events/" + changeCase.titleCase(this.answers.name) + "BaseRejectedEvent.cs"),
            { changeCase: changeCase, name: this.answers.name, props: this.props ,namespace:this.namespace}
        );


        //Create CreateRejectedEvent
        this.fs.copyTpl(
            this.templatePath("events/CreateRejected.cs"),
            this.destinationPath(changeCase.titleCase(this.answers.name) + "s/Messages/Events/Create" + changeCase.titleCase(this.answers.name) + "Rejected.cs"),
            { changeCase: changeCase, name: this.answers.name, props: this.props ,namespace:this.namespace}
        );

        //Create UpdateRejectedEvent
        this.fs.copyTpl(
            this.templatePath("events/UpdateRejected.cs"),
            this.destinationPath(changeCase.titleCase(this.answers.name) + "s/Messages/Events/Update" + changeCase.titleCase(this.answers.name) + "Rejected.cs"),
            { changeCase: changeCase, name: this.answers.name, props: this.props ,namespace:this.namespace}
        );

        //Create DeleteRejectedEvent
        this.fs.copyTpl(
            this.templatePath("events/DeleteRejected.cs"),
            this.destinationPath(changeCase.titleCase(this.answers.name) + "s/Messages/Events/Delete" + changeCase.titleCase(this.answers.name) + "Rejected.cs"),
            { changeCase: changeCase, name: this.answers.name, props: this.props ,namespace:this.namespace}
        );

        //Create Browse Query
        this.fs.copyTpl(
            this.templatePath("queries/Browse.cs"),
            this.destinationPath(changeCase.titleCase(this.answers.name) + "s/Queries/Browse" + changeCase.titleCase(this.answers.name) + ".cs"),
            { changeCase: changeCase, name: this.answers.name, props: this.props ,namespace:this.namespace}
        );

         //Create Get Query
         this.fs.copyTpl(
            this.templatePath("queries/Get.cs"),
            this.destinationPath(changeCase.titleCase(this.answers.name) + "s/Queries/Get" + changeCase.titleCase(this.answers.name) + ".cs"),
            { changeCase: changeCase, name: this.answers.name, props: this.props ,namespace:this.namespace}
        );

        //Create Automap Profile
        this.fs.copyTpl(
            this.templatePath("Profile.cs"),
            this.destinationPath(changeCase.titleCase(this.answers.name) + "s/Mapping/" + changeCase.titleCase(this.answers.name) + "Profile.cs"),
            { changeCase: changeCase, name: this.answers.name, props: this.props ,namespace:this.namespace}
        );*/
    }

    end(){
       
    }

}