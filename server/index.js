const app = require('./app');
const port = 3000;
const path = require('path');
const fs = require('fs');
app.listen(port, () => console.log(`app listening on port:${port}`));

// fs.w(
//   path.join(__dirname, '..', 'src'),

//   (eventType, filename) => {
//     if (eventType === 'change') {
//       console.log('something changed');
//     }
//     if (eventType === 'rename') {
//       console.log('something renamed');
//     }
//   }
// );
