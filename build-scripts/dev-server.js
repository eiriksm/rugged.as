const fs = require('fs');
const path = require('path');
const http = require('http');
const { execSync } = require('child_process');
const chokidar = require('chokidar');
const { WebSocketServer } = require('ws');

const BUILD_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(BUILD_DIR, 'dist');
const WATCH_PATHS = [
  path.join(__dirname, 'template.html'),
  path.join(__dirname, 'input.css'),
];

const PORT = process.env.PORT || 3000;
const WS_PORT = process.env.WS_PORT || 3001;

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

function log(emoji, message, color = colors.reset) {
  console.log(`${emoji} ${color}${message}${colors.reset}`);
}

// WebSocket server for live reload
const wss = new WebSocketServer({ port: WS_PORT });
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  log('🔌', `Client connected (${clients.size} total)`, colors.cyan);

  ws.on('close', () => {
    clients.delete(ws);
    log('🔌', `Client disconnected (${clients.size} remaining)`, colors.cyan);
  });
});

function notifyClients() {
  clients.forEach((client) => {
    if (client.readyState === 1) { // OPEN
      client.send('reload');
    }
  });
  if (clients.size > 0) {
    log('🔄', `Sent reload signal to ${clients.size} client(s)`, colors.green);
  }
}

// Build function
function build() {
  log('🏗️', 'Building...', colors.blue);
  try {
    execSync('node build-scripts/build-static.js', {
      cwd: BUILD_DIR,
      stdio: 'inherit',
    });
    return true;
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    return false;
  }
}

// Inject live reload script into HTML
function injectLiveReload(html) {
  const script = `
    <script>
      (function() {
        const ws = new WebSocket('ws://localhost:${WS_PORT}');
        ws.onmessage = function(event) {
          if (event.data === 'reload') {
            console.log('🔄 Reloading page...');
            window.location.reload();
          }
        };
        ws.onclose = function() {
          console.log('⚠️  Dev server connection lost. Retrying...');
          setTimeout(() => window.location.reload(), 1000);
        };
        console.log('✅ Live reload connected');
      })();
    </script>
  `;
  return html.replace('</body>', `${script}</body>`);
}

// HTTP server
const server = http.createServer((req, res) => {
  let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);

  // Security: prevent path traversal
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Not found');
      } else {
        res.writeHead(500);
        res.end('Internal server error');
      }
      return;
    }

    // Determine content type
    const ext = path.extname(filePath);
    const contentTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml',
    };
    const contentType = contentTypes[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });

    // Inject live reload script for HTML files
    if (ext === '.html') {
      const modifiedHtml = injectLiveReload(data.toString());
      res.end(modifiedHtml);
    } else {
      res.end(data);
    }
  });
});

// Initial build
log('🚀', 'Starting dev server...', colors.yellow);
if (!build()) {
  process.exit(1);
}

// Start HTTP server
server.listen(PORT, () => {
  log('✅', `Dev server running at http://localhost:${PORT}`, colors.green);
  log('👀', 'Watching for changes...', colors.cyan);
});

// Watch for file changes
const watcher = chokidar.watch(WATCH_PATHS, {
  persistent: true,
  ignoreInitial: true,
});

let buildTimeout;
watcher.on('all', (event, filePath) => {
  log('📝', `File ${event}: ${path.basename(filePath)}`, colors.yellow);

  // Debounce builds to avoid multiple rapid rebuilds
  clearTimeout(buildTimeout);
  buildTimeout = setTimeout(() => {
    if (build()) {
      notifyClients();
    }
  }, 100);
});

// Graceful shutdown
process.on('SIGINT', () => {
  log('👋', 'Shutting down dev server...', colors.yellow);
  watcher.close();
  server.close();
  wss.close();
  process.exit(0);
});
