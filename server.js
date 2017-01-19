const express = require('express');
const app = express();

app.use(express.static(__dirname+"/shareDemo"));
app.get('/',(req, res)=>{
  req.
  res.send("1")
})
app.set('port', process.env.PORT || 1996);
app.listen(app.get('port'),()=>{
  console.log(`express listen port: ${app.get('port')}`)
})
