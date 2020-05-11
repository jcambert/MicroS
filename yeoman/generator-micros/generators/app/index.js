"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const info = require(require.resolve("../../info"));
const path = require('path');
module.exports = class extends Generator {
  constructor(arg, opt) {
    super(arg, opt);

  }
  initializing() {


    this.composeWith(require.resolve('../domain'));
    this.composeWith(require.resolve('../handler'));
    this.config.delete("promptValues");
    this.config.set({ "runInMainGenerator": true });
    this.config.save();
    this.answers = {
      deletecache: true

    };

  }
  async prompting() {
    this.log(
      yosay(`Welcome to the ${chalk.red("generator-micros")} generator!`)
    );

    this.answers = Object.assign({}, this.answers, await this.prompt([

      {
        type: "input",
        name: "name",
        message: "Domain Name:",
        default: "",
        store: true
      },
    ])
    );
  }


  end() {
    this.config.delete("promptValues");
  }

}