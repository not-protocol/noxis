/**
 * NOXIS History Engine
 * Tracks session command history. Arrow up/down navigation.
 */

const MAX_HISTORY = 100;

let entries = [];
let pointer = -1; // -1 = at current (empty) input

function push(cmd) {
  // Don't store duplicates consecutively
  if (entries[entries.length - 1] === cmd) {
    pointer = -1;
    return;
  }

  entries.push(cmd);

  if (entries.length > MAX_HISTORY) {
    entries.shift();
  }

  // Reset pointer to current
  pointer = -1;
}

function prev() {
  if (entries.length === 0) return null;

  if (pointer === -1) {
    pointer = entries.length - 1;
  } else if (pointer > 0) {
    pointer--;
  }

  return entries[pointer];
}

function next() {
  if (entries.length === 0 || pointer === -1) return null;

  if (pointer < entries.length - 1) {
    pointer++;
    return entries[pointer];
  }

  // Back to blank input
  pointer = -1;
  return '';
}

function getAll() {
  return [...entries];
}

module.exports = { push, prev, next, getAll };
