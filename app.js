var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//var mongoose = require('mongoose');
var expressSession = require('express-session');
const bodyParser = require('body-parser');
let formidable = require('formidable');
let fs = require('fs');
var http = require('http');
var https = require('https');
const { exec } = require('child_process');
const { execSync } = require('child_process');
const { spawn } = require('child_process');


var ftpClient = require("ftp");
const fileUpload = require('express-fileupload');
//import srtParser2 from "srt-parser-2";

//var parser = new srtParser2();

var app = express();


app.set('port', 5000);

var server = require('http').createServer(app);

server.listen(5000);

global.httpServer = server;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    secret: "p2ijwermfwpokqweqwem34182937nadtwercxqqelmlqwe31212asda"
}));
app.use(fileUpload({
   useTempFiles : true,
   tempFileDir : '/tmp/'
}));


app.get('/', function (req, res, next) {

  res.render('index.ejs', {uploadFinished: false, uploadFinished2: false, uploadFinished3: false});

})

app.post('/server-action', function (req, res, next) {

   function getRandomInt(max) {
      return Math.floor(Math.random() * max);
   }


   var count = 0;

   let sampleFile = req.files.upload;

   console.log(sampleFile);

   var srt = sampleFile[0].tempFilePath;
   console.log(srt);

   var mp3 = sampleFile[1].tempFilePath;

   var jsonContent;


   fs.readFile(srt, function(err, buffer) {
      if(err) {
         console.error(err);
         callback(err);

      } else {

         import('srt-parser-2').then((srtParser2) => {
            var parser = new srtParser2.default;
            var subObj = parser.fromSrt(buffer.toString());

            console.log(subObj);
            console.log("lines in srt:", subObj.length);

            jsonContent = subObj;

            var tempNumber = getRandomInt(100000);


            var tempName = tempNumber + ".json";

         })

      }
   })

   fs.readFile(mp3, function (err, buffer) {
      if (err) {
         console.log(err);
      } else {
         var c = new ftpClient();


         c.on('ready', function() {

            //c.put(jsonContent, '/files/' + tempName, function(err) {

            //   if (err) {
            //      throw err;
            //   } else {


            //   }

            //});

            c.put(buffer, '/files/' + sampleFile[1].name, function(err) {

               if (err) {
                  throw err;
               } else {

               }

               c.end();


            });


         });

         c.on('end', function () {

            // var text = fs.readFileSync('/home/user1/ftp/files/' + tempName,'utf8')

            // console.log(text);


            // var mydata = JSON.parse(text);

            var output; 
            var startTime;
            var endTime;
            var loopCount;
            var loopLength = jsonContent.length;
            var whileCount = 0;
            var initial = true;
            var oldCount = 1;
            var count = 0;
            var timer = 1000;
            var calc;
            var digits;

            console.log(jsonContent);
            //console.log(startTime);
            //console.log(endTime);

            execSync('/deleteZip.sh');

            execSync('/moveFile.sh ' + sampleFile[1].name);

            function createClips(callback) {

               setTimeout(function () {
                  output = count + ".mp3";
                  startTime = jsonContent[count].startTime;
                  //calc = Math.floor(jsonContent[count].endSeconds) - Math.floor(jsonContent[count].startSeconds);
                  endTime = jsonContent[count].endTime;


                  console.log(jsonContent[count]);
                  console.log(startTime.slice(0, 8));
                  console.log(endTime.slice(0, 8));

                  exec('/createClip.sh ' + startTime.slice(0, 8) + " " + endTime.slice(0, 8) + " " + output + " " + sampleFile[1].name);
                  
                  count++;


                  callback(count);
               }, timer)

               timer += 1000;

            }

            for (const content of jsonContent) {

               createClips(function (result) {

                  console.log(result);

                  if (result >= jsonContent.length) {

                     setTimeout(function () {

                        exec('/createZip.sh', function(err3, stdout, stderr) {

                           if (err3) {
                              console.log(err3);
                           }
                           if (stderr) {
                              console.log(stderr);
                           }
                           if (stdout) {


                           }
                        })

                        res.render('index.ejs', {uploadFinished: true, uploadFinished2: false, uploadFinished3: false})
                     }, 2000)


                  }


               })




            }


            //(async ()=> {
            //   for (const content of jsonContent) {
            //      output = count + ".mp3";
            //      startTime = jsonContent[count].startTime;
            //      endTime = jsonContent[count].endTime;


            //      await execSync('/createClip.sh ' + startTime.slice(0, 8) + " " + endTime.slice(6, 8) + " " + output + " " + sampleFile[1].name);



            //      count++;

            //   }

            //})();



         })

         c.on('close', function () {

         })


         c.connect({host: "45.55.66.226", port: 21, user: "user1", password: "bqyIXcjDIVQtyJwB", debug: console.log});


      }



   })





})

