cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.smile.websqldatabase.wpdb/www/wpOpenDatabase.js",
        "id": "org.smile.websqldatabase.wpdb.wpOpenDatabase",
        "clobbers": [
            "openDatabase"
        ]
    },
    {
        "file": "plugins/com.msopentech.websql/www/WebSQL.js",
        "id": "com.msopentech.websql.WebSQL",
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/com.msopentech.websql/www/Database.js",
        "id": "com.msopentech.websql.Database"
    },
    {
        "file": "plugins/com.msopentech.websql/www/SqlTransaction.js",
        "id": "com.msopentech.websql.SqlTransaction"
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.smile.websqldatabase.wpdb": "0.0.1",
    "com.msopentech.websql": "0.0.4"
}
// BOTTOM OF METADATA
});