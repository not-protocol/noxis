/**
 * NOXIS Command: clear
 * Clears terminal output.
 */

module.exports = {
  name: 'clear',
  description: 'Clear the terminal screen',
  usage: 'clear',
  aliases: ['cls'],

  execute() {
    // Special sentinel — index.js handles the actual console.clear()
    return '__CLEAR__';
  },
};
