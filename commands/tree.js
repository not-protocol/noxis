/**
 * NOXIS Command: tree
 * Renders virtual filesystem as a tree diagram.
 */

const vfs = require('../core/vfs');

const G = '\x1b[38;2;0;255;156m';
const BLUE = '\x1b[38;2;100;160;255m';
const DIM = '\x1b[90m';
const W = '\x1b[97m';
const R = '\x1b[0m';

module.exports = {
  name: 'tree',
  description: 'Display directory tree structure',
  usage: 'tree [path]',

  execute(args) {
    const targetPath = args[0] ? vfs.buildAbsPath(args[0]) : vfs.getCurrentPath();
    const node = vfs.getNodeAt(targetPath);

    if (!node) {
      return `\x1b[38;2;255;77;77mnoxis: tree: ${args[0]}: No such file or directory\x1b[0m`;
    }

    if (node.type === 'file') {
      return `${W}${targetPath}${R}`;
    }

    const lines = ['', `${BLUE}${targetPath}/${R}`];
    renderTree(node, '', lines);
    lines.push('');
    return lines.join('\n');
  },
};

function renderTree(node, prefix, lines) {
  if (!node.children) return;

  const entries = Object.entries(node.children);

  entries.forEach(([name, child], index) => {
    const isLast = index === entries.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const childPrefix = prefix + (isLast ? '    ' : '│   ');

    const nameStr = child.type === 'dir'
      ? `${BLUE}${name}/${R}`
      : `${W}${name}${R}`;

    lines.push(`${DIM}${prefix}${connector}${R}${nameStr}`);

    if (child.type === 'dir') {
      renderTree(child, childPrefix, lines);
    }
  });
}
