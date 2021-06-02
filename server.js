//TCP net modul és 3000-es portot létrehozom
var net = require('net');
var port = 3000;

//Létrehozom a dátum változó. Alapértelmezettként így jelenik meg: '2012-11-04T14:51:06.157Z'
const start = new Date().toISOString().
replace(/T/, ' ').      // T betű helyettesítése szóközzel
replace(/\..+/, '').    //pont és az azt követő karakterek törlése
replace(/-/, '.').      //első - helyettesítése .-tal
replace(/-/, '.')       //második - helyettesítése .-tal

//Itt hozzuk létre a szervert
var server = net.createServer(
	function (client){
		
		//Kliens csatlakozás kiírása a szerverhez (zöld színnel)
		console.log('\x1b[41m%s\x1b[0m', 'Kliens csatlakozott');

		//Szerver által begépelt üzenet küldése a kliensnek
		process.stdin.on('data',
            function(buffer){
                client.write(buffer);
		}
	);

	  //Kliens üzenete kiírva a szerverre a jelenlegi dátummal (cián színnel)
	  client.on('data',
	    function(buffer){
			console.log('\x1b[32m%s\x1b[0m', start + " Kliens üzenete: " + buffer);
	   }
	  );
	}
);

//3000-es porton várakozik a szerver
server.listen(port);
