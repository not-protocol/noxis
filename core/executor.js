/**
 * NOXIS Executor
 * The router. Matches parsed commands to their handlers.
 * This is the brain of the command flow.
 *
 * Flow: parse → executor → command handler → output
 */

const { parse } = require('./parser');
const path = require('path');
const fs = require('fs');

// Command registry — loaded once at startup
const commandRegistry = new Map();

/**
 * Load all command files from /commands directory.
 * Each file exports: { name, description, execute }
 */
function loadCommands() {
  const commandsDir = path.join(__dirname, '..', 'commands');
  const files = fs.readdirSync(commandsDir).filter(f => f.endsWith('.js'));

  for (const file of files) {
    const cmd = require(path.join(commandsDir, file));
    if (cmd.name && typeof cmd.execute === 'function') {
      commandRegistry.set(cmd.name, cmd);

      // Register aliases if any
      if (Array.isArray(cmd.aliases)) {
        for (const alias of cmd.aliases) {
          commandRegistry.set(alias, cmd);
        }
      }
    }
  }
}

// Load on startup
loadCommands();

/**
 * Execute a raw input string.
 * Returns output string, '__CLEAR__', '__EXIT__', or null.
 */
async function execute(rawInput) {
  const parsed = parse(rawInput);

  if (!parsed) return null;

  const { command, args } = parsed;

  // Look up in registry
  const handler = commandRegistry.get(command);

  if (!handler) {
    return colorize(
      `noxis: command not found: \x1b[38;2;255;77;77m${command}\x1b[0m\n\x1b[90mType 'help' to see available commands.\x1b[0m`,
      'error'
    );
  }

  try {
    const result = await handler.execute(args, { registry: commandRegistry });
    return result;
  } catch (err) {
    return colorize(`noxis: error executing '${command}': ${err.message}`, 'error');
  }
}

function colorize(text, type) {
  const colors = {
    error: '\x1b[38;2;255;77;77m',
    success: '\x1b[38;2;0;255;156m',
    system: '\x1b[90m',
    reset: '\x1b[0m',
  };
  return `${colors[type] || ''}${text}${colors.reset}`;
}

module.exports = { execute, commandRegistry };