app.post('/server-action2', function (req, res, next) {



   function getRandomInt(max) {
      return Math.floor(Math.random() * max);
   }


   var count = 0;

   let sampleFile = req.files.upload;

   console.log(sampleFile);

   var srt = sampleFile[0].tempFilePath;
   //console.log(srt);

   var mp3 = sampleFile[1].tempFilePath;

   var jsonContent;



   fs.readFile(srt, function(err, buffer) {
      if(err) {
         console.error(err);
         callback(err);

      } else {

         import('srt-parser-2').then((srtParser2) => {
            var parser = new srtParser2.default;
            var subObj = parser.fromSrt(buffer.toString());

            console.log(subObj);
            console.log("lines in srt:", subObj.length);

            jsonContent = subObj;

            var tempNumber = getRandomInt(100000);


            var tempName = tempNumber + ".json";

         })

      }
   })



   fs.readFile(mp3, function (err, buffer) {
      if (err) {
         console.log(err);
      } else {

         var c = new ftpClient();

         c.on('ready', function() {

            //c.put(jsonContent, '/files/' + tempName, function(err) {

            //   if (err) {
            //      throw err;
            //   } else {


            //   }

            //});

            c.put(buffer, '/files/' + sampleFile[1].name, function(err) {

               if (err) {
                  throw err;
               } else {

               }

               c.end();


            });


         });

         c.on('end', function () {

            // var text = fs.readFileSync('/home/user1/ftp/files/' + tempName,'utf8')

            // console.log(text);


            // var mydata = JSON.parse(text);

            execSync('/deleteZip.sh');

            execSync('/moveFile.sh ' + sampleFile[1].name);

            execSync('/silenceDetect.sh ' + sampleFile[1].name);

            execSync('/checkFile.sh');


            setTimeout(function () {

               const cat = spawn('cat', ['/tempFolder/result.txt']);

               cat.stdout.on('data', (data) => {

                  console.log(data.toString());

                  if (data.toString().trim() === "File log.txt is empty") {

                     res.render('index.ejs', {uploadFinished: false, uploadFinished2: false, uploadFinished3: true})

                  } else if (data.toString().trim() === "File log.txt is not empty") {

                     function createClips(callback) {

                        setTimeout(function () {
                           output = count + ".mp3";
                           startTime = jsonContent[count].startTime;
                           //calc = Math.floor(jsonContent[count].endSeconds) - Math.floor(jsonContent[count].startSeconds);
                           endTime = jsonContent[count].endTime;


                           console.log(jsonContent[count]);
                           console.log(startTime.slice(0, 8));
                           console.log(endTime.slice(0, 8));

                           exec('/createClip.sh ' + startTime.slice(0, 8) + " " + endTime.slice(0, 8) + " " + output + " " + sampleFile[1].name);

                           count++;


                           callback(count);
                        }, timer)

                        timer += 1000;

                     }

                     for (const content of jsonContent) {

                        createClips(function (result) {

                           console.log(result);

                           if (result >= jsonContent.length) {

                              setTimeout(function () {

                                 exec('/createZip.sh', function(err3, stdout, stderr) {

                                    if (err3) {
                                       console.log(err3);
                                    }
                                    if (stderr) {
                                       console.log(stderr);
                                    }
                                    if (stdout) {


                                    }
                                 })

                                 res.render('index.ejs', {uploadFinished: false, uploadFinished2: true, uploadFinished3: false})
                              }, 2000)


                           }


                        })




                     }


                  }


               });

               cat.stderr.on('data', (data) => {
                  console.error(`stderr: ${data}`);
               });

               
            }, 3000)





         })

         c.on('close', function () {

         })


         c.connect({host: "45.55.66.226", port: 21, user: "user1", password: "bqyIXcjDIVQtyJwB", debug: console.log});


      }



   })


})

