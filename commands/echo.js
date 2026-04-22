/**
 * NOXIS Command: echo
 * Prints arguments back to terminal.
 */

module.exports = {
  name: 'echo',
  description: 'Print text to the terminal',
  usage: 'echo <text>',

  execute(args) {
    if (args.length === 0) return '';
    return '\x1b[97m' + args.join(' ') + '\x1b[0m';
  },
};
