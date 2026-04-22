/**
 * NOXIS Command: history
 * Shows session command history.
 */

const historyEngine = require('../core/history');

const G = '\x1b[38;2;0;255;156m';
const DIM = '\x1b[90m';
const W = '\x1b[97m';
const R = '\x1b[0m';

module.exports = {
  name: 'history',
  description: 'Show command history for this session',
  usage: 'history',

  execute() {
    const entries = historyEngine.getAll();

    if (entries.length === 0) {
      return `${DIM}No commands in history yet.${R}`;
    }

    const lines = ['', `${DIM}Session history:${R}`, ''];

    entries.forEach((cmd, i) => {
      const num = String(i + 1).padStart(3, ' ');
      lines.push(`  ${DIM}${num}${R}  ${W}${cmd}${R}`);
    });

    lines.push('');
    return lines.join('\n');
  },
};