app.get('/download', function (req, res, next) {
  const file = `/var/www/ffmpeg/views/tempFolder.zip`;
  res.download(file); // Set disposition and send it.
});

app.get('/download2', function (req, res, next) {
  const file = `/var/www/ffmpeg/views/tempFolder.zip`;
  res.download(file); // Set disposition and send it.
});

app.get('/download/:id', function (req, res, next) {

   var id = req.params.id;
   var fields = id.split('_');
   var postid = fields[0];
   var name = fields[1];

   
   const file = `/var/www/ffmpeg/views/${postid}/${name}`;
   res.download(file);

})

app.get('/downloadJson/:id', function (req, res, next) {

   var id = req.params.id;

   const file = `/var/www/ffmpeg/views/jsonFiles/${id}`;
   res.download(file);

})


app.post('/input1', function (req, res, next) {

   function getRandomInt(max) {
      return Math.floor(Math.random() * max);
   }


   var count = 0;

   //let srt = req.files.srt.tempFilePath;

   //let mp3 = req.files.mp3.tempFilePath;

   let postid = req.body.postid;

   let srtName = "tempSRT.srt";

   let mp3Name = "tempMP3.mp3";


   //console.log(req);

   const srtURL = req.body.srt;
   const mp3URL = req.body.mp3;

   var srt;
   var mp3;

   https.get(srtURL,(res2) => {
      // Image will be stored at this path
      const path = `/var/www/ffmpeg/views/tempStorage/tempSRT.srt`;
      const filePath = fs.createWriteStream(path);
      res2.pipe(filePath);
      filePath.on('finish',() => {
         srt = "/var/www/ffmpeg/views/tempStorage/tempSRT.srt"
         filePath.close();
         console.log('srt Download Completed');
      })
   })

   https.get(mp3URL,(res3) => {
      // Image will be stored at this path
      const path2 = `/var/www/ffmpeg/views/tempStorage/tempMP3.mp3`;
      const filePath = fs.createWriteStream(path2);
      res3.pipe(filePath);
      filePath.on('finish',() => {
         mp3 = "/var/www/ffmpeg/views/tempStorage/tempMP3.mp3"
         filePath.close();
         console.log('mp3 Download Completed');

         var jsonContent;

         var obj = {
            table: []
         }

         obj.table.push({"post_id": postid});

         var tempArray = [];

         var count2 = 0;

         var jsonName;

         fs.readFile(srt, function(err, buffer) {
            if(err) {
               console.error(err);
               callback(err);

            } else {

               import('srt-parser-2').then((srtParser2) => {
                  var parser = new srtParser2.default;
                  var subObj = parser.fromSrt(buffer.toString());

                  console.log(subObj);
                  console.log("lines in srt:", subObj.length);

                  jsonContent = subObj;

                  var tempNumber = getRandomInt(100000);


                  var tempName = tempNumber + ".json";

                  for (const content of jsonContent) {

                     tempArray.push({
                        "wording": content.text,
                        "start-time": content.startTime.slice(0, 8),
                        "end-time": content.endTime.slice(0, 8),
                        "mp3-download-link": "http://45.55.66.226:5000/download/" + postid + "_" + count2 + ".mp3"
                     })

                     count2++;

                  }

                  obj.table.push({"mp3": tempArray});

                  var json = JSON.stringify(obj);

                  console.log(json)

                  fs.writeFileSync('/var/www/ffmpeg/views/jsonFiles/postid_' + postid + '.json', json, 'utf8');

                  jsonName = 'postid_' + postid + '.json';

               })

            }
         })

         fs.readFile(mp3, function (err, buffer) {
            if (err) {
               console.log(err);
            } else {
               var c = new ftpClient();


               c.on('ready', function() {

                  //c.put(jsonContent, '/files/' + tempName, function(err) {

                  //   if (err) {
                  //      throw err;
                  //   } else {


                  //   }

                  //});

                  c.put(buffer, '/files/' + mp3Name, function(err) {

                     if (err) {
                        throw err;
                     } else {

                     }

                     c.end();


                  });


               });

               c.on('end', function () {

                  // var text = fs.readFileSync('/home/user1/ftp/files/' + tempName,'utf8')

                  // console.log(text);


                  // var mydata = JSON.parse(text);

                  var output; 
                  var startTime;
                  var endTime;
                  var loopCount;
                  var loopLength = jsonContent.length;
                  var whileCount = 0;
                  var initial = true;
                  var oldCount = 1;
                  var count = 0;
                  var timer = 1000;
                  var calc;
                  var digits;

                  console.log(jsonContent);
                  //console.log(startTime);
                  //console.log(endTime);

                  execSync('/deleteZip.sh');

                  execSync('/moveFile.sh ' + mp3Name);

                  function createClips(callback) {

                     setTimeout(function () {
                        output = count + ".mp3";
                        startTime = jsonContent[count].startTime;
                        //calc = Math.floor(jsonContent[count].endSeconds) - Math.floor(jsonContent[count].startSeconds);
                        endTime = jsonContent[count].endTime;


                        console.log(jsonContent[count]);
                        console.log(startTime.slice(0, 8));
                        console.log(endTime.slice(0, 8));

                        exec('/createClip.sh ' + startTime.slice(0, 8) + " " + endTime.slice(0, 8) + " " + output + " " + mp3Name);

                        count++;


                        callback(count);
                     }, timer)

                     timer += 1000;

                  }

                  for (const content of jsonContent) {

                     createClips(function (result) {

                        console.log(result);

                        if (result >= jsonContent.length) {

                           setTimeout(function () {

                              execSync('/createFolder.sh ' + postid, function(err3, stdout, stderr) {

                                 if (err3) {
                                    console.log(err3);
                                 }
                                 if (stderr) {
                                    console.log(stderr);
                                 }
                                 if (stdout) {

                                    //res.write("post_id: " + postid);



                                 }
                              })

                              res.sendFile('postid_' + postid + '.json', {
                                 root: path.join(__dirname, '/views/jsonFiles')
                              }, function (err) {
                                 if (err) {
                                    console.log(err);
                                 }
                              });



                              //var proxyRequest = http.request({
                              //   host: 'studio.bastillepost.com',
                              //   port: 80,
                              //   method: 'GET',
                              //   path: '/get_splits'
                              //},
                              //   function (proxyResponse) {
                              //      proxyResponse.on('data', function (chunk) {
                              //         res.send(chunk);
                              //      });
                              //   });

                              //proxyRequest.on('error', (e) => {
                              //   console.error(`problem with request: ${e.message}`);
                              //});

                              //proxyRequest.write("http://45.55.66.226:5000/downloadJson/" + jsonName);
                              //proxyRequest.end();




                           }, 2000)


                        }


                     })




                  }


                  //(async ()=> {
                  //   for (const content of jsonContent) {
                  //      output = count + ".mp3";
                  //      startTime = jsonContent[count].startTime;
                  //      endTime = jsonContent[count].endTime;


                  //      await execSync('/createClip.sh ' + startTime.slice(0, 8) + " " + endTime.slice(6, 8) + " " + output + " " + sampleFile[1].name);



                  //      count++;

                  //   }

                  //})();



               })

               c.on('close', function () {

               })


               c.connect({host: "45.55.66.226", port: 21, user: "user1", password: "bqyIXcjDIVQtyJwB", debug: console.log});


            }



         })

      })
   })


   // var srt = sampleFile[0].tempFilePath;
   // console.log(srt);

   // var mp3 = sampleFile[1].tempFilePath;



})

