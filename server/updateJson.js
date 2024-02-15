const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4002;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

app.post('/updateData', (req, res) => {
  try {
    const updatedData = req.body;
    const filePath = path.join(__dirname, '../src/data/TemplateData.json');
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
    res.status(200).send('Data updated successfully');
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).send('Error updating data');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
