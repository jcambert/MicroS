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
        self.log(chalk.green("initializing Domain"));
        self.log(this.options.namespace);
        self.config.set("toto","titi");
        self.log(chalk.green(self.config.get("toto")));
        self.log(self.config.get("domain").name);
        if (self.config.get("domain") === undefined) {
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
        }else{
            self.log(chalk.green(self.config.get("domain").name+" Exist"));
        }
        self.info = await info();

        //self.log(chalk.green("Welcome "+self.info.author.name));
    }

    async prompting() {
        if (!this.configok) {
            this.log(chalk.red("Nothing to do here"));
            return;
        }
        var self = this;

        self.props = [];
        var prompts = self.config.get("promptValues");
        var prompting = [
            {
                type: "confirm",
                name: "subdoc",
                message: "Is Sub Document domain object?",
                default: false
            },
            {
                type: "confirm",
                name: "entity",
                message: "Is your domain name BaseEntity Derived",
                default: true,
                when: function (answer) { return !answer.subdoc }
            },
            {
                type: "confirm",
                name: "crud",
                message: "Crud Handling Enabled (Create,Update,Delete)",
                default: true,
                when: function (answer) { return !answer.subdoc }
            }, {
                type: "confirm",
                name: "mongo",
                message: "Using Mongo as Database",
                default: true,
                //when:function(answer){return !answer.subdoc}
            }
        ];



        if (!prompts || !prompts.name) {
            prompting.unshift({
                type: "input",
                name: "name",
                message: "Domain Name:",
                default: "",
                filter: input => changeCase.pascalCase(input.trim())
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
            default: 'ID',
            filter: input => changeCase.pascalCase(input),
            validate: input => self.props.filter(prop => prop.name == input).some(e => true) ? `the property ${input} is already defined` : true
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
            },
            filter: input => changeCase.pascalCase(input)
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

        this.config.set({ "domain": this.props, subdoc: resp.subdoc });
        this.config.save();


    }
    _writing(from, to) {
        var opts = {
            changeCase: changeCase,
            name: this.answers.name,
            props: this.props,
            namespace: this.namespace,
            subdoc: this.answers.subdoc,
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
            ["domain.cs", this.answers.name + "s/Domain/" + this.answers.name + ".cs"],
            ["dto.cs", this.answers.name + "s/Dto/" + this.answers.name + "Dto.cs"],

            ["Profile.cs", this.answers.name + "s/Mapping/" + this.answers.name + "Profile.cs"]
        ];
        var notSubDoc = [
            ["queries/Browse.cs", this.answers.name + "s/Queries/Browse" + this.answers.name + ".cs"],
            ["queries/Get.cs", this.answers.name + "s/Queries/Get" + this.answers.name + ".cs"],
        ]

        var cruds = [
            ["messages/BaseCommand.cs", this.answers.name + "s/Messages/Commands/" + this.answers.name + "BaseCommand.cs"],
            ["messages/Create.cs", this.answers.name + "s/Messages/Commands/Create" + this.answers.name + ".cs"],
            ["messages/Delete.cs", this.answers.name + "s/Messages/Commands/Delete" + this.answers.name + ".cs"],
            ["messages/Update.cs", this.answers.name + "s/Messages/Commands/Update" + this.answers.name + ".cs"],
            ["events/BaseEvent.cs", this.answers.name + "s/Messages/Events/" + this.answers.name + "BaseEvent.cs"],
            ["events/Created.cs", this.answers.name + "s/Messages/Events/" + this.answers.name + "Created.cs"],
            ["events/Updated.cs", this.answers.name + "s/Messages/Events/" + this.answers.name + "Updated.cs"],
            ["events/Deleted.cs", this.answers.name + "s/Messages/Events/" + this.answers.name + "Deleted.cs"],
            ["events/BaseRejected.cs", this.answers.name + "s/Messages/Events/" + this.answers.name + "BaseRejectedEvent.cs"],
            ["events/CreateRejected.cs", this.answers.name + "s/Messages/Events/Create" + this.answers.name + "Rejected.cs"],
            ["events/UpdateRejected.cs", this.answers.name + "s/Messages/Events/Update" + this.answers.name + "Rejected.cs"],
            ["events/DeleteRejected.cs", this.answers.name + "s/Messages/Events/Delete" + this.answers.name + "Rejected.cs"],
        ];
        if (!this.answers.subdoc)
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