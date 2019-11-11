const Generator = require("yeoman-generator");
var changeCase = require('change-case')
module.exports = class extends Generator {
    constructor(args, opt) {
        super(args, opt);

        this.answers = {}
        //this.log(this.config.getAll())
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
                default: ""
            });

        }else{
            self.answers.name = prompts.name;
        }

        var resp = await this.prompt(prompting);
        this.answers = Object.assign({}, this.answers, resp);



    }
    writing() {
        this.log("Create Handler")
        this.fs.copyTpl(
            this.templatePath("handler.cs"),
            this.destinationPath("Handlers/Create" + changeCase.titleCase(this.answers.name) + "Handler.cs"),
            { changeCase: changeCase, name: this.answers.name }
        );
    }

    
}