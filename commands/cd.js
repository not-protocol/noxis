/**
 * NOXIS Command: cd
 * Change current directory in the virtual file system.
 */

const vfs = require('../core/vfs');

const G = '\x1b[38;2;0;255;156m';
const DIM = '\x1b[90m';
const R = '\x1b[0m';

module.exports = {
  name: 'cd',
  description: 'Change the current directory',
  usage: 'cd <path>',

  execute(args) {
    if (args.length === 0) {
      // cd with no args → go home
      vfs.setCurrentPath('/home/user');
      return `${DIM}→ /home/user${R}`;
    }

    const target = args[0];
    const absPath = vfs.buildAbsPath(target);
    const node = vfs.getNodeAt(absPath);

    if (!node) {
      return `\x1b[38;2;255;77;77mnoxis: cd: ${target}: No such file or directory\x1b[0m`;
    }

    if (node.type === 'file') {
      return `\x1b[38;2;255;77;77mnoxis: cd: ${target}: Not a directory\x1b[0m`;
    }

    vfs.setCurrentPath(absPath);
    return `${DIM}→ ${absPath}${R}`;
  },
};
