/**
 * NOXIS Boot Screen
 * The signature moment. 1-2 second sequence.
 */

const G = '\x1b[38;2;0;255;156m';
const BLUE = '\x1b[38;2;100;160;255m';
const DIM = '\x1b[90m';
const W = '\x1b[97m';
const R = '\x1b[0m';

function bootScreen() {
  console.clear();

  const lines = [
    '',
    `${G}  NOXIS v1.0.0${R}`,
    `  ${DIM}powered by ${BLUE}CRYON${R}`,
    '',
    `  ${DIM}Initializing core...${R}`,
    `  ${DIM}Loading command registry...${R}`,
    `  ${DIM}Mounting virtual filesystem...${R}`,
    '',
    `  ${G}Ready.${R}`,
    '',
    `  ${DIM}Type 'help' to see available commands.${R}`,
  ];

  for (const line of lines) {
    console.log(line);
  }
}

module.exports = { bootScreen };
