/**
 * NOXIS Command: exit
 * Gracefully terminate the session.
 */

module.exports = {
  name: 'exit',
  description: 'Exit NOXIS terminal session',
  usage: 'exit',
  aliases: ['quit', 'q'],

  execute() {
    return '__EXIT__';
  },
};
