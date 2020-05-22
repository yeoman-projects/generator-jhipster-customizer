const chalk = require('chalk');
const debug = require('debug')('customizer:entity:client');

const jhipsterEnv = require('../../lib/environment');

module.exports = class extends jhipsterEnv.generator('entity-client', {root: true}) {
  constructor(args, options) {
    debug(`Initializing entity-client blueprint: ${options.context.name}`);
    super(args, options);

    if (!this.configOptions) {
      this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint customizer')}`);
    }
  }

  emptyFunc() {}
};
