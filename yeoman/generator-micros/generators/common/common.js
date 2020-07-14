const chalk = require("chalk");
const yosay = require("yosay");
const glob = require("glob-promise");
const path = require('path');
const changeCase = require('change-case');
var infos = require( "../../info");
var create_paths = function (pathname) {
    console.log(pathname);
    return { name: pathname.split('/').pop().replace(".csproj", ""), path: path.dirname(pathname), project: pathname };
}

if (!String.format) {
    String.prototype.format = function() {
        
      var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
          ? args[number] 
          : args[ match]
        ;
      });
    };
  }
module.exports = class {
    constructor(generator,namespace) {
        //console.log("namespace:"+namespace);
        this.generator = generator;
        this.namespace=namespace;
        this.config = generator.config;
        this.log = generator.log;
        this.options=generator.options;
        this.generator.env.adapter.promptModule.registerPrompt("search-list", require("inquirer-search-list"));
        this.primitiveTypes = ["string", "bool", "byte", "sbyte", "char","DateTime", "decimal", "double", "float", "int", "uint", "long", "ulong", "short", "ushort", "object", "other"];
        this.supportedDynamicType=["string","int","double","DateTime","bool"];
        if (this.options.namespace == this.namespace)
            this.clear();
        var availables=this.config.get('availables') || [];
        availables.push(this.namespace);
        this.config.set('availables', availables);
        this.config.set('answers',this.config.get('answers') || {});
    }
    throwIfUndefined(value,msg){
        if(value==undefined){
            this.log(chalk.red("There is no api project => Aborting"));
            throw "There is no api project => Aborting";
        }
    }
    async initializing() {
        if (this.config.get("micros")) return;
        var info = await infos();
        var files = await glob("**/*.csproj", { cwd: process.cwd() });
       
        //Search Api Project
        var api_file = files.filter(file => file.match(/api/i))[0];
        this.throwIfUndefined(api_file,"There is no api project => Aborting");
        var api = create_paths(api_file);

        //Search Domain Project
        var domain_file = files.filter(file => file.match(/domain/i))[0];
        var domain = create_paths(domain_file);
        this.throwIfUndefined(domain,"There is no domain project => Aborting");

        //Search Services Projects
        var services_files = files.filter(file => file.match(/services/i));
        var services = services_files.map(create_paths);
        this.config.set(Object.assign({ micros: true , api: api , domain: domain , services: services,author:info.author}));
    }
    using(){return this.config.get("generators").indexOf(this.namespace)>-1;}

    clear() {
        //this.log("Clearing");
        ['micros','answers', 'promptValues'].forEach(key => this.config.delete(key));
    }
    prompt() {
       // console.log(arguments);
        return this.generator
            .prompt
            .apply(this.generator, arguments);
    }
    async ask(prompts){
        const self = this;

        var answers = Object.assign({}, self.config.get('answers'), await self.prompt(prompts));
        self.config.set('answers', answers);
        return answers;
    }

    async askLoop(prompts,name,callback){
        var self=this;
        var _prompts=prompts.slice();
        //self.log(arguments);
        var loopResponses=[];
        _prompts.push({
            type: 'confirm',
            name: 'repeat',
            message: 'Do you want to add more?',
            default: 'Y'
        });
        //self.log("** PROMPTS **");
        //self.log(_prompts);
        const loop = async (relevantPrompts) => {
            var resp = await this.generator.prompt(relevantPrompts);
            loopResponses.push(callback(resp));
            self.log("** RESP **");
            self.log(resp);
            //self.log(chalk.green(self.props));
            if (resp.repeat)
                await loop(_prompts);
        }
        await loop(_prompts);
        var answers = Object.assign({}, self.config.get('answers'));
        answers[name]=loopResponses.slice();
        self.config.set('answers',answers);
        loopResponses=[];
    }

    writing(from, to,opts) {
        var self=this;
        self.generator.fs.copyTpl(self.generator.templatePath(from),self.generator.destinationPath(to),opts);
    }

    hello(msg) {
        this.log(
            yosay(`Welcome to the ${chalk.green("generator-micros")} generator!\nYou are in ${chalk.green(msg || this.generator.options.namespace)} application`)
        );
    }
    async askForApplicationName() {
        const self = this;
        await this.ask([
            {
                type: "input",
                name: "appname",
                message: "Your application name",
                default: self.generator.appname,
                store: true,
                when: self.config.get('answers').appname === undefined,
                validate: input=>input.trim().length>0?true:"Application name cannot be empty",
                filter:input=>changeCase.lowerCase(input)
            }
        ]);
       
    }

    async askForServiceName(){
        const self=this;
        await this.ask([
            {
                type: "search-list",
                choices:self.config.get('services').map(service=>service.name.split('.').pop()),
                name: "service",
                message: "Service to work into:",
                store: true,
                when: self.config.get('answers').service === undefined,
                filter: input => self.config.get('services').filter(service=>service.name.split('.').pop() == input)[0]
              },
        ]);
    }

   // CamelCaseTransformer(input){return changeCase.camelCase(input)}

    async askForDomain(complete=true){
        const self=this;
        var prompts=[
            {
                type: "input",
                name: "domain",
                message: "Domain Name:",
                validate: input=>input.trim().length>0,
                filter: input => changeCase.camelCase(input).replace(/[s]*$/i, ''),
                transformer: input => changeCase.camelCase(input).replace(/[s]*$/i, ''),
                store:true
              }
            
        ]
        if(complete){
            prompts=prompts.concat([{
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
            }]);
        }
        await this.ask(prompts);
    }
    async askForDomainProperties(){
        const self=this;
        var columnPrompts = [
            {
            type: 'input',
            name: 'attributeName',
            message: 'Define your Domain - Property Name?',
            validate: input =>(input.trim().length>0  )? true: `the property ${input} must not be empty or is already defined`,
            transformer: input => changeCase.pascalCase(input.trim()),
            filter: input => changeCase.pascalCase(input.trim())
        },{
            type: 'search-list',
            choices: self.primitiveTypes,
            name: 'attributeType',
            message: 'Define your Domain - Property Type?',
            default: 'string',

        },{
            type: "confirm",
            name:'attributeDynamic',
            message: 'Define your Domain - Is Dynamic Property ?',
            default:false,
            when:function(answer){
                return self.supportedDynamicType.indexOf(answer.attributeType)>=0;
            }
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
        }];

        await this.askLoop(columnPrompts,"props",resp=>{ return { name: resp.attributeName, type: resp.attributeType, isprimitive: resp.isprimitive,dynamic:resp.attributeDynamic,namespace:resp.namespace }});
    }
}
