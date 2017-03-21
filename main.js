var http = require('http');
var fs = require('fs');
var url = require("url");
var qs = require('querystring');

http.createServer(function(req, res){

    if(req.url == "/home"){
    fs.readFile('index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
    }

    else if(req.url == "/edit"){
    fs.readFile('edit.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
    }

    else if(req.url == "/style.css"){
        fs.readFile(__dirname + '/style.css',function (err, data){
            // res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            res.end();
        });
    }

    else if(req.url == "/jquery.min.js"){
        fs.readFile(__dirname + '/jquery.min.js',function (err, data){
            // res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.write(data);
            res.end();
        });
    }
    
    else{
        fs.readFile('404.html',function (err, data){
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }
    




/*----------------------Geting data on post request---------------------*/
    if(req.method=='POST') {
            var body='';
            req.on('data', function (data) {
                body +=data;
            });
            req.on('end',function(){

         /*---------Create Folder "files" if not exist--------*/
                if (!fs.existsSync("files")){
                    fs.mkdirSync("files");
                }

                var POST =  qs.parse(body);
                toString(POST);

            /*------------Write file-------*/
                if(req.url == "/home"){
                    var stream = fs.createWriteStream("files/" + POST.file + ".txt");
                        stream.once('open', function(fd) {
                        stream.write(POST.description);
                        stream.end();
                    });
                }

                else if(req.url == "/edit"){
                    fs.readFile("files/" + POST.file + ".txt", (err, data) => {
                        if (err) {
                            console.error('There was an error reading the file!', err);
                            return;
                        }
                        // Otherwise handle the data
                        var stream = fs.createWriteStream("files/" + POST.file + ".txt");
                             stream.once('open', function(fd) {
                             stream.write(POST.description);
                             stream.end();
                         });
                         console.log("File Edited.")
                    });
                }


            });
    }
    
    else if(req.method=='GET') {
        // var url_parts = url.parse(req.url,true);
        // console.log(url_parts.query);
    }
    

}).listen(3000);