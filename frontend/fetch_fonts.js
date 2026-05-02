const https = require('https');
https.get('https://www.coinbase.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const urls = data.match(/https:\/\/[^"'\s]*\.woff2?/g) || [];
    console.log("Found font URLs:", [...new Set(urls)]);
  });
}).on('error', err => console.error(err));
