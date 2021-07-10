
const express = require('express');// Initialize App
const app = express();
  
// Assign route
app.get('/', (req, res, next) => {
  res.send('Node.js Search and Filter');
});
  
// Start server on PORT 5000
app.listen(process.env.PORT || 5000, () => {
  console.log('Server started!');
});