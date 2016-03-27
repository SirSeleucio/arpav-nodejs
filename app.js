request = require('request-json');
var client = request.createClient('http://89.96.234.233');
client.get('/aria-json/exported/aria/data.json', function(err, res, body) {
  for (var i = 0; i < body.stazioni.length; i++) {
    var misurazioni = body.stazioni[i].misurazioni;
    if (typeof misurazioni !== 'undefined' && misurazioni > 0) {
        return console.log(misurazioni[0].ozono[i]);
    }
  }
  console.log(misurazioni[0].ozono[0]);
});
