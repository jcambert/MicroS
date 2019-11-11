const Generator = require("yeoman-generator");
const chalk = require("chalk");
var changeCase = require('change-case');
var glob = require("glob");
module.exports = class extends Generator {
    constructor(args, opt) {
        super(args, opt);

        this.answers = {};
        this.author = {};
        this.indomain = false;
        this.namespace = "unknown";
        //this.config.delete("promptValues");
        var self = this;
        glob("*.api.csproj", { cwd: process.cwd() }, function (er, files) {
            self.indomain = files.length == 1;
            self.namespace = self.indomain ? files[0].split('.')[0] : "";

        })
        this.author =  require(this.sourceRoot() + "/../../../package.json").author;
        
    

    }


    async prompting() {
       // this.log("prompt");
        var self = this;
        if (!self.indomain) return new Promise(r => r());
        var prompts = self.config.get("promptValues");
        this.log("Prompts:",this.author);
        var prompting = [];



        if (!prompts || !prompts.name) {
            prompting.push({
                type: "input",
                name: "name",
                message: "API Controller Name:",
                default: ""
            });

        } else {
            self.answers.name = prompts.name;
        }

        var resp = await this.prompt(prompting);
        this.answers = Object.assign({}, this.answers, resp);



    }
    writing() {

        if (!this.indomain) {
            this.log(chalk.red("ABORTING:you are not in API folder"));
            return
        }
        if(Object.keys(this.answers).length==0){
            this.log(chalk.red("There is no response => No writing  "));
            return;
        }
        this.log("Create Api controller");

        var opts=  { changeCase: changeCase, name: this.answers.name, namespace: this.namespace, author: this.author };

        this.fs.copyTpl(
            this.templatePath("AuthAdminAttribue.cs"),
            this.destinationPath("Framework/AdminAuth.cs"),
            opts,
            {overwrite:false}
        );

        this.fs.copyTpl(
            this.templatePath("ApiController.cs"),
            this.destinationPath("Controllers/" + changeCase.titleCase(this.answers.name) + "sControllerGen.cs"),
            opts,
        );
        this.fs.copyTpl(
            this.templatePath("IApiService.cs"),
            this.destinationPath("Services/I" + changeCase.titleCase(this.answers.name) + "sServiceGen.cs"),
            opts
        
        );
    }


}