//TCP net modul és 3000-es portot létrehozom
var net = require('net');
var port = 3000;
var socket = net.Socket();

//Létrehozom a dátum változó. Alapértelmezettként így jelenik meg: '2012-11-04T14:51:06.157Z'
const start = new Date().toISOString().
replace(/T/, ' ').      // T betű helyettesítése szóközzel
replace(/\..+/, '').    //pont és az azt követő karakterek törlése
replace(/-/, '.').      //első - helyettesítése .-tal
replace(/-/, '.')       //második - helyettesítése .-tal

//Csatlakozunk a szerverhez localhost-on keresztül
socket.connect(port, "localhost");

socket.on('connect',
    function(){
        //Sikeres szerverhez való csatlakozás kiíratás (zöld színnel)
        console.log('\x1b[41m%s\x1b[0m', 'Csatlakozva');

        //Kliens által begépelt üzenet küldése a szervernek
        process.stdin.on('data',
            function(buffer){
                socket.write(buffer);
            }
        );
    }
);

 //Kliens üzenete kiírva a szerverre a jelenlegi dátummal (cián színnel)
socket.on('data',
    function(buffer){
        console.log('\x1b[32m%s\x1b[0m', start + " Szerver üzenete: " + buffer);
    }
);
