const http = require('http');
const fs = require('fs');
const ports = [3000, 3001];
const paths = [
  '/books/5/chapters/1',
  '/books/6',
  '/books/7',
  '/books/8',
  '/books/6/chapters/1',
  '/books/7/chapters/1',
  '/books/8/chapters/1'
];

(async () => {
  let out = '';
  for (const pth of paths) {
    let found = false;
    for (const port of ports) {
      try {
        const result = await new Promise((resolve, reject) => {
          const req = http.get({ hostname: '127.0.0.1', port, path: pth, timeout: 10000 }, (res) => {
            let body = '';
            res.on('data', d => body += d);
            res.on('end', () => resolve({ status: res.statusCode, len: Buffer.byteLength(body), port }));
          });
          req.on('error', reject);
          req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
        });
        out += `URL: http://localhost:${result.port}${pth} -> ${result.status} len:${result.len}\n`;
        found = true;
        break;
      } catch (e) {
        // try next port
      }
    }
    if (!found) out += `URL: http://localhost:3000${pth} -> FAILED\n`;
  }
  const outPath = 'f:/hadith-vn-29/hadith-vn/scripts/check-pages-output.txt';
  fs.writeFileSync(outPath, out, 'utf8');
  console.log('WROTE', outPath);
})();
