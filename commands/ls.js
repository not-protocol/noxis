/**
 * NOXIS Command: ls
 * Lists contents of current (or target) virtual directory.
 * Supports: ls, ls <path>, ls -la
 */

const vfs = require('../core/vfs');

const G = '\x1b[38;2;0;255;156m';
const BLUE = '\x1b[38;2;100;160;255m';
const DIM = '\x1b[90m';
const W = '\x1b[97m';
const R = '\x1b[0m';

module.exports = {
  name: 'ls',
  description: 'List directory contents',
  usage: 'ls [-la] [path]',

  execute(args) {
    // Parse flags and path from args
    let detailed = false;
    let targetPath = null;

    for (const arg of args) {
      if (arg.startsWith('-')) {
        if (arg.includes('l') || arg.includes('a')) detailed = true;
      } else {
        targetPath = arg;
      }
    }

    const absPath = targetPath
      ? vfs.buildAbsPath(targetPath)
      : vfs.getCurrentPath();

    const node = vfs.getNodeAt(absPath);

    if (!node) {
      return `\x1b[38;2;255;77;77mnoxis: ls: cannot access '${targetPath}': No such file or directory\x1b[0m`;
    }

    if (node.type === 'file') {
      return `${W}${targetPath || absPath}${R}`;
    }

    if (!node.children || Object.keys(node.children).length === 0) {
      return `${DIM}(empty directory)${R}`;
    }

    const entries = Object.entries(node.children);

    if (detailed) {
      // Detailed ls -la style
      const lines = [''];
      lines.push(`${DIM}total ${entries.length}${R}`);
      lines.push(`${DIM}${'Permissions'.padEnd(14)} ${'Size'.padEnd(8)} ${'Modified'.padEnd(14)} Name${R}`);
      lines.push(`${DIM}${'─'.repeat(55)}${R}`);

      for (const [name, entry] of entries) {
        const perms = entry.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--';
        const size = entry.size || '—';
        const mod = entry.modified || '—';
        const nameStr = entry.type === 'dir'
          ? `${BLUE}${name}/${R}`
          : `${W}${name}${R}`;
        lines.push(`  ${DIM}${perms.padEnd(14)} ${size.padEnd(8)} ${mod.padEnd(14)}${R} ${nameStr}`);
      }

      lines.push('');
      return lines.join('\n');
    }

    // Simple listing — inline
    const items = entries.map(([name, entry]) => {
      return entry.type === 'dir' ? `${BLUE}${name}/${R}` : `${W}${name}${R}`;
    });

    return '\n  ' + items.join('  ') + '\n';
  },
};