app.post('/input2', function (req, res, next) {

   function getRandomInt(max) {
      return Math.floor(Math.random() * max);
   }


   var count = 0;

   //let srt = req.files.srt.tempFilePath;

   //let mp3 = req.files.mp3.tempFilePath;

   let postid = req.body.postid;

   let srtName = "tempSRT.srt";

   let mp3Name = "tempMP3.mp3";


   //console.log(req);

   const srtURL = req.body.srt;
   const mp3URL = req.body.mp3;

   var jsonContent;

   var obj = {
      table: []
   }

   obj.table.push({"post_id": postid});

   var tempArray = [];

   var count2 = 0;

   var jsonName;

   var srt;
   var mp3;

   https.get(srtURL,(res2) => {
      // Image will be stored at this path
      const path = `/var/www/ffmpeg/views/tempStorage/tempSRT.srt`;
      const filePath = fs.createWriteStream(path);
      res2.pipe(filePath);
      filePath.on('finish',() => {
         srt = "/var/www/ffmpeg/views/tempStorage/tempSRT.srt"
         filePath.close();
         console.log('srt Download Completed');
      })
   })

   https.get(mp3URL,(res3) => {
      // Image will be stored at this path
      const path2 = `/var/www/ffmpeg/views/tempStorage/tempMP3.mp3`;
      const filePath = fs.createWriteStream(path2);
      res3.pipe(filePath);
      filePath.on('finish',() => {
         srt = "/var/www/ffmpeg/views/tempStorage/tempMP3.mp3"
         filePath.close();
         console.log('mp3 Download Completed');

         fs.readFile(srt, function(err, buffer) {
            if(err) {
               console.error(err);
               callback(err);

            } else {

               import('srt-parser-2').then((srtParser2) => {
                  var parser = new srtParser2.default;
                  var subObj = parser.fromSrt(buffer.toString());

                  console.log(subObj);
                  console.log("lines in srt:", subObj.length);

                  jsonContent = subObj;

                  var tempNumber = getRandomInt(100000);


                  var tempName = tempNumber + ".json";

                  for (const content of jsonContent) {

                     tempArray.push({
                        "wording": content.text,
                        "start-time": content.startTime.slice(0, 8),
                        "end-time": content.endTime.slice(0, 8),
                        "mp3-download-link": "http://45.55.66.226:5000/download/" + postid + "_" + count2 + ".mp3"
                     })

                     count2++;

                  }

                  obj.table.push({"mp3": tempArray});

                  var json = JSON.stringify(obj);

                  console.log(json);

                  fs.writeFileSync('/var/www/ffmpeg/views/jsonFiles/postid_' + postid + '.json', json, 'utf8');

                  jsonName = 'postid_' + postid + '.json';

               })

            }
         })



         fs.readFile(mp3, function (err, buffer) {
            if (err) {
               console.log(err);
            } else {

               var c = new ftpClient();

               c.on('ready', function() {

                  //c.put(jsonContent, '/files/' + tempName, function(err) {

                  //   if (err) {
                  //      throw err;
                  //   } else {


                  //   }

                  //});

                  c.put(buffer, '/files/' + mp3Name, function(err) {

                     if (err) {
                        throw err;
                     } else {

                     }

                     c.end();


                  });


               });

               c.on('end', function () {

                  // var text = fs.readFileSync('/home/user1/ftp/files/' + tempName,'utf8')

                  // console.log(text);


                  // var mydata = JSON.parse(text);

                  execSync('/deleteZip.sh');

                  execSync('/moveFile.sh ' + mp3Name);

                  execSync('/silenceDetect.sh ' + mp3Name);

                  execSync('/checkFile.sh');


                  setTimeout(function () {

                     const cat = spawn('cat', ['/tempFolder/result.txt']);

                     cat.stdout.on('data', (data) => {

                        console.log(data.toString());

                        if (data.toString().trim() === "File log.txt is empty") {

                           res.send("No silence of 3 seconds or longer have been detected in the mp3 file.");

                          // var proxyRequest = http.request({
                          //    host: 'studio.bastillepost.com',
                          //    port: 80,
                          //    method: 'GET',
                          //    path: '/get_splits'
                          // },
                          //    function (proxyResponse) {
                          //       proxyResponse.on('data', function (chunk) {
                          //          res.send(chunk);
                          //       });
                          //    });

                          // proxyRequest.on('error', (e) => {
                          //    console.error(`problem with request: ${e.message}`);
                          // });

                          // proxyRequest.write("No silence of 3 seconds or longer have been detected in the mp3 file.");
                          // proxyRequest.end();


                        } else if (data.toString().trim() === "File log.txt is not empty") {

                           function createClips(callback) {

                              setTimeout(function () {
                                 output = count + ".mp3";
                                 startTime = jsonContent[count].startTime;
                                 //calc = Math.floor(jsonContent[count].endSeconds) - Math.floor(jsonContent[count].startSeconds);
                                 endTime = jsonContent[count].endTime;


                                 console.log(jsonContent[count]);
                                 console.log(startTime.slice(0, 8));
                                 console.log(endTime.slice(0, 8));

                                 exec('/createClip.sh ' + startTime.slice(0, 8) + " " + endTime.slice(0, 8) + " " + output + " " + mp3Name);

                                 count++;


                                 callback(count);
                              }, timer)

                              timer += 1000;

                           }

                           for (const content of jsonContent) {

                              createClips(function (result) {

                                 console.log(result);

                                 if (result >= jsonContent.length) {

                                    setTimeout(function () {

                                       execSync('/createFolder.sh ' + postid, function(err3, stdout, stderr) {

                                          if (err3) {
                                             console.log(err3);
                                          }
                                          if (stderr) {
                                             console.log(stderr);
                                          }
                                          if (stdout) {


                                          }
                                       })

                                       res.sendFile('postid_' + postid + '.json', {
                                          root: path.join(__dirname, '/views/jsonFiles')
                                       }, function (err) {
                                          if (err) {
                                             console.log(err);
                                          }
                                       });


                                       //var proxyRequest = http.request({
                                       //   host: 'studio.bastillepost.com',
                                       //   port: 80,
                                       //   method: 'GET',
                                       //   path: '/get_splits'
                                       //},
                                       //   function (proxyResponse) {
                                       //      proxyResponse.on('data', function (chunk) {
                                       //         res.send(chunk);
                                       //      });
                                       //   });

                                       //proxyRequest.on('error', (e) => {
                                       //   console.error(`problem with request: ${e.message}`);
                                       //});

                                       //proxyRequest.write("http://45.55.66.226:5000/downloadJson/" + jsonName);
                                       //proxyRequest.end();




                                    }, 2000)


                                 }


                              })




                           }


                        }


                     });

                     cat.stderr.on('data', (data) => {
                        console.error(`stderr: ${data}`);
                     });


                  }, 3000)





               })

               c.on('close', function () {

               })


               c.connect({host: "45.55.66.226", port: 21, user: "user1", password: "bqyIXcjDIVQtyJwB", debug: console.log});


            }



         })

      })
   })




})





