const http = require('http');
const urls = [
  'http://localhost:3000/books/1/chapters/1',
  'http://localhost:3000/books/1/chapters/2',
  'http://localhost:3000/books/1/chapters/3'
];

(async () => {
  for (const u of urls) {
    await new Promise((resolve) => {
      http.get(u, (res) => {
        console.log(u, '->', res.statusCode);
        res.on('data', () => {});
        res.on('end', () => resolve());
      }).on('error', (e) => {
        console.error('ERR', u, e.message);
        resolve();
      });
    });
  }
})();
