/**
 * NOXIS Command: noxis (with subcommands)
 * noxis status — system status display
 */

const G = '\x1b[38;2;0;255;156m';
const BLUE = '\x1b[38;2;100;160;255m';
const RED = '\x1b[38;2;255;77;77m';
const DIM = '\x1b[90m';
const W = '\x1b[97m';
const R = '\x1b[0m';

module.exports = {
  name: 'noxis',
  description: 'NOXIS system commands (status, version, info)',
  usage: 'noxis <status|version|info>',

  execute(args) {
    const sub = args[0]?.toLowerCase();

    switch (sub) {
      case 'status':
        return status();
      case 'version':
        return version();
      case 'info':
        return info();
      default:
        return [
          '',
          `${G}NOXIS${R} ${DIM}— system commands${R}`,
          '',
          `  ${G}noxis status${R}   ${DIM}Show system status${R}`,
          `  ${G}noxis version${R}  ${DIM}Show version info${R}`,
          `  ${G}noxis info${R}     ${DIM}Show extended info${R}`,
          '',
        ].join('\n');
    }
  },
};

function status() {
  return [
    '',
    `${DIM}System Status:${R}`,
    `  ${G}✓${R} ${W}Core Engine Running${R}`,
    `  ${G}✓${R} ${W}VFS Loaded${R}`,
    `  ${G}✓${R} ${W}Command Registry Active${R}`,
    `  ${DIM}○${R} ${DIM}CRYON AI — Not Connected (Phase 2)${R}`,
    `  ${DIM}○${R} ${DIM}Plugin System — Not Loaded (Phase 3)${R}`,
    '',
  ].join('\n');
}

function version() {
  return [
    '',
    `  ${G}NOXIS${R}    ${W}v1.0.0${R}`,
    `  ${BLUE}CRYON${R}    ${DIM}Ecosystem${R}`,
    `  ${DIM}Node.js${R}  ${W}${process.version}${R}`,
    '',
  ].join('\n');
}

function info() {
  return [
    '',
    `${G}NOXIS Terminal${R}`,
    `${DIM}The first product under CRYON.${R}`,
    '',
    `  ${DIM}Phase:${R}      ${W}1 — Core Engine${R}`,
    `  ${DIM}Stack:${R}      ${W}Node.js → Python → Rust${R}`,
    `  ${DIM}Platform:${R}   ${W}Windows + Android${R}`,
    `  ${DIM}License:${R}    ${W}CRYON Proprietary${R}`,
    '',
  ].join('\n');
}
