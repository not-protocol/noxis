/**
 * NOXIS v1.0.0
 * Powered by CRYON
 * Entry point — the engine starts here.
 */

const readline = require('readline');
const executor = require('./core/executor');
const { bootScreen } = require('./utils/boot');
const history = require('./core/history');

// Boot sequence
bootScreen();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

const prompt = () => {
  process.stdout.write('\n\x1b[38;2;0;255;156m[noxis@core]\x1b[0m \x1b[90m$\x1b[0m ');
};

prompt();

rl.input.on('keypress', (char, key) => {
  if (!key) return;

  // Arrow up — cycle back through history
  if (key.name === 'up') {
    const cmd = history.prev();
    if (cmd !== null) {
      rl.line = '';
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      process.stdout.write('\x1b[38;2;0;255;156m[noxis@core]\x1b[0m \x1b[90m$\x1b[0m ' + cmd);
      rl.line = cmd;
      rl.cursor = cmd.length;
    }
  }

  // Arrow down — cycle forward through history
  if (key.name === 'down') {
    const cmd = history.next();
    if (cmd !== null) {
      rl.line = '';
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      process.stdout.write('\x1b[38;2;0;255;156m[noxis@core]\x1b[0m \x1b[90m$\x1b[0m ' + cmd);
      rl.line = cmd;
      rl.cursor = cmd.length;
    }
  }
});

rl.on('line', async (input) => {
  const trimmed = input.trim();

  // Empty input — just re-prompt
  if (!trimmed) {
    prompt();
    return;
  }

  // Store in history
  history.push(trimmed);

  // Execute
  const result = await executor.execute(trimmed);

  if (result === '__CLEAR__') {
    console.clear();
  } else if (result === '__EXIT__') {
    console.log('\n\x1b[90mNOXIS session terminated.\x1b[0m\n');
    rl.close();
    process.exit(0);
  } else if (result) {
    console.log('\n' + result);
  }

  prompt();
});

rl.on('close', () => {
  console.log('\n\x1b[90mNOXIS session terminated.\x1b[0m\n');
  process.exit(0);
});
