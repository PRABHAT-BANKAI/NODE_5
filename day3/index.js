let http = require("http");
let PORT = 8081;
let fs = require("fs"); //file system  can read your file
http
  .createServer((req, res) => {
    let fileName = "";
    // console.log(req.url);

    switch (req.url) {
      case "/":
        fileName = "home.html";

        break;
      case "/about":
        fileName = "about.html";

        break;
      case "/extrapage":
        fileName = "node.txt";

        break;

      default:
        break;
    }

    fs.readFile(fileName, (err, data) => {
      if (!err) {
        res.end(data);
      }
    });
  })
  .listen(PORT, (error) => {
    if (error) {
      console.log("server is not connected");
      return;
    }
    console.log("server is connected", PORT);
  });
