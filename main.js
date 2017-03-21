var http = require('http');
var fs = require('fs');
var url = require("url");
var qs = require('querystring');


http.createServer(function(req, res){

    fs.readFile('index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
    

    if(req.method=='POST') {
            var body='';
            req.on('data', function (data) {
                body +=data;
            });
            req.on('end',function(){
                var POST =  qs.parse(body);
                toString(POST);
                console.log(POST.user);
                /*Write file*/
                var stream = fs.createWriteStream("files/" + POST.file + ".txt");
                    stream.once('open', function(fd) {
                    stream.write(POST.description);
                    stream.end();
                });

            });
    }
    else if(req.method=='GET') {
        var url_parts = url.parse(req.url,true);
        console.log(url_parts.query);
    }
    

}).listen(3000);