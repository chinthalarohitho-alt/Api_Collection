const express = require('express');
const app = express();

app.use(express.json());

app.post('/validate-url', async (req, res) => {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL required' });
    }

    try {
      // Use HEAD for lightweight check, fallback to GET if unsupported
      try {
        const response = await axios.head(url);
        return res.json({ exists: true, status: response.status });
      } catch (headErr) {
        if (headErr.response && headErr.response.status) {
          // HEAD request received a valid HTTP status
          return res.json({ exists: headErr.response.status < 400, status: headErr.response.status });
        }
        // HEAD not supported or failed, try GET
        try {
          const getResponse = await axios.get(url);
          return res.json({ exists: true, status: getResponse.status });
        } catch (getErr) {
          return res.json({ exists: false, error: getErr.message, status: getErr.response?.status || 'N/A' });
        }
      }
    } catch (err) {
      return res.json({ exists: false, error: err.message, status: 'N/A' });
    }
  });


app.listen(process.env.PORT || 5003,()=>{
    console.log('server is running on port 5003');
})


