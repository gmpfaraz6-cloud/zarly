import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting ShopFraz Development Servers...\n');

// Start Admin server
console.log('📦 Starting Admin Panel on http://localhost:5173');
const admin = spawn('npm', ['run', 'dev'], {
  cwd: join(__dirname, 'admin'),
  shell: true,
  stdio: 'inherit',
});

// Start Storefront server
console.log('🛍️  Starting Storefront on http://localhost:5174');
const storefront = spawn('npm', ['run', 'dev'], {
  cwd: join(__dirname, 'storefront'),
  shell: true,
  stdio: 'inherit',
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n\n🛑 Stopping servers...');
  admin.kill();
  storefront.kill();
  process.exit();
});

admin.on('error', (error) => {
  console.error('❌ Admin server error:', error);
});

storefront.on('error', (error) => {
  console.error('❌ Storefront server error:', error);
});

