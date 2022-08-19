/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: SessionObject.js
 */
function PhwangSessionClass(link_object_val) {
    "use strict";
    this.init__ = function (link_object_val) {
        this.thePhwangLinkObject = link_object_val;
        this.thePhwangSessionStorageObject = new PhwangSessionStorageObject(this);
        this.theXmtSeq = 0;
        this.theRcvSeq = 0;
        this.debug(true, "init__", "");
    };
    this.resetStorageData = function() {
        this.phwangSessionStorageObject().resetStorageData();
    };
    this.getStorageData = function() {
        this.setSessionId(this.phwangSessionStorageObject().sessionId());
        this.debug(true, "getStorageData", "SessionId=" + this.sessionId());
    };
    this.putStorageData = function() {
        this.phwangSessionStorageObject().setSessionId(this.sessionId());
        this.getStorageData();

    };
    this.xmtSeq = function() {
        return this.theXmtSeq;
    };
    this.incrementXmtSeq = function() {
        this.theXmtSeq += 1;
    };
    this.rcvSeq = function() {
        return this.theRcvSeq;
    };
    this.incrementRcvSeq = function() {
        this.theRcvSeq += 1;
    };
    this.transmitData = function(data_val) {this.phwangAjaxObject().putSessionData(this, data_val);};
    this.receiveData = function(c_data_val) {this.themeObject().receiveData(c_data_val);};
    this.themeObject = function() {return this.theThemeObject;};
    this.setThemeObject = function(val) {this.theThemeObject = val;};
    this.objectName = function() {return "PhwangSessionClass";};
    this.phwangLinkObject = function() {return this.thePhwangLinkObject;};
    this.phwangSessionStorageObject = function() {return this.thePhwangSessionStorageObject;};
    this.phwangObject = function() {return this.phwangLinkObject().phwangObject();};
    this.rootObject = function() {return this.phwangObject().rootObject();};
    this.phwangAjaxObject = function() {return this.phwangObject().phwangAjaxObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);};
    this.sessionId = function() {return this.theSessionId;};
    this.setSessionId = function(val) {this.theSessionId = val;};
    this.init__(link_object_val);
}
function PhwangSessionStorageObject(phwang_session_object_val) {
    "use strict";
    this.storage = function() {return localStorage;};
    this.init__ = function(phwang_session_object_val) {this.thePhwangSessionObject = phwang_session_object_val;};
    this.resetStorageData = function() {
        this.resetSessionId();
    };
    this.objectName = function() {return "PhwangSessionStorageObject";};
    this.phwangSessionObject = function() {return this.thePhwangSessionObject;};
    this.phwangObject = function() {return this.phwangSessionObject().phwangObject();};
    this.sessionId = function() {return this.storage().session_id;};
    this.setSessionId = function(val) {this.storage().session_id = val;};
    this.resetSessionId = function() {this.setSessionId("");};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);};
    this.init__(phwang_session_object_val);
}
