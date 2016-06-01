var request = require('request-json');
var client = request.createClient('http://89.96.234.233');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');
client.get('/aria-json/exported/aria/data.json', function(err, res, body) {
  /**
  *Bassano: 500000106
  *Asiago, cima Ekar: 500015304
  *Padova, Mandria: 500000197
  *Mestre, Via Tagliamento: 500021732
  */
  for (var i = 0; i < body.stazioni.length; i++) {
    var codiceStazione = body.stazioni[i].codseqst;
    if (codiceStazione == 500000106 || 500015304 || 500000197 || 500021732) {
      var nrTipiMisure = codiceStazione.misurazioni.length;
      console.log(nrTipiMisure);
    }
  }
});
