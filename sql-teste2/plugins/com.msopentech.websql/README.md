WebSQL plugin for Apache Cordova
==================================
Adds WebSQL functionality as Apache Cordova Plugin implemented on top of native SQLite database. Support of Windows Phone8 and Windows8.

### Sample usage ###

Plugin follows [WebDatabase](http://www.w3.org/TR/webdatabase/) specification, no special changes are required. The following sample code creates `todo` table (if not exist) and adds new record. Complete example is available [here](https://github.com/MSOpenTech/cordova-plugin-websql/tree/master/test).

    var dbSize = 5 * 1024 * 1024; // 5MB

    var db = openDatabase("Todo", "", "Todo manager", dbSize, function() {
        console.log('db successfully opened or created');
    });

    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS todo(ID INTEGER PRIMARY KEY ASC, todo TEXT, added_on DATETIME)",
            [], onSuccess, onError);
        tx.executeSql("INSERT INTO todo(todo, added_on) VALUES (?,?)", ['my todo item', new Date()], onSuccess, onError);
    });

    function onSuccess(transaction, resultSet) {
        console.log('Query completed: ' + JSON.stringify(resultSet));
    }

    function onError(transaction, error) {
        console.log('Query failed: ' + error.message);
    }

### Installation Instructions ###

Plugin is [Apache Cordova CLI](http://cordova.apache.org/docs/en/edge/guide_cli_index.md.html) 3.x compliant.

1. Make sure an up-to-date version of Node.js is installed, then type the following command to install the [Cordova CLI](https://github.com/apache/cordova-cli):

        npm install -g cordova

2. Create a project and add the platforms you want to support:

        cordova create sampleApp
        cd sampleApp
        cordova platform add windows8
        cordova platform add wp8

3. Add WebSql plugin to your project:

        cordova plugin add com.msopentech.websql

4. Build and run, for example:

        cordova build windows8
        cordova emulate windows8

To learn more, read [Apache Cordova CLI Usage Guide](http://cordova.apache.org/docs/en/edge/guide_cli_index.md.html).

### Prerequisites ###

In order to build plugin for __Windows8__ target platform, you must manually install the [SQLite for Windows Runtime Extension SDK v3.8.2](http://sqlite.org/2013/sqlite-winrt-3080200.vsix). Note: some browsers will replace the extension of the file from .vsix to .zip when downloading it. If that is the case for you, change the extension of the file back from .zip to .vsix before double-clicking to install.

### Quirks ###
 * The db version, display name, and size parameter values are not supported and will be ignored
 * rowsAffected and insertId properties of sqlResultSet are not supported http://www.w3.org/TR/webdatabase/#sqlresultset
 * Every sql call is performed in its own transaction; so rollback for nested transactions is not supported.

### Copyrights ###
Copyright (c) Microsoft Open Technologies, Inc. All Rights Reserved.
Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
