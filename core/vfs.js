/**
 * NOXIS Virtual File System (VFS)
 * Simulated in-memory filesystem. Session-based.
 * No actual host FS interaction.
 */

// VFS Tree — nested object represents directory structure
const vfsTree = {
  '/': {
    type: 'dir',
    children: {
      home: {
        type: 'dir',
        children: {
          user: {
            type: 'dir',
            children: {
              projects: {
                type: 'dir',
                children: {
                  'noxis-core': { type: 'dir', children: {
                    'index.js': { type: 'file', size: '4.2KB', modified: '2025-01-10' },
                    'README.md': { type: 'file', size: '1.1KB', modified: '2025-01-09' },
                  }},
                  'cryon-ai': { type: 'dir', children: {
                    'model.py': { type: 'file', size: '8.7KB', modified: '2025-01-08' },
                  }},
                },
              },
              docs: {
                type: 'dir',
                children: {
                  'PRD.md': { type: 'file', size: '12KB', modified: '2025-01-07' },
                  'design.md': { type: 'file', size: '6.3KB', modified: '2025-01-06' },
                },
              },
              'config.json': { type: 'file', size: '512B', modified: '2025-01-05' },
            },
          },
        },
      },
      etc: {
        type: 'dir',
        children: {
          'noxis.conf': { type: 'file', size: '256B', modified: '2025-01-01' },
        },
      },
      var: {
        type: 'dir',
        children: {
          logs: {
            type: 'dir',
            children: {
              'noxis.log': { type: 'file', size: '2.1KB', modified: '2025-01-10' },
            },
          },
        },
      },
    },
  },
};

// Session state
let currentPath = '/home/user';

/**
 * Resolve a path string to a VFS node.
 */
function resolvePath(targetPath) {
  let parts;

  if (targetPath.startsWith('/')) {
    parts = targetPath.split('/').filter(Boolean);
  } else {
    // Relative path
    const baseParts = currentPath.split('/').filter(Boolean);
    const relParts = targetPath.split('/').filter(Boolean);

    parts = [...baseParts];
    for (const part of relParts) {
      if (part === '..') {
        parts.pop();
      } else if (part !== '.') {
        parts.push(part);
      }
    }
  }

  // Walk the tree
  let node = vfsTree['/'];
  for (const part of parts) {
    if (!node.children || !node.children[part]) {
      return null;
    }
    node = node.children[part];
  }

  return node;
}

function getCurrentPath() {
  return currentPath;
}

function setCurrentPath(newPath) {
  currentPath = newPath;
}

function getNodeAt(path) {
  return resolvePath(path || currentPath);
}

/**
 * Build absolute path from relative.
 */
function buildAbsPath(target) {
  if (!target || target === '/') return '/';
  if (target.startsWith('/')) return target;

  const baseParts = currentPath.split('/').filter(Boolean);
  const relParts = target.split('/').filter(Boolean);

  const parts = [...baseParts];
  for (const p of relParts) {
    if (p === '..') parts.pop();
    else if (p !== '.') parts.push(p);
  }

  return '/' + parts.join('/');
}

module.exports = {
  getCurrentPath,
  setCurrentPath,
  getNodeAt,
  buildAbsPath,
  resolvePath,
};
