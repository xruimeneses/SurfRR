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

    log: function(msg) {
        document.getElementById('log').innerHTML = msg;
    },
    write: function(msg) {
        document.getElementById('write').innerHTML = msg;
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var db = window.openDatabase("proto", "1.0", "Proto DB", 1000000);

        function resetDB(tx) {
            tx.executeSql('DELETE FROM DEMO');
            populateDB(tx);
        }

        function populateDB(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
            tx.executeSql('INSERT OR REPLACE INTO DEMO (id, data) VALUES (1, "First row")');
            tx.executeSql('INSERT OR REPLACE INTO DEMO (id, data) VALUES (2, "Second row")');
        }
        function insertIntoDB(tx) {
            tx.executeSql('INSERT INTO DEMO (id, data) VALUES ((SELECT MAX(id)+1 FROM DEMO), "row #"||((SELECT MAX(id) FROM DEMO)+1))', [],
                function(transaction, resultSet){
                    //displayRows(resultSet.rows.resultSet)
                },
                function(transaction, error){
                    app.log("Error processing SQL: "+JSON.stringify(error));
                }
            );
        }
        function readFromDB(tx) {
            tx.executeSql('SELECT * FROM DEMO', [],
                function(transaction, resultSet){
                    displayRows(resultSet.rows)
                },
                function(transaction, error){
                    app.log("Error processing SQL: "+JSON.stringify(error));
                }
            );
        }
        function displayRows(rows){
            var s = '';
            for(var i = 0 ; i < rows.length ; i++) {
                var row = rows.item(i);
                s += '<li>'+row.id+': '+row.data+'</li>';
            }

            s = '<ul>'+s+'</ul>';

            app.write(s);
        }
        function errorDB(err) {
            app.log("Error processing SQL: "+JSON.stringify(err));
        }
        function successDB() {
        }

        function init() {
            db.transaction(populateDB, errorDB, successDB);
            db.transaction(readFromDB, errorDB, successDB);
        }

        init();

        window.reset = function(){
            db.transaction(resetDB, errorDB, successDB);
            db.transaction(readFromDB, errorDB, successDB);
        };

        window.addRows = function(){
            db.transaction(insertIntoDB, errorDB, successDB);
            db.transaction(readFromDB, errorDB, successDB);
        };
    }
};
