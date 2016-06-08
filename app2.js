var request = require('request');
var cheerio = require('cheerio');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database1.db');
//provincia=vicenza&giorno=02&mese=05&anno=2015&Vai=Visualizza+il+bollettino
//#ariadativalidati > table > tbody > tr:nth-child(6) > td:nth-child(3)
//
date = {
  mese: ['01','02','03','04','05','06','07','08','09','10','11','12'],
  anno: '2011'
}

for (var i = 0; i < date.mese.length; i++) {
  var index = i;
  (function (index) {
    request.post({
      url:'http://www.arpa.veneto.it/arpavinforma/bollettini/aria/aria_dati_validati_storico.php',
      form: {
        provincia:'vicenza',
        giorno: '01',
        mese: date.mese[i],
        anno: '2011',
        Vari:'Visualizza il bollettino'
      }
    }, function(err,httpResponse,body,i){
      $ = cheerio.load(body);
      var no2_asiago = $('table tr:nth-child(6) td:nth-child(3)','#ariadativalidati').text();
      var ora_asiago = $('table tr:nth-child(6) td:nth-child(4)','#ariadativalidati').text();
      var o3_asiago = $('table tr:nth-child(6) td:nth-child(10)','#ariadativalidati').text();
      isBassano = $('#ariadativalidati table tr:nth-child(10) td:nth-child(1) > strong').text();
      if (isBassano == "Bassano") {
        var no2_bassano = $('table tr:nth-child(10) td:nth-child(3)','#ariadativalidati').text();
        var ora_bassano = $('table tr:nth-child(10) td:nth-child(4)','#ariadativalidati').text();
        var o3_bassano = $('table tr:nth-child(10) td:nth-child(10)', '#ariadativalidati').text();
      }else {
        var no2_bassano = $('table tr:nth-child(13) td:nth-child(3)','#ariadativalidati').text();
        var ora_bassano = $('table tr:nth-child(13) td:nth-child(4)','#ariadativalidati').text();
        var o3_bassano = $('table tr:nth-child(13) td:nth-child(10)', '#ariadativalidati').text();
      }
      db.serialize(function () {
        db.run("INSERT or IGNORE INTO Bassano (tipoMisurazione,dataMisurazione,misurazione) VALUES ('NO2','2011-"+date.mese[index]+"-01 "+ora_bassano+":00:00','"+no2_bassano+"');");
        //db.run("INSERT INTO DatiBis(idStazione, tipoMisurazione, dataMisurazione, Misurazione) VALUES('"+trueStationCode+"', 'OZONO', '"+dataMisurazione+"','"+misurazione+"')");
      });
      db.serialize(function () {
        db.run("INSERT or IGNORE INTO Bassano (tipoMisurazione,dataMisurazione,misurazione) VALUES ('03','2011-"+date.mese[index]+"-01 "+ora_bassano+":00:00','"+o3_bassano+"');");
        //db.run("INSERT INTO DatiBis(idStazione, tipoMisurazione, dataMisurazione, Misurazione) VALUES('"+trueStationCode+"', 'OZONO', '"+dataMisurazione+"','"+misurazione+"')");
      });
      db.serialize(function () {
        db.run("INSERT or IGNORE INTO Asiago (tipoMisurazione,dataMisurazione,misurazione) VALUES ('NO2','2011-"+date.mese[index]+"-01 "+ora_asiago+":00:00','"+no2_asiago+"');")
      });
      db.serialize(function () {
        db.run("INSERT or IGNORE INTO Asiago (tipoMisurazione,dataMisurazione,misurazione) VALUES ('03','2011-"+date.mese[index]+"-01 "+ora_asiago+":00:00','"+o3_asiago+"');")
      });
      /*
      console.log(no2_asiago);
      console.log(ora_asiago);
      console.log(no2_bassano);
      console.log(ora_bassano);
      */
      console.log();
    });
  })(i);
}
