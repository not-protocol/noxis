/**
 * NOXIS Command: whoami
 * Shows current user identity in the NOXIS system.
 */

const G = '\x1b[38;2;0;255;156m';
const DIM = '\x1b[90m';
const W = '\x1b[97m';
const R = '\x1b[0m';

module.exports = {
  name: 'whoami',
  description: 'Display current user identity',
  usage: 'whoami',

  execute() {
    return [
      '',
      `${G}noxis${R}`,
      `${DIM}─────────────────────${R}`,
      `  ${DIM}User:${R}        ${W}user${R}`,
      `  ${DIM}Host:${R}        ${W}noxis-core${R}`,
      `  ${DIM}Shell:${R}       ${W}NOXIS v1.0.0${R}`,
      `  ${DIM}Engine:${R}      ${W}Node.js${R}`,
      `  ${DIM}Ecosystem:${R}   ${W}CRYON${R}`,
      '',
    ].join('\n');
  },
};
