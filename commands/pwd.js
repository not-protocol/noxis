/**
 * NOXIS Command: pwd
 * Print current working directory.
 */

const vfs = require('../core/vfs');

module.exports = {
  name: 'pwd',
  description: 'Print the current working directory',
  usage: 'pwd',

  execute() {
    return '\x1b[38;2;0;255;156m' + vfs.getCurrentPath() + '\x1b[0m';
  },
};
