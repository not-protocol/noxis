# NOXIS Terminal
### The first product under CRYON.

```
  NOXIS v1.0.0
  powered by CRYON
```

---

## What is NOXIS?

A minimal, controlled, and extensible terminal environment.  
Not a Linux shell clone. A system with identity.

---

## Stack

- **Node.js** — Core engine (this phase)
- **Python** — CRYON AI layer (Phase 2)
- **Rust** — Performance engine (Phase 3)

---

## Run

```bash
node index.js
```

Or with npm:

```bash
npm start
```

---

## Commands (MVP)

| Command       | Description                          |
|---------------|--------------------------------------|
| `help`        | List all commands                    |
| `echo <text>` | Print text to terminal               |
| `clear`       | Clear the screen                     |
| `whoami`      | Show current user identity           |
| `ls [-la]`    | List virtual directory contents      |
| `cd <path>`   | Change virtual directory             |
| `pwd`         | Print working directory              |
| `tree`        | Show directory tree                  |
| `history`     | Show session command history         |
| `noxisfetch`  | System info display (neofetch style) |
| `noxis`       | NOXIS system subcommands             |
| `exit`        | Exit session                         |

---

## Architecture

```
noxis/
├── index.js           ← Entry point, readline loop
├── core/
│   ├── parser.js      ← Tokenizes raw input
│   ├── executor.js    ← Routes to correct command
│   ├── history.js     ← Session command history
│   └── vfs.js         ← Virtual file system
├── commands/
│   ├── help.js
│   ├── echo.js
│   ├── clear.js
│   ├── whoami.js
│   ├── ls.js
│   ├── cd.js
│   ├── pwd.js
│   ├── tree.js
│   ├── history.js
│   ├── noxisfetch.js
│   ├── noxis-cmd.js
│   └── exit.js
├── utils/
│   └── boot.js        ← Boot screen
└── package.json
```

## Adding a New Command

Create `/commands/yourcommand.js`:

```js
module.exports = {
  name: 'yourcommand',
  description: 'Does something cool',
  usage: 'yourcommand <arg>',
  execute(args) {
    return 'output here';
  },
};
```

That's it. The executor auto-loads it. No registration needed.

---

## Ecosystem

```
NOXIS     →  interface (terminal)
CRYON     →  intelligence (AI, coming Phase 2)
```
