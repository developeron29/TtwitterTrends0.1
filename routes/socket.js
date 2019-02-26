/*
 * Serve content over a socket
 */

module.exports = function (socket) {
  


  

  socket.on('init',function(data){
  	//Initialization
 request = require('request');
Twit = require('twit');
u = require('underscore');
fs = require('fs');
sen = require('sediment');
gender = require('gender');
async = require('async');
natural = require('natural');
 gloss = require('glossary')({
   blacklist: ["@", "#", "http://", "https://","&"],
    collapse: true 
});
 barney = [];
 ret = data.place;
placer = ret.toString();//"united states";
//console.log(placer);
counterer = 60;
counterer1 = counterer;
place = placer.split(' ').join('%20');
//Function decleration
function decide(body){
var json = JSON.parse(body);
var cls = json.cls1;
var max = u.max(cls);
for( i in cls)
{
if(cls[i] === max)
{
return [i,max];
}
}
}

function requester(classer,tex,api,c)
{
request('http://uclassify.com/browse/'+classer+'/ClassifyText?readkey='+api+'&text='+tex+'&output=json&version=1.01',function(error,response,body){
if(!error && response.statusCode == 200)
{
var y = decide(body);
if (y) {
  socket.emit('barney',{
     c : c,
     valu: y[0],
     valu1: y[1]
  });
}
//console.log(barney);

//console.log(y[0]);
//console.log(y[1]);
}

}); 
}
//Async series calls begins ,you son of a beaach!
async.waterfall([
function(callback)
{
request('http://where.yahooapis.com/v1/places.q('+place+')?format=JSON&appid=ki3NvmXV34HfJEkhuji3Yc8Xhf6wjY2..5X1zFqVqGa4B84hUnFUsbAUtG7HHxK30V0V',function(error,response,body){
if(!error && response.statusCode==200)
{
var json = JSON.parse(body) 
  var woeid = json.places.place[0].woeid;
  var lat = json.places.place[0].centroid.latitude;
  var long = json.places.place[0].centroid.longitude;
  socket.emit('location',{
    woeid : woeid,
    lat: lat,
    long: long
  });
 // console.log(woeid);
   // console.log(lat);
  //console.log(long);
 geo =lat+','+long+','+'1mi';
  callback(null,woeid,lat,long);
}
});
},
function(woeid,lat, long ,callback){//get trends
  
 T = new Twit({
    consumer_key:         ''
  , consumer_secret:      ''
  , access_token:         ''
  , access_token_secret:  ''
});


T.get('trends/place',{ id: woeid },  function(err, reply) {
// var name = [];
 var que = [];
 var x;
 
 //console.log(err, reply[0].trends);

if(reply!=undefined) {
    x = reply[0].trends;
 } 
 else {
  console.log('empty');
 }
for ( y in x)
{ 
//name.push(x[y].name);
que.push(x[y].query);
}
callback(null,que, lat, long);
});
},
function(que, lat, long, callback){
  
   s = [];
   //Get profession list from file

  data = fs.readFileSync('public/p_list.txt', 'utf-8');
    var lines = data.split('\n');
      for (var i = 0; i < lines.length; i++) {
      s.push(lines[i].toLowerCase());
    
       }
       natural.PorterStemmer.attach();
callback(null,que, lat, long);
} ,
function(que, lat, long1, callback){

Twit = require('twit')
T = new Twit({
  consumer_key:         ''
  , consumer_secret:    ''
  , access_token:       ''
  , access_token_secret:  ''
})

sanFrancisco =[ -122.75,36.8,-121.75,37.8 ]
sanFrancisco = [ long1, lat, (long1 + 1), (lat + 1) ]
console.log(sanFrancisco);
 
stream = T.stream('statuses/filter', { locations: sanFrancisco })
//console.log(geo);
  //async loop
 // async.forEach(que,
   // function(item,callback){
      async.waterfall([
        function(callback){
          stream.on('tweet', function (reply) {
       // console.log('in')
          console.log('reply', reply);
          if(reply!=undefined )
          {  
            
            var text = reply.text;
           var tex = gloss.extract(text);
            tex = tex.join(' ');
            tex = tex.split(' ').join('+');
            var user = reply.user;
             var namer = user.name;
           // var location = user.location;
          //  var description = user.description;
           // console.log(namer);
            var gen = gender.guess(namer).gender;
          //  console.log(tex);
             //console.log(location);
            //console.log(description);
           // console.log(text);
            var mood = sen.analyze(text).score;
            socket.emit('mooder',{
              moodscr : mood
            });
            //console.log(mood);
            //var df = description.tokenizeAndStem();
            //console.log(u.intersection(df ,s));
            callback(null,tex,gen);
            }
      });
      /*  T.get('search/tweets', { q: item , result_type: 'popular', geocode: geo, count: counterer }, function(err, reply) {
  //  ...

    while(counterer1>=0)
    {
        if(reply!=undefined && reply.statuses[counterer1] != undefined )
          {  
            
            var text = reply.statuses[counterer1].text;
           var tex = gloss.extract(text);
            tex = tex.join(' ');
            tex = tex.split(' ').join('+');
            var user = reply.statuses[counterer1].user;
             var namer = user.name;
            var location = user.location;
            var description = user.description;
           // console.log(namer);
            var gen = gender.guess(namer).gender;
            console.log(text, user, namer);
             //console.log(location);
            //console.log(description);
           // console.log(text);
            var mood = sen.analyze(text).score;
            socket.emit('mooder',{
              moodscr : mood
            });
            //console.log(mood);
            var df = description.tokenizeAndStem();
            //console.log(u.intersection(df ,s));
            }
        counterer1--;
      }
      counterer1=counterer;
                   callback(null,tex,gen);
          }); // end of old twit
           
   */
   console.log('inTheEnd')
        },
        function(tex,gen,callback){
          console.log(tex);
          if(tex){
            //if(gen!='unknown')
             // console.log(gen);
             //else
               requester('uClassify/GenderAnalyzer_v5',tex,'',0);

          requester('uClassify/Ageanalyzer',tex,'',1);
          
       
         requester('uClassify/Topics',tex,'',2);
   
          requester('prfekt/Myers-Briggs-Judging-Function',tex,'',3);
          
       
          requester('prfekt/Myers-Briggs-Attitude',tex,'',4);
          
        
          requester('prfekt/Myers-Briggs-Lifestyle',tex,'',5);
          
     
          requester('prfekt/Myers-Briggs-Perceiving-Function',tex,'',6);
       
          requester('prfekt/Tonality',tex,'',7,function(){callback(null);});
          }
          else
          {
            callback(null); 
          }
          
        }

      ],function(err){
        //console.log('');
      });
     // callback();
   // },
   // function(err){
      //console.log('Foreach loop done baby');
   // });

callback();
}
  
  ],function(err){
    //console.log('All async calls finished, baby');
  });// end of async
  

  });//end of socket.on

socket.on('yaku',function(data){
  var sen = require('sediment');
  var Twit = require('twit');
   date = require("date-extended");
  var yey = data.yey;
  var counterer1 = 70;
   //chachu1 = 0;
  var T = new Twit({
    consumer_key:         ''
  , consumer_secret:      ''
  , access_token:         ''
  , access_token_secret:  ''
});

for(var i=0; i <11; i++)
{ 
  //var j = i+1;
  var dw = date(i).daysAgo()._value;
  var d = date(dw).format("yyyy-M-dd").value(); 
  console.log('here')
  T.get('search/tweets', { q: yey+' until:'+d, count: 70 , result_type: 'popular'}, function(err, reply) {
  //  ...
  console.log('here1')

  while(counterer1>=0)
    {
        if(reply!=undefined && reply.statuses[counterer1] != undefined )
          {

            var text = reply.statuses[counterer1].text;
            var created_at = reply.statuses[counterer1].created_at;
            var mood = sen.analyze(text).score;
               // console.log(mood);
                //console.log(created_at);
                var trep = new Date(created_at);
                var dfer = date(trep).format("dd-M-yyyy").value(); 
                socket.emit('ikajika',{
                    ika: mood,
                    jika: dfer,
                    //chachu1: chachu1
                });
               // var fooo = date(created_at).format("dd-M-yyyy").value();
                //console.log(fooo);
                //console.log(text);
                 }
            counterer1--;
        }
counterer1 = 70;
//chachu1 ++;
});
}


});//end of socket-dwitiya
};//end of module.exports
