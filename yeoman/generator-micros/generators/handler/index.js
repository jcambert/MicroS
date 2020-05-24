const Generator = require("yeoman-generator");
var changeCase = require('change-case');
//var glob = require("glob");
var glob = require("glob-promise");
const chalk = require("chalk");
const path = require('path');
var info = require( "../../info");
module.exports = class extends Generator {
    constructor(args, opt) {
        super(args, opt);
    }
    async initializing (){
        var self=this;
        //this.log(await info());
        self.namespace = "unknown";
        self.answers = {};
        self.configok=false;
        //self.log(chalk.green("initializing"));
        var prompts = self.config.get("promptValues");
        if (prompts && prompts.subdoc) return;
        var files = await glob("**/*.Services.*/*.csproj", { cwd: process.cwd() });

        if (files.length == 0) {
            self.log(chalk.red("There is no Services project available"));
            return;
        }else if(files.length==1){
            var file = files[0];

            self.servicePath=path.join(process.cwd(),path.dirname(file));                
            self.namespace=path.basename(file, path.extname(file)).split(".")[0];
            self.configok=true;
        }else{
            self.log(chalk.red("Mutiple Services are not allowed at this time"));
            return;
        }
        self.info = await info();
        
       // self.log(chalk.green("Welcome "+self.info.author.name));
    }

    async prompting() {
        //this.log(chalk.green("prompting"));
        if(!this.configok){
            //this.log(chalk.green("Nothing to do here"));
            return;
        }
        var self = this;

        
        var prompts = self.config.get("promptValues");
        var prompting = [];



        if (!prompts || !prompts.name) {
            prompting.push({
                type: "input",
                name: "name",
                message: "Handler Domain Name:",
                default: self.answers.name
            });

        } else {
            self.answers.name = prompts.name;
        }

        var resp = await this.prompt(prompting);
        this.answers = Object.assign({}, this.answers, resp);
    }

    _writing(from,to){
        this.fs.copyTpl(
            this.templatePath(from),
            this.destinationPath(to.replace(" ","")),
            { 
                changeCase: changeCase, 
                name: this.answers.name, 
                props: this.props,
                namespace:this.namespace,
                base_entity:this.answers.entity,
                author:this.info.author 
            }
        );
    }

    writing() {
        var self=this;
        //this.log("Writing")
        if(!this.configok){
            //this.log(chalk.green("Nothing to do here"));
            return;
        }
   
        var tpls=[
            ["handlers/browse.cs","Handlers/" + changeCase.titleCase(this.answers.name) + "/Browse" + changeCase.titleCase(this.answers.name) + "HandlerGen.cs"],
            ["handlers/create.cs","Handlers/" + changeCase.titleCase(this.answers.name) + "/Create" + changeCase.titleCase(this.answers.name) + "HandlerGen.cs"],
            ["handlers/delete.cs","Handlers/" + changeCase.titleCase(this.answers.name) + "/Delete" + changeCase.titleCase(this.answers.name) + "HandlerGen.cs"],
            ["handlers/get.cs","Handlers/" + changeCase.titleCase(this.answers.name) + "/Get" + changeCase.titleCase(this.answers.name) + "HandlerGen.cs"],
            ["handlers/update.cs","Handlers/" + changeCase.titleCase(this.answers.name) + "/Update" + changeCase.titleCase(this.answers.name) + "HandlerGen.cs"],
            ["repositories/repository.cs","Repositories/" + changeCase.titleCase(this.answers.name) + "RepositoryGen.cs"],
            ["controllers/controller.cs","Controllers/" + changeCase.titleCase(this.answers.name) + "ControllerGen.cs"]

        ];


        tpls.forEach(tpl=>{
            this._writing(tpl[0],path.join(self.servicePath, tpl[1]))
        })
    }

    end(){
        var runInMain=this.config.get("runInMainGenerator");
        if(!runInMain)
            this.config.delete("promptValues");
    }
}