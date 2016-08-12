var httpExt = require('http-ext');
var parseString = require('xml2js').parseString;
//mestre 4
//Bassano 3
//asiago 4
//padova 1
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database1.db');
httpExt.get('http://89.96.234.233/aria-json/exported/cop/vicenza.xml', function (err, res){
  if (err) return console.log(err);
  parseString(res.body, function (err, result) {
    var no2 = result.data.row[3].CONC_NO2;
    var dataMisurazione = result.data.row[3].DATA_BOLLETTINO;
    db.serialize(function () {
      db.run("INSERT or IGNORE INTO Bassano (dataMisurazione,misurazione) VALUES ('"+dataMisurazione+"','"+no2+"');");
      //db.run("INSERT INTO DatiBis(idStazione, tipoMisurazione, dataMisurazione, Misurazione) VALUES('"+trueStationCode+"', 'OZONO', '"+dataMisurazione+"','"+misurazione+"')");
    });
  });
});
