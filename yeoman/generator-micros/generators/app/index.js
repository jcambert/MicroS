"use strict";
const Generator = require("yeoman-generator");
const micros = require("./../common/common");
const chalk = require("chalk");
const yosay = require("yosay");
/*const info = require(require.resolve("../../info"));
const path = require('path');
var glob = require("glob-promise");
var create_paths = function (pathname) {
  return { name: pathname.split('/').pop().replace(".csproj", ""), path: path.dirname(pathname), project: pathname };
}*/

module.exports = class extends Generator {
  constructor(arg, opt) {
    super(arg, opt);
    //this.micros = new micros(this);
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
      choices: self.config.get('availables'),//["micros:domain","micros:handler"],
      name: "generators",
      message: "Choose generators",
    }]);
    this.config.set('generators', resp.generators);
  }
  end() {
    this.log(chalk.green("Bye !"));
  }

}