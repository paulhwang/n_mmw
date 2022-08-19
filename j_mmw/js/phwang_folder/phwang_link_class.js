/*
 * Copyrights phwang
 * Written by Paul Hwang
 */
function PhwangLinkClass(phwang_object_val) {
    "use strict";
    this.init__ = function(phwang_object_val) {
        this.thePhwangObject = phwang_object_val;
        this.thePhwangLinkStorageObject = new PhwangLinkStorageObject(this);
        this.theNameList = [];
        this.theNameListTag = 0;
        this.theServerNameListTag = 0;
        this.theSessionIndexArray = [0];
        this.theSessionTableArray = [null];
        this.debug(true, "init__", "");
    };
    this.resetStorageData = function() {
        this.phwangLinkStorageObject().resetStorageData();
    };
    this.getStorageData = function() {
        this.setMyName(this.phwangLinkStorageObject().myName());
        this.setTimeStamp(this.phwangLinkStorageObject().timeStamp());
        this.setLinkId(this.phwangLinkStorageObject().linkId());
        this.debug(true, "getStorageData", "timeStamp=" + this.timeStamp() + " linkId=" + this.linkId() + " myName=" + this.myName());
    };
    this.putStorageData = function() {
        this.phwangLinkStorageObject().setMyName(this.myName());
        this.phwangLinkStorageObject().setTimeStamp(this.timeStamp());
        this.phwangLinkStorageObject().setLinkId(this.linkId());
    };
    this.sessionIndexArray = function() {
        return this.theSessionIndexArray;
    };
    this.sessionTableArray = function() {
        return this.theSessionTableArray;
    };
    this.sessionTableArrayLength = function() {
        return this.sessionTableArray().length;
    };
    this.sessionTableArrayElement = function(val) {
        return this.sessionTableArray()[val];
    };
    this.verifyLinkIdIndex = function(id_val) {
        if (this.linkId() === id_val) {
            return true;
        } else {
            return false;
        }
    };
    this.resetLinkStorage = function() {
        this.phwangLinkStorageObject().resetLinkStorage();
    };
    this.mallocSessionAndInsert = function(session_id_val) {
        this.phwangSessionObject().setSessionId(session_id_val);
        var session = new PhwangSessionClass(this, false);
        if (!session) {
            return null;
        }
        return session;
    };
    this.insertSession = function(session_val) {
        this.sessionIndexArray().push(session_val.sessionId());
        this.sessionTableArray().push(session_val);
    };
    this.getSession = function(session_id_val) {
        var index = this.sessionIndexArray().indexOf(session_id_val);
        if (index === -1) {
            return null;
        } else {
            var session =this.sessionTableArray()[index];
            return session;
        }
    };
    this.myName = function() {return this.theMyName;};
    this.setMyName = function(val) {this.theMyName = val;};
    this.timeStamp = function() {return this.theTimeStamp;};
    this.setTimeStamp = function(val) { this.theTimeStamp = val;};
    this.linkId = function() {return this.theLinkId;};
    this.setLinkId = function(val) { this.theLinkId = val;};
    this.nameListTag = function() {return this.theNameListTag;};
    this.setNameListTag = function(val) {this.theNameListTag = val;};
    this.serverNameListTag = function() {return this.theServerNameListTag;};
    this.setServerNameListTag = function(val) {this.theServerNameListTag = val;};
    this.nameList = function() {return this.theNameList;};
    this.setNameList = function(data_val) {this.theNameList = data_val;};
    this.nameListLength = function() {return this.nameList().length;};
    this.nameListElement = function(index_val) {return this.nameList()[index_val];};
    this.setNameListElement = function(index_val, data_val) {this.nameList()[index_val] = data_val;};
    this.objectName = function() {return "PhwangLinkClass";};
    this.phwangLinkStorageObject = function() {return this.thePhwangLinkStorageObject;};
    this.phwangObject = function() {return this.thePhwangObject;};
    this.phwangAjaxObject = function() {return this.phwangObject().phwangAjaxObject();};
    this.phwangSessionObject = function() {return this.phwangObject().phwangSessionObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);};
    this.init__(phwang_object_val);
}
function PhwangLinkStorageObject(phwang_link_object_val) {
    "use strict";
    this.storage = function() {return localStorage;};
    this.init__ = function(phwang_link_object_val) {this.thePhwangLinkObject = phwang_link_object_val;};
    this.resetLinkStorage = function() {
        this.resetMyName();
        this.resetTimeStamp();
        this.resetLinkId();
    };
    this.resetStorageData = function() {
        this.resetMyName();
        this.resetTimeStamp();
        this.resetLinkId();
    };
    this.myName = function() {return this.storage().my_name;};
    this.setMyName = function (val) {this.storage().my_name = val;};
    this.resetMyName = function() {this.setMyName("");};
    this.timeStamp = function() {return this.storage().time_stamp;};
    this.setTimeStamp = function(val) {this.storage().time_stamp = val;};
    this.resetTimeStamp = function() {this.setTimeStamp("");};
    this.linkId = function() {return this.storage().link_id;};
    this.setLinkId = function(val) {this.storage().link_id = val;};
    this.resetLinkId = function() {this.setLinkId("");};
    this.objectName = function() {return "PhwangLinkStorageObject";};
    this.phwangLinkObject = function() {return this.thePhwangLinkObject;};
    this.phwangObject = function() {return this.phwangLinkObject().phwangObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);};
    this.init__(phwang_link_object_val);
}
