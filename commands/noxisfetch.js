/**
 * NOXIS Command: noxisfetch
 * System info display — NOXIS style neofetch.
 */

const os = require('os');

const G = '\x1b[38;2;0;255;156m';
const BLUE = '\x1b[38;2;100;160;255m';
const DIM = '\x1b[90m';
const W = '\x1b[97m';
const R = '\x1b[0m';
const BOLD = '\x1b[1m';

const LOGO = [
  `${G}  ███╗   ██╗ ██████╗ ██╗  ██╗██╗███████╗${R}`,
  `${G}  ████╗  ██║██╔═══██╗╚██╗██╔╝██║██╔════╝${R}`,
  `${G}  ██╔██╗ ██║██║   ██║ ╚███╔╝ ██║███████╗${R}`,
  `${G}  ██║╚██╗██║██║   ██║ ██╔██╗ ██║╚════██║${R}`,
  `${G}  ██║ ╚████║╚██████╔╝██╔╝ ██╗██║███████║${R}`,
  `${G}  ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝${R}`,
];

module.exports = {
  name: 'noxisfetch',
  description: 'Display NOXIS system info (like neofetch)',
  usage: 'noxisfetch',

  execute() {
    const platform = os.platform();
    const arch = os.arch();
    const totalRAM = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1) + 'GB';
    const freeRAM = (os.freemem() / 1024 / 1024 / 1024).toFixed(1) + 'GB';
    const cpus = os.cpus();
    const cpuModel = cpus[0]?.model?.trim() || 'Unknown CPU';
    const nodeVer = process.version;
    const uptime = formatUptime(os.uptime());

    const info = [
      `${G}${BOLD}noxis@core${R}`,
      `${DIM}──────────────────────────────${R}`,
      `${DIM}System:${R}    ${W}NOXIS CLI Environment${R}`,
      `${DIM}Engine:${R}    ${W}Node.js ${nodeVer}${R}`,
      `${DIM}AI:${R}        ${W}CRYON AI (pending)${R}`,
      `${DIM}Mode:${R}      ${W}Core${R}`,
      `${DIM}──────────────────────────────${R}`,
      `${DIM}OS:${R}        ${W}${platform} ${arch}${R}`,
      `${DIM}CPU:${R}       ${W}${cpuModel.substring(0, 30)}${R}`,
      `${DIM}RAM:${R}       ${W}${freeRAM} free / ${totalRAM} total${R}`,
      `${DIM}Uptime:${R}    ${W}${uptime}${R}`,
      `${DIM}──────────────────────────────${R}`,
      `${DIM}Version:${R}   ${G}v1.0.0${R}`,
      `${DIM}Brand:${R}     ${BLUE}CRYON Ecosystem${R}`,
    ];

    // Merge logo lines with info lines
    const maxLines = Math.max(LOGO.length, info.length);
    const output = [''];

    for (let i = 0; i < maxLines; i++) {
      const logoLine = LOGO[i] || ' '.repeat(42);
      const infoLine = info[i] || '';
      output.push(`${logoLine}   ${infoLine}`);
    }

    output.push('');
    return output.join('\n');
  },
};

function formatUptime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}
