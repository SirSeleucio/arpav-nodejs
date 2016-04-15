request = require('request-json');
var client = request.createClient('http://89.96.234.233');
client.get('/aria-json/exported/aria/data.json', function(err, res, body) {
  //guardo dentro l'oggetto json
  for (var i = 0; i < body.stazioni.length; i++) {
    //ricavo codseqst e misurazioni
    var codseqst = body.stazioni[i].codseqst;
    var misurazione = body.stazioni[i].misurazioni;
    //console.log(codseqst + misurazioni);
    //controllo se l'array contiene misurazioni
    if (misurazione.length > 0) {
      console.log("stazione: " +codseqst +" "+misurazione.length+ " ////// "+ misurazione[0].ozono);
      if (misurazione[0].ozono !== "undefined") {
        console.log("OZONO");
        for (var z = 0; z < misurazione[0].ozono.length; z++) {
          data = misurazione[0].ozono[z].data;
          mis = misurazione[0].ozono[z].mis;
          console.log("Data: " +data+ " misurazione:" +mis+ " mg/m3 e nr " + z);
        }
      }else{
        console.log("PM10");
        for (var y = 0; y < misurazione[0].pm10.length; y++) {
          data = misurazione[0].pm10[y].data;
          mis = misurazione[0].pm10[y].mis;
          console.log("Data: " +data+ " misurazione:" +mis);
        }
      }
      if (misurazione[1].pm10 !== "undefined") {
          console.log("PM10");
          for (var w = 0; w < misurazione[1].pm10.length; w++) {
            data = misurazione[1].pm10[w].data;
            mis = misurazione[1].pm10[w].mis;
            console.log("Data: " +data+ " misurazione:" +mis);
          }
        }
      console.log("stazione " + codseqst + " misurazioni: " + misurazione);
    }else {
      console.log("stazione " + codseqst + " non presenta misurazioni");
    }
  }
});
