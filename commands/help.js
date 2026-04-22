/**
 * NOXIS Command: help
 * Lists all registered commands with descriptions.
 */

const G = '\x1b[38;2;0;255;156m';  // neon green
const DIM = '\x1b[90m';             // dim gray
const W = '\x1b[97m';               // bright white
const R = '\x1b[0m';                // reset

module.exports = {
  name: 'help',
  description: 'List all available commands',
  usage: 'help [command]',

  execute(args, ctx) {
    const registry = ctx?.registry;

    // help <command> — show specific command detail
    if (args.length > 0) {
      const target = args[0].toLowerCase();
      const cmd = registry?.get(target);

      if (!cmd) {
        return `\x1b[38;2;255;77;77mnoxis: no help entry for '${target}'\x1b[0m`;
      }

      return [
        '',
        `${G}${cmd.name}${R}`,
        `  ${DIM}Description:${R} ${cmd.description}`,
        `  ${DIM}Usage:${R}       ${W}${cmd.usage || cmd.name}${R}`,
        cmd.aliases ? `  ${DIM}Aliases:${R}     ${cmd.aliases.join(', ')}` : '',
      ].filter(l => l !== '').join('\n');
    }

    // Full help listing
    if (!registry) {
      return `${DIM}No commands loaded.${R}`;
    }

    // Deduplicate (aliases point to same cmd object)
    const seen = new Set();
    const cmds = [];
    for (const [, cmd] of registry) {
      if (!seen.has(cmd.name)) {
        seen.add(cmd.name);
        cmds.push(cmd);
      }
    }

    // Sort alphabetically
    cmds.sort((a, b) => a.name.localeCompare(b.name));

    const lines = [
      '',
      `${G}NOXIS v1.0.0${R} ${DIM}// powered by CRYON${R}`,
      `${DIM}─────────────────────────────────────${R}`,
      '',
      `${DIM}Available commands:${R}`,
      '',
    ];

    for (const cmd of cmds) {
      const nameCol = `${G}${cmd.name.padEnd(14)}${R}`;
      lines.push(`  ${nameCol}${DIM}${cmd.description}${R}`);
    }

    lines.push('');
    lines.push(`${DIM}Type 'help <command>' for details on a specific command.${R}`);
    lines.push('');

    return lines.join('\n');
  },
};
