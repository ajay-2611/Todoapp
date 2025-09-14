const crypto = require('crypto');

// Generate a secure 64-byte random JWT secret
const jwtSecret = crypto.randomBytes(64).toString('hex');

console.log('=== GENERATED JWT SECRET ===');
console.log('JWT_SECRET=' + jwtSecret);
console.log('');
console.log('Copy the line above to your .env file');
console.log('Secret length:', jwtSecret.length, 'characters');
console.log('');
console.log('This secret is cryptographically secure and unique!');
