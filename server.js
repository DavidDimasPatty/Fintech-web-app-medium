const jsonServer = require('json-server');
jsonServer.create();
const express= require("express")
const cors= require('cors')
const path = require('path')
const app = express();
app.use(cors())

const PORT = process.env.PORT || 5000;


if (process.env.NODE_ENV === 'production') {
  
  app.use('/api', jsonServer.router('./db.json')) 
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));

  });
  
}else{
  app.use('/', jsonServer.router('./db.json'),jsonServer.defaults({noCors: false}))

}
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});

