/**
 * NOXIS Parser
 * Turns raw string input into a structured command object.
 *
 * Input:  "echo hello world"
 * Output: { command: 'echo', args: ['hello', 'world'], raw: 'echo hello world' }
 */

function parse(input) {
  if (!input || typeof input !== 'string') {
    return null;
  }

  const trimmed = input.trim();
  if (!trimmed) return null;

  // Split on whitespace, respecting quoted strings
  const tokens = tokenize(trimmed);

  if (tokens.length === 0) return null;

  return {
    command: tokens[0].toLowerCase(),
    args: tokens.slice(1),
    raw: trimmed,
  };
}

/**
 * Tokenizer — handles quoted strings as single tokens.
 * e.g. echo "hello world" → ['echo', 'hello world']
 */
function tokenize(str) {
  const tokens = [];
  let current = '';
  let inQuote = false;
  let quoteChar = '';

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];

    if (inQuote) {
      if (ch === quoteChar) {
        inQuote = false;
        tokens.push(current);
        current = '';
      } else {
        current += ch;
      }
    } else if (ch === '"' || ch === "'") {
      inQuote = true;
      quoteChar = ch;
    } else if (ch === ' ') {
      if (current) {
        tokens.push(current);
        current = '';
      }
    } else {
      current += ch;
    }
  }

  if (current) tokens.push(current);
  return tokens;
}

module.exports = { parse };
