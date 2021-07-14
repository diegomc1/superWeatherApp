const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000; 

//Server setup
app.use(express.json())
app.use(
    express.urlencoded({
      extended: true
    })
  )
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

//Server call
app.post('/express_backend', async (req, res) => {
    try {
        const url = `http://${req.body.url}`;
        const response = await axios.get(url);
        const data = await JSON.stringify(response.data);
        res.send(data);
    } catch (e) {
        throw Error (e.message);
    }
});