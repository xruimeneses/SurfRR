var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    logManobras: function(msg) {
        document.getElementById('logManobras').innerHTML = msg;
    },
    writeManobras: function(msg) {
        document.getElementById('writeManobras').innerHTML = msg;
    },
    logQualidade: function(msg) {
        document.getElementById('logQualidade').innerHTML = msg;
    },
    writeQualidade: function(msg) {
        document.getElementById('writeQualidade').innerHTML = msg;
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var db = window.openDatabase("surfApp", "1.0", "surfAppBD", 1000000);
        app.receivedEvent('deviceready');
        
        
        
	
        function apagaUltimaManobras(tx) {
            tx.executeSql('DELETE FROM MANOBRAS where id= (SELECT MAX(id) FROM MANOBRAS)');
            populateDB(tx);
        }
		
        function populateDB(tx) {
        	tx.executeSql('CREATE TABLE IF NOT EXISTS MANOBRAS (id unique, manobra, tempo, idSurfista)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS QUALIDADE (idQ unique, qualidadeManobra , tempoQ, idSurfistaQ)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS PONTUACOES (id unique, pontuacaoOnda , tempo, idSurfista)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS HEATS(id, evento, rounda, qtdSurfistas ,idSurfista)');
            tx.executeSql('INSERT OR REPLACE INTO MANOBRAS (id, manobra, tempo, idSurfista) VALUES (1, "SNAP", "00:05:01", 2)');
            tx.executeSql('INSERT OR REPLACE INTO QUALIDADE (idQ, qualidadeManobra , tempoQ, idSurfistaQ) VALUES (1, "OK", "00:05:01", 2)');
            
        }
       
        function insertManobras(tx) {
        	var idSurfista = document.getElementById("surfista").innerHTML;
			var manobra_tempo = document.getElementById("stopwatch").innerHTML;
			var manobras_insere = document.getElementById("man").innerHTML;
			var sql = "";
			
            tx.executeSql('INSERT INTO MANOBRAS (id, manobra, tempo, idSurfista) VALUES ((SELECT MAX(id)+1 FROM MANOBRAS),?, ?, ?)', [manobras_insere, manobra_tempo, idSurfista],
                function(transaction, resultSet){
                    //displayManobras(resultSet.rows.resultSet)
                },
                function(transaction, error){
                    app.logManobras("Error processing SQL: "+JSON.stringify(error));
                }
            );
        }
        
        function insertQualidade(tx) {
        	var idSurfistaQ = document.getElementById("surfistaQualidade").innerHTML;
			var qualidade_tempo = document.getElementById("stopwatchQualidade").innerHTML;
			var qualidade_insere = document.getElementById("qua").innerHTML;
			var sql = "";
			
            tx.executeSql('INSERT INTO QUALIDADE (idQ, qualidadeManobra , tempoQ, idSurfistaQ) VALUES ((SELECT MAX(idQ)+1 FROM QUALIDADE),?, ?, ?)', [qualidade_insere, qualidade_tempo, idSurfistaQ],
                function(transaction, resultSet){
                    //displayManobras(resultSet.rows.resultSet)
                },
                function(transaction, error){
                    app.logQualidade("Error processing SQL: "+JSON.stringify(error));
                }
            );
        }
        
        
        function readManobras(tx) {
            tx.executeSql('SELECT * FROM MANOBRAS', [],
                function(transaction, resultSet){
                    displayManobras(resultSet.rows)
                },
                function(transaction, error){
                    app.logManobras("Error processing SQL: "+JSON.stringify(error));
                }
            );
        }
        
        function readQualidade(tx) {
            tx.executeSql('SELECT * FROM QUALIDADE', [],
                function(transaction, resultSet){
                    displayQualidade(resultSet.rows)
                },
                function(transaction, error){
                    app.logQualidade("Error processing SQL: "+JSON.stringify(error));
                }
            );
        }
        
         
        function displayManobras(rows){
            var s = '';
            for(var i = 0 ; i < rows.length ; i++) {
                var row = rows.item(i);
                s += '<tr><td> '+row.id+' </td><td> '+row.manobra+' </td><td> '+row.tempo+' </td><td> '
                + row.idSurfista+' </td></tr>';
            }

            s = '<table class="listaTabelas" align="center"><th> id </th><th> Qualiade </th><th> Tempo </th><th> Surfista </th>'+s+'</table>';

            app.writeManobras(s);
        }
        
        function displayQualidade(rows){
            var s = '';
            for(var i = 0 ; i < rows.length ; i++) {
                var row = rows.item(i);
                s += '<tr><td> '+row.idQ+' </td><td> '+row.qualidadeManobra+' </td><td> '+row.tempoQ+' </td><td> '
                + row.idSurfistaQ+' </td></tr>';
            }

            s = '<table class="listaTabelas" align="center"><th> id </th><th> Qualiade </th><th> Tempo </th><th> Surfista </th>'+s+'</table>';

            app.writeQualidade(s);
        }
        
        function errorDB(err) {
            alert("Error processing SQL: "+JSON.stringify(err));
        }
        function successDB() {
        	alert("Operação efetuada com sucesso");
        }
        
        function carregaDB() {
        	alert("BD carregada com sucesso");
        }

        function init() {
            db.transaction(populateDB, errorDB, carregaDB);
            db.transaction(readManobras, errorDB);
            db.transaction(readQualidade, errorDB);
        }

        init();

        window.apagaManobras = function(){
            db.transaction(apagaUltimaManobras, errorDB, successDB);
            db.transaction(readManobras, errorDB, successDB);
			alert("Eliminado com aucesso");
        };
        window.addManobras = function(){
            db.transaction(insertManobras, errorDB, successDB);
            db.transaction(readManobras, errorDB);
			
        };
        
        window.addQualidade = function(){
            db.transaction(insertQualidade, errorDB, successDB);
            db.transaction(readQualidade, errorDB);
			
        };
        
        window.addPontuacoes = function(){
            db.transaction(insertPontuacoes, errorDB, successDB);
            db.transaction(readPontuacoes, errorDB);
			alert("Adicionado com aucesso");
        };
        
        window.addHeat = function(){
            db.transaction(insertHeat, errorDB, successDB);            
			alert("Adicionado com aucesso");
        };
        
   }
	
};