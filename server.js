const jsonServer = require('json-server');
jsonServer.create();
const express= require("express")
const cors= require('cors')
const path = require('path')
const app = express();
const mailer=require('nodemailer');
const bodyParser=require('body-parser');
require('dotenv').config();
app.use(bodyParser.json());
app.use(cors())

const PORT = process.env.PORT || 2000;
app.post('/send-mail',(req,res)=>{
  let data=req.body
  let setTransport=mailer.createTransport({
    service:'Gmail',
    auth:{
        user:process.env.username_email,
        pass : process.env.password_email
    }
  })
  var mailOptions={
    from:process.env.username_email,
    to:data.data.target,
    subject:data.data.subject,
    html:data.data.html
  }

  setTransport.sendMail(mailOptions,(error,response)=>{
      if(error){
        res.send(error+response)
      }
      else{
        res.send('Success')
      }
  })
  setTransport.close();
})

if (process.env.NODE_ENV === 'production') {
  
  app.use('/api', jsonServer.router('./db.json')) 
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));

  });
  
}




app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});

