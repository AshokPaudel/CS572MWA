const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
//To DO
//create all requests
const serveAllRequest = function(req, res){
    console.log(" bingo");
    if(req.method == 'POST'){
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end("{'message' : 'JSON MESSAGE'}");
    }
    let statusCode;
    let fileBuffer;
    if(req.method === 'GET' && (req.url =="/index.html" || req.url == "/")){
        fs.readFile(path.join(__dirname, 'public','index.html'),function(err, data){
            if(err){
                statusCode = 404;
                fileBuffer = 'File Not Found';
            }else{
                statusCode =200;
                fileBuffer = data;
            }
            res.writeHead(statusCode);
            res.end(fileBuffer);
        });
    }
    
    switch(req.url){
        // case "/index.html":
        //     // res.setHeader('Content-Type', 'text/html');
        //     // res.writeHead(200);
        //     console.log(path.join(__dirname, 'public','index.html'));
        //     console.log("requested index.html");
            
        //     break;
        case "/page1.html":
            fs.readFile(path.join(__dirname, 'public','page1.html'),function(err, data){
                if(err){
                    statusCode = 404;
                    fileBuffer = 'File Not Found';
                }else{
                    statusCode =200;
                    fileBuffer = data;
                }
                res.writeHead(statusCode);
                res.end(fileBuffer);
            });
        case "/page2.html":
            fs.readFile(path.join(__dirname, 'public','page2.html'),function(err, data){
                if(err){
                    statusCode = 404;
                    fileBuffer = 'File Not Found';
                }else{
                    statusCode =200;
                    fileBuffer = data;
                }
                res.writeHead(statusCode);
                res.end(fileBuffer);
            });
    } 
};
const server = http.createServer(serveAllRequest);
server.listen(process.env.PORT,"localhost",function(){
    const port = server.address().port;
    console.log(process.env.LISTEN_TO_PORT_MSG, port);
});

// console.log("app started");