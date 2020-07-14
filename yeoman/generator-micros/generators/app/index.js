"use strict";
const Generator = require("yeoman-generator");
const micros = require("./../common/common");
const chalk = require("chalk");
const yosay = require("yosay");


module.exports = class extends Generator {
  constructor(arg, opt) {
    super(arg, opt);
    ['generators','availables'].forEach(key => this.config.delete(key));
  }
  async initializing() {

    this.composeWith(require.resolve('../domain'));
    this.composeWith(require.resolve('../handler'));
    this.composeWith(require.resolve('../api'));
  }
  async prompting() {
    var self = this;
    this.log(
      yosay(`Welcome to the ${chalk.green("generator-micros")} generator!\nYou are in ${chalk.green( this.options.namespace)} application`)
    );
    var resp = await this.prompt([{
      type: "checkbox",
      choices: self.config.get('availables'),
      name: "generators",
      message: "Choose generators",
    }]);
    this.config.set('generators', resp.generators);
  }
  end() {
    this.log(chalk.green("Bye !"));
  }

}