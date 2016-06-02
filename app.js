var request = require('request-json');
var client = request.createClient('http://89.96.234.233');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');
client.get('/aria-json/exported/aria/data.json', function(err, res, body) {
  /**
  *Bassano: 500000106
  *Asiago, cima Ekar: 500015304
  *Padova, Mandria: 500000197
  *Mestre, Parco bissuola: 500000156
  */
  //Thx StackOverflow!
  var stazioni = [500000106, 500015304, 500000197,500000156];
  function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
  }
  function isEmpty(str) {
    return (!str || 0 === str.length);
  }
  for (var i = 0; i < body.stazioni.length; i++) {
    var codiceStazione = body.stazioni[i].codseqst;
    if (inArray(codiceStazione, stazioni)) {
      var trueStationCode = body.stazioni[i].codseqst;
      var misurations = body.stazioni[i].misurazioni;
      var ozono = misurations[0].ozono;
      console.log(trueStationCode);
      for (var z = 0; z < ozono.length; z++) {
        dataMisurazione = ozono[z].data;
        misurazione = ozono[z].mis;
        if (!isEmpty(misurazione) && trueStationCode == 500000106) {
          db.serialize(function () {
            db.run("INSERT or IGNORE INTO Bassano (tipoMisurazione,dataMisurazione,misurazione) VALUES ('OZONO','"+dataMisurazione+"','"+misurazione+"');");
            //db.run("INSERT INTO DatiBis(idStazione, tipoMisurazione, dataMisurazione, Misurazione) VALUES('"+trueStationCode+"', 'OZONO', '"+dataMisurazione+"','"+misurazione+"')");
          });
        }
        if (!isEmpty(misurazione) && trueStationCode == 500015304) {
          db.serialize(function () {
            db.run("INSERT or IGNORE INTO Asiago (tipoMisurazione,dataMisurazione,misurazione) VALUES ('OZONO','"+dataMisurazione+"','"+misurazione+"');");
            //db.run("INSERT INTO DatiBis(idStazione, tipoMisurazione, dataMisurazione, Misurazione) VALUES('"+trueStationCode+"', 'OZONO', '"+dataMisurazione+"','"+misurazione+"')");
          });
        }
        if (!isEmpty(misurazione) && trueStationCode == 500000197) {
          db.serialize(function () {
            db.run("INSERT or IGNORE INTO Padova (tipoMisurazione,dataMisurazione,misurazione) VALUES ('OZONO','"+dataMisurazione+"','"+misurazione+"');");
            //db.run("INSERT INTO DatiBis(idStazione, tipoMisurazione, dataMisurazione, Misurazione) VALUES('"+trueStationCode+"', 'OZONO', '"+dataMisurazione+"','"+misurazione+"')");
          });
        }
        if (!isEmpty(misurazione) && trueStationCode == 500000156) {
          db.serialize(function () {
            db.run("INSERT or IGNORE INTO Mestre (tipoMisurazione,dataMisurazione,misurazione) VALUES ('OZONO','"+dataMisurazione+"','"+misurazione+"');");
            //db.run("INSERT INTO DatiBis(idStazione, tipoMisurazione, dataMisurazione, Misurazione) VALUES('"+trueStationCode+"', 'OZONO', '"+dataMisurazione+"','"+misurazione+"')");
          });
        }
      }
    }
  }
});
