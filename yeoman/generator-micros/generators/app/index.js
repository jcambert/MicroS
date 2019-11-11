"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  constructor(arg, opt) {
    super(arg, opt);
    
  }
  initializing() {
    this.composeWith(require.resolve('../create-domain'));
    this.composeWith(require.resolve('../create-handler'));
    this.config.delete("promptValues");
    this.answers = {};
  }
  async prompting() {
    this.log(
      yosay(`Welcome to the rad ${chalk.red("generator-micros")} generator!`)
    );

    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Domain Name:",
        default: "cotation",
        store: true
      },
      {
        type: "confirm",
        name: "deletecache",
        message: "Supprimer le cache:",
        default: "Y",
      }
    ]);
    //this.log("Handler Name:", this.answers.name);
  }
  writing(){
    this.log("MicroS writing");
  }

  end(){
    if(this.deletecache)
      this.config.delete("promptValues")
  }
};



