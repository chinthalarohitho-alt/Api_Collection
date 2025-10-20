const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/rohith',(req, res) => {
    res.send('Hello World');
});



app.listen(process.env.PORT || 5003,()=>{
    console.log('server is running on port 5003');
})


