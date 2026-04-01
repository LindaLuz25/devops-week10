const express = require('express');
const app = express();

const version = process.env.APP_VERSION || "1.0.0";

app.get('/', (req, res) => {
  res.send(`App running - Version: ${version}`);
});

app.listen(3000, () => {
  console.log(`App running on port 3000 - Version: ${version}`);
});