const express = require("express");

 const app = express();

 const bodyParser= require("body-parser");

 const request= require("request");

 const https = require("https");



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));







 app.get("/",function(req,res){

   res.sendFile(__dirname+"/signup.html")
 })



app.post("/",function(req,res){
  var firstname = req.body.fname;
  var lastname= req.body.lname;
  var email= req.body.email;

  console.log(firstname,lastname,email)


  const data={
          members:  [
         {
           email_address : email,
           status :"subscribed",
           merge_feilds : {
             FNAME:firstname,
             LNAME:lastname
           }
         }
  ]
};

var jsonData=JSON.stringify(data);

const url ="https://us6.api.mailchimp.com/3.0/lists/b88c086f5c"

const options ={
  method : "POST",
  auth : "deepak:e05dd5f92c2a28876f2e100c73e2b909-us6"
}

const request=https.request(url,options,function(response)
{

if(response.statusCode===200){
  res.sendFile(__dirname+"/success.html")
}
else{
  res.send(__dirname+"/failure.html")
}

response.on("data",function(data){
  console.log(JSON.parse(data));
})
})
request.write(jsonData)

request.end()



});














 app.listen(3000,function(){
   console.log("server running fine and is listening at port 3000")
 })


// list id
//b88c086f5c


// api key
//e05dd5f92c2a28876f2e100c73e2b909-us6
