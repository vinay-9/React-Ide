
const express = require('express');// Initialize App
const app = express();
  
// Assign route
app.use('/', (req, res, next) => {
  console.log('Node.js Search and Filter');
});
  
// Start server on PORT 5000
app.listen(5000, () => {
  console.log('Server started!');
});