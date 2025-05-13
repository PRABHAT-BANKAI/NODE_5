let http = require("http"); // fs(filesystem)// core module
let PORT = 8081;
let {sum, sub} = require("./sum")//destructure

//local modules// custom 
// third party module// multer , express , passport , nodemon , 

http
  .createServer((req, res) => {
    res.write("hello world");
    res.end()
  })
  .listen(PORT, (error) => {

    if(error){
      console.log("server is not connected")
      return 
    }
 console.log(sub(12,5))
    console.log(sum(12,5))
     console.log(sub(300,5))
    console.log("server is connected",PORT)
  });
