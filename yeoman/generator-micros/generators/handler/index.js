const Generator = require("yeoman-generator");
var changeCase = require('change-case');
var glob = require("glob");
module.exports = class extends Generator {
    constructor(args, opt) {
        super(args, opt);
        this.namespace = "unknown";
        this.answers = {}
        //this.log(this.config.getAll())
        var self=this;
        glob("*.csproj", { cwd: process.cwd() }, function (er, files) {
            
            self.namespace = files[0].split('.')[0] ;
            self.answers.name = changeCase.lowerCase( files[0].split('.')[2].trim());
            if(self.answers.name.length>0 && self.answers.name.slice(-1)=='s'){
                self.answers.name=self.answers.name.slice(0,-1);
            }
                

        });
        this.author =  require(this.sourceRoot() + "/../../../package.json").author;
    }
    
    async prompting() {
        var self = this;
        var prompts = self.config.get("promptValues");
        var prompting = [];


       
        if (!prompts || !prompts.name ) {
            prompting.push({
                type: "input",
                name: "name",
                message: "Handler Domain Name:",
                default: self.answers.name
            });

        }else{
            self.answers.name = prompts.name;
        }

        var resp = await this.prompt(prompting);
        this.answers = Object.assign({}, this.answers, resp);



    }
    writing() {
        this.log("Create Handler")
        var opts=  { changeCase: changeCase, name: this.answers.name, namespace: this.namespace, author: this.author };

        this.fs.copyTpl(
            this.templatePath("create.cs"),
            this.destinationPath("Handlers/Create" + changeCase.titleCase(this.answers.name) + "HandlerGen.cs"),
            opts
        );

        this.fs.copyTpl(
            this.templatePath("delete.cs"),
            this.destinationPath("Handlers/Delete" + changeCase.titleCase(this.answers.name) + "HandlerGen.cs"),
            opts
        );

        this.fs.copyTpl(
            this.templatePath("get.cs"),
            this.destinationPath("Handlers/Get" + changeCase.titleCase(this.answers.name) + "HandlerGen.cs"),
            opts
        );

        this.fs.copyTpl(
            this.templatePath("update.cs"),
            this.destinationPath("Handlers/Update" + changeCase.titleCase(this.answers.name) + "HandlerGen.cs"),
            opts
        );
    }

    
}