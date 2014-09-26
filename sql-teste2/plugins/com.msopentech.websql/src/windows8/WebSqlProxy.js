/*
 * Copyright (c) Microsoft Open Technologies, Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
 */

module.exports = {
    db: null,

    open: function (success, fail, args) {
        try {
            this.db = args[0];
            success();
        } catch(ex) {
            fail(ex);
        }
    },

    close: function (success, fail, args) {
        try {
            this.db = null;
            success();
        } catch (ex) {
            fail(ex);
        }
    },

    executeSql: function (success, fail, args) {
        try {
            var res = SQLite.Proxy.SQLiteProxy.executeSql(this.db, args);
            res = JSON.parse(res);

            // You can't access the original message text from JavaScript code.
            // http://msdn.microsoft.com/en-US/library/windows/apps/br230301.aspx#ThrowingExceptions
            // so we return it via custom object
            if (res && res._invocationError) {
                fail(new Error(res._invocationError));
                return;
            }

            success(res);
        } catch(ex) {
            fail(ex);
        }
    },
};
require("cordova/windows8/commandProxy").add("WebSql", module.exports);
