

var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var request = require('request');
var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]);
  this.res.writeHead(200);

  var message = request.text;
  console.log(message + " message")
  console.log(request.name)
  console.log(request.sender_id)
  console.log(request.user_id)
  console.log(request.id)

/* COMMENT



  if (message.substring(0,1) == '#' ) {

    if (message == "#coolbot") {
      message = "#cool-bot"
    }
    gifTag(message);

  }else {

    if (message.search("#") >= 0) {
      var m1 = message.slice(message.search("#"))
      if (m1.search(" ")>=0) {
        var m2 = m1.indexOf(" ");
        var m3 = message.slice(message.search("#"),m2+message.search("#"));
        gifTag(m3);
      }else {
        if (m1 == "#coolbot") {
          m1 = "#cool-bot"
        }
        gifTag(m1);
      }

    }

  }

  if (message.toLowerCase() == 'help') {
    postMessage("fuck you!");
  }

  if (message.toLowerCase().search("help") >= 0 || message.toLowerCase().search("bot") >= 0) {

    postMessage("I'm " + cool());
    postMessage("https://media.giphy.com/media/xUA7bjnIXwqcwBTflm/giphy.gif");
    //https://media.giphy.com/media/c6DcchsqBlGCY/giphy.gif

  }

  if (message.toLowerCase().search("kill") >= 0 || message.toLowerCase().search("delete") >= 0 || message.toLowerCase().search("eliminate") >= 0) {

    gifTag("#fuckyou");
  }

  if (message.toLowerCase().search("asap") >= 0 ) {

    postMessage("ASAP " + cool());
  }

  if (message.toLowerCase().search("terminator") >= 0 || message.toLowerCase().search("skynet") >= 0 ) {

      postMessage("https://media.giphy.com/media/c6DcchsqBlGCY/giphy.gif");
  }

*/

/*
if (request.name != "coolBot") {
  postMessage(request.name + " "+ cool());
  //gifTag("#fuckyou");
}
*/

if (message.toLowerCase().search("asap") >= 0 ) {
  gifTag("#hurry");
  postMessage("ASAP " + cool());
}

if (message.toLowerCase() == 'help') {
  //postMessage(request.name + "fuck you!");
}

if (message.toLowerCase().search("bot") >= 0 ) {

  //gifTag("#cool");
  //postMessage("https://media.giphy.com/media/c6DcchsqBlGCY/giphy.gif");

}

if (message.toLowerCase().search("kill") >= 0 || message.toLowerCase().search("delete") >= 0 || message.toLowerCase().search("eliminate") >= 0) {

  //gifTag("#fuckyou");
}

if (message.toLowerCase().search("bot") >= 0 && message.toLowerCase().search("cool")) {

  //postMessage("https://media.giphy.com/media/mIZ9rPeMKefm0/giphy.gif");
  //gifTag("#cool");
}

if (message.toLowerCase().search("terminator") >= 0 || message.toLowerCase().search("skynet") >= 0 ) {

    //postMessage("https://media.giphy.com/media/c6DcchsqBlGCY/giphy.gif");
}







  this.res.end();


}


function gifTag(message) {
  request('https://api.giphy.com/v1/gifs/translate?s=' + message.substring(1).trim() + '&api_key=dc6zaTOxFJmzC&rating=r', function (error, response, body) {
  parsedData = JSON.parse(body);

  if (!error && response.statusCode == 200 && parsedData && parsedData.data.images) {
	botResponse = parsedData.data.images.downsized.url;
	deets = ('gif size: ' + String(Math.ceil(parsedData.data.images.downsized.size/1000)).replace(/(.)(?=(\d{3})+$)/g,'$1,') + 'kB');
    console.log(botResponse)
  postMessage(botResponse);
  } else {
    postMessage("Try another one ... or maybe use '-' as a space");
  console.log(message + ' is invalid');
  }
  });
}

function postMessage(botRes) {
  var botResponse, options, body, botReq;

  //botResponse = cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  botResponse = botRes
  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);



  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
        console.log("OK STATUS CODE -----" );
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
