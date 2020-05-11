const Generator = require("yeoman-generator");
const chalk = require("chalk");
const changeCase = require('change-case');
var glob = require("glob-promise");
const path = require('path');
var info = require("../../info");
module.exports = class extends Generator {
    constructor(args, opt) {
        super(args, opt);


    }

    async initializing() {
        var self = this;
        this.env.adapter.promptModule.registerPrompt("search-list", require("inquirer-search-list"));
        self.primitiveTypes = ["string", "bool", "byte", "sbyte", "char", "decimal", "double", "float", "int", "uint", "long", "ulong", "short", "ushort", "object", "other"];
        self.namespace = "unknown";
        self.answers = {};
        self.configok = false;
        self.log(chalk.green("initializing"));
        var files = await glob("**/*.domain.csproj", { cwd: process.cwd() });

        if (files.length == 0) {
            self.log(chalk.red("There is no Domain project available"));
            return;
        } else if (files.length == 1) {
            var file = files[0];

            self.domainPath = path.join(process.cwd(), path.dirname(file));
            self.namespace = path.basename(file, path.extname(file)).split(".")[0];
            self.configok = true;
        } else {
            self.log(chalk.red("Mutiple Domain are not allowed at this time"));
            return;
        }
        self.info = await info();

        //self.log(chalk.green("Welcome "+self.info.author.name));
    }

    async prompting() {
        if (!this.configok) {
            //this.log(chalk.green("Nothing to do here"));
            return;
        }
        var self = this;

        self.props = [];
        var prompts = self.config.get("promptValues");
        var prompting = [
            {
                type:"confirm",
                name:"subdoc",
                message:"Is Sub Document domain object?",
                default:false
            },
            {
                type: "confirm",
                name: "entity",
                message: "Is your domain name BaseEntity Derived",
                default: true,
                when:function(answer){ return !answer.subdoc}
            },
            {
                type: "confirm",
                name: "crud",
                message: "Crud Handling Enabled (Create,Update,Delete)",
                default: true,
                when:function(answer){return !answer.subdoc}
            },{
                type: "confirm",
                name: "mongo",
                message: "Using Mongo as Database",
                default: true,
                when:function(answer){return !answer.subdoc}
            }
        ];
        


        if (!prompts || !prompts.name) {
            prompting.unshift({
                type: "input",
                name: "name",
                message: "Domain Name:",
                default: ""
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
            type: 'search-list',
            choices: self.primitiveTypes,
            name: 'attributeType',
            message: 'Define your Domain - Property Type?',
            default: 'string',

        },

        {
            type: 'input',
            name: 'namespace',
            message: 'What is the namespace for this child',
            default: function (answer) {
                return changeCase.pascalCase(answer.attributeName) + "s";
            },
            when: function (answer) {
                answer.isprimitive = self.primitiveTypes.indexOf(answer.attributeType) < (self.primitiveTypes.length - 1);
                return !answer.isprimitive;
            }
        },
        {
            type: 'confirm',
            name: 'repeat',
            message: 'Do you want to add more property?',
            default: 'Y'
        }]


        const loop = async (relevantPrompts) => {
            var resp = await this.prompt(relevantPrompts);
            self.props.push({ name: resp.attributeName, type: resp.attributeType, isprimitive: resp.isprimitive });
            //self.log(chalk.green(self.props));
            if (resp.repeat)
                await loop(columnPrompts);
        }

        await loop(columnPrompts)

        this.config.set({ "domain": this.props });
        this.config.save();


    }
    _writing(from, to) {
        var opts={
            changeCase: changeCase,
            name: this.answers.name,
            props: this.props,
            namespace: this.namespace,
            subdoc:this.answers.subdoc,
            crud: this.answers.crud || false,
            mongo: this.answers.mongo || false,
            base_entity: this.answers.entity || false,
            author: this.info.author
        };
        //this.log(chalk.green(JSON.stringify(opts)));
        this.fs.copyTpl(
            this.templatePath(from),
            this.destinationPath(to),
            opts
        );
    }
    writing() {

        if (!this.configok) {
            //this.log(chalk.green("Nothing to do here"));
            return;
        }
        var self = this;
        // return;
        var tpls = [
            ["domain.cs", changeCase.pascalCase(this.answers.name) + "s/Domain/" + changeCase.pascalCase(this.answers.name) + ".cs"],
            ["dto.cs", changeCase.pascalCase(this.answers.name) + "s/Dto/" + changeCase.pascalCase(this.answers.name) + "Dto.cs"],
            
            ["Profile.cs", changeCase.pascalCase(this.answers.name) + "s/Mapping/" + changeCase.pascalCase(this.answers.name) + "Profile.cs"]
        ];
        var notSubDoc=[
            ["queries/Browse.cs", changeCase.pascalCase(this.answers.name) + "s/Queries/Browse" + changeCase.pascalCase(this.answers.name) + ".cs"],
            ["queries/Get.cs", changeCase.pascalCase(this.answers.name) + "s/Queries/Get" + changeCase.pascalCase(this.answers.name) + ".cs"],
        ]

        var cruds = [
            ["messages/BaseCommand.cs", changeCase.pascalCase(this.answers.name) + "s/Messages/Commands/" + changeCase.pascalCase(this.answers.name) + "BaseCommand.cs"],
            ["messages/Create.cs", changeCase.pascalCase(this.answers.name) + "s/Messages/Commands/Create" + changeCase.pascalCase(this.answers.name) + ".cs"],
            ["messages/Delete.cs", changeCase.pascalCase(this.answers.name) + "s/Messages/Commands/Delete" + changeCase.pascalCase(this.answers.name) + ".cs"],
            ["messages/Update.cs", changeCase.pascalCase(this.answers.name) + "s/Messages/Commands/Update" + changeCase.pascalCase(this.answers.name) + ".cs"],
            ["events/BaseEvent.cs", changeCase.pascalCase(this.answers.name) + "s/Messages/Events/" + changeCase.pascalCase(this.answers.name) + "BaseEvent.cs"],
            ["events/Created.cs", changeCase.pascalCase(this.answers.name) + "s/Messages/Events/" + changeCase.pascalCase(this.answers.name) + "Created.cs"],
            ["events/Updated.cs", changeCase.pascalCase(this.answers.name) + "s/Messages/Events/" + changeCase.pascalCase(this.answers.name) + "Updated.cs"],
            ["events/Deleted.cs", changeCase.pascalCase(this.answers.name) + "s/Messages/Events/" + changeCase.pascalCase(this.answers.name) + "Deleted.cs"],
            ["events/BaseRejected.cs", changeCase.pascalCase(this.answers.name) + "s/Messages/Events/" + changeCase.pascalCase(this.answers.name) + "BaseRejectedEvent.cs"],
            ["events/CreateRejected.cs", changeCase.pascalCase(this.answers.name) + "s/Messages/Events/Create" + changeCase.pascalCase(this.answers.name) + "Rejected.cs"],
            ["events/UpdateRejected.cs", changeCase.pascalCase(this.answers.name) + "s/Messages/Events/Update" + changeCase.pascalCase(this.answers.name) + "Rejected.cs"],
            ["events/DeleteRejected.cs", changeCase.pascalCase(this.answers.name) + "s/Messages/Events/Delete" + changeCase.pascalCase(this.answers.name) + "Rejected.cs"],
        ];
        if(!this.answers.subdoc)
            tpls = tpls.concat(notSubDoc);
        if (this.answers.crud)
            tpls = tpls.concat(cruds);
        tpls.forEach(tpl => {
            this._writing(tpl[0], path.join(self.domainPath, tpl[1]))
        })

    }

    end() {
        var runInMain = this.config.get("runInMainGenerator");
        if (!runInMain)
            this.config.delete("promptValues");
    }

}