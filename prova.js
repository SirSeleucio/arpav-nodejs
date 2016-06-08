var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');
/*
  //db.run("SELECT EXISTS(SELECT 1 FROM Dati WHERE tipoMisurazione='OZONO' AND idStazione='500022612' AND dataMisurazione='2016-05-24 17:40:01' LIMIT 1);");

    query = "SELECT EXISTS(SELECT 1 FROM Dati WHERE tipoMisurazione='OZONO' AND idStazione='5000226121' AND dataMisurazione='2016-05-25 20:40:01' LIMIT 1) AS KAWA";
      db.get(query,[],function(err,row){
        /*if(row!=="undefined"){
          db.run("INSERT INTO Dati(idStazione, tipoMisurazione, dataMisurazione, Misurazione) VALUES('"+codseqst+"', 'OZONO', '"+data+"','"+mis+"')");
        }
        //cose = JSON.stringify(row)
        //object = JSON.parse(cose)
        //console.log(object);
        //esiste ?
        if (row.KAWA == 0) {
          db.run("INSERT INTO Dati(idStazione, tipoMisurazione, dataMisurazione, Misurazione) VALUES('123', 'OZONO', '123','123')");
          console.log("SI DIO CANE, FUNZIONA!");
        }else {
          console.log("mannaggia esiste già!");
        }
      });
      */
for (var i = 0; i < 1000; i++) {
  db.serialize(function () {
    db.run("INSERT INTO Dati(idStazione, tipoMisurazione, dataMisurazione, Misurazione) VALUES('123', 'OZONO', '123','"+i+"')");
  });
}
db.close();
//SELECT dataMisurazione FROM Dati WHERE dataMisurazione="2016-05-24 17:40:01" AND idStazione="500022612" AND tipoMisurazione="PM10";
