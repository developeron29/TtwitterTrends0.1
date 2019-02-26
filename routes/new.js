var Twit = require('twit')

T = new Twit({
    consumer_key:         'BQtZzvpAwbRrHlGem0n55fSJh'
  , consumer_secret:      'EWwJK8YWcIQi4md1h8TmJ41VPUMH2x3voyQuFMamWSQHx4kd4v'
  , access_token:         '428799832-uUtDKAvFCwryeQgAMK2yQqknW9YuGsiSIftGbRiU'
  , access_token_secret:  'pjrt5M57qTNGXbyjLg0gbZSuhdgvxOjnquwznEGiIY'
});

var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]

var stream = T.stream('statuses/filter', { locations: sanFrancisco })

stream.on('tweet', function (tweet) {
  console.log(tweet)
})
