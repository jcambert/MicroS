"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const info = require(require.resolve("../../info"));
const path = require('path');
var glob = require("glob-promise");
var create_paths=function(pathname){
  return {name:pathname.split('/').pop().replace(".csproj",""),path:path.dirname(pathname),project:pathname};
}

module.exports = class extends Generator {
  constructor(arg, opt) {
    super(arg, opt);

  }
  async initializing() {
    var self=this;
    self.log(chalk.green("initializing Main"));
    //this.log(this);
    self.env.adapter.promptModule.registerPrompt("search-list", require("inquirer-search-list"));
    //self.log(this.appname);
    var files = await glob("**/*.csproj", { cwd: process.cwd() });
    //self.log(files);
    var api_file=files.filter(file=>file.match(/api/i))[0];
    var api=create_paths(api_file);
    var domain_file=files.filter(file=>file.match(/domain/i))[0];
    var domain=create_paths(domain_file);
    //self.log("api:"+JSON.stringify( api));
    var services_files=files.filter(file=>file.match(/services/i));
    var services=services_files.map(create_paths);
    //self.log("services:"+ JSON.stringify( services));
    this.composeWith(require.resolve('../domain'));
    this.composeWith(require.resolve('../handler'));
    this.config.delete("promptValues");
    this.config.set(Object.assign({},{ "runInMainGenerator": true },{api:api},{domain:domain},{services:services}));
    //self.log(JSON.stringify(this.config.get("services")));

    this.config.save();
    this.answers = {
      deletecache: true

    };

  }
  async prompting() {
    var self=this;
    self.log(
      yosay(`Welcome to the ${chalk.red("generator-micros")} generator!\nYou are in ${self.appname} application`)
    );

    self.answers = Object.assign({}, self.answers, await self.prompt([
      {
        type:"input",
        name:"appname",
        message:"your application name",
        default:self.appname,
        store:true
      },
      {
        type: "input",
        name: "name",
        message: "Domain Name:",
        default: self.config.get("domain").name,
        store:true
      },
    ])
    );
  }


  end() {
    this.config.delete("promptValues");
  }

}