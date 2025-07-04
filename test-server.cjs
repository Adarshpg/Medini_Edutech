const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const PORT = 3000;

// Serve static files from the dist directory
const frontendPath = path.join(__dirname, 'dist');
app.use(express.static(frontendPath));

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start the server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n` + '='.repeat(60));
  console.log(`🚀 Test server is running at http://localhost:${PORT}`);
  console.log('='.repeat(60) + '\n');
});

// Handle errors
server.on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});
